#!/usr/bin/env python3
"""Original 8-bit (NES-style) music generator.

Upbeat, bright, major-key "adventure platformer" style: two pulse-wave leads,
a triangle bass and noise drums, like the classic console sound chip.
Every track is composed procedurally from a seed - no existing melodies are used.

Usage: python3 chiptune.py <out.wav> <seconds> [seed] [bpm]
"""
import sys, wave, random
import numpy as np

SR = 44100

def midi_hz(m): return 440.0 * 2 ** ((m - 69) / 12)

# ---------- NES-like voices ----------
def pulse(freq, n, duty=0.25, vib=0.0, vib_delay=0.12):
    t = np.arange(n) / SR
    f = np.full(n, freq)
    if vib:
        d = int(vib_delay * SR)
        if d < n:
            f[d:] *= 1 + vib * np.sin(2 * np.pi * 5.5 * t[d:])
    ph = np.cumsum(f) / SR % 1.0
    return np.where(ph < duty, 1.0, -1.0)

def triangle(freq, n):
    ph = (np.arange(n) * freq / SR) % 1.0
    tri = 1 - 4 * np.abs(ph - 0.5)            # -1..1
    return np.round((tri + 1) * 7.5) / 7.5 - 1  # 16-level staircase like the NES

def _lfsr(short, length=32767):
    reg, out, tap = 1, [], 6 if short else 1
    for _ in range(length):
        bit = (reg & 1) ^ ((reg >> tap) & 1)
        reg = (reg >> 1) | (bit << 14)
        out.append(1.0 if reg & 1 else -1.0)
    return np.array(out)
NOISE_L, NOISE_S = _lfsr(False), _lfsr(True)

def noise(n, rate, short=False):
    seq = NOISE_S if short else NOISE_L
    idx = (np.arange(n) * rate / SR).astype(int) % len(seq)
    return seq[idx]

def env(n, attack=0.004, decay=0.10, sustain=0.6, release=0.03):
    e = np.ones(n) * sustain
    a, d, r = int(attack * SR), int(decay * SR), int(release * SR)
    a = min(a, n); e[:a] = np.linspace(0, 1, a, endpoint=False)
    d = min(d, n - a)
    if d > 0: e[a:a + d] = np.linspace(1, sustain, d)
    r = min(r, n)
    if r > 0: e[-r:] *= np.linspace(1, 0, r)
    return e

# ---------- music theory ----------
MAJOR = [0, 2, 4, 5, 7, 9, 11]
PROGS = [  # scale-degree roots (0=I) with chord quality from the major scale; 'b7' = bVII adventure chord
    [0, 5, 3, 4], [0, 3, 4, 0], [0, 4, 5, 3], [0, 3, 'b7', 4], [5, 3, 0, 4], [0, 2, 3, 4]]

def chord(key, deg):
    if deg == 'b7':
        r = key + 10; return [r, r + 4, r + 7]
    r = key + MAJOR[deg]
    third = key + MAJOR[(deg + 2) % 7] + (12 if (deg + 2) >= 7 else 0)
    fifth = key + MAJOR[(deg + 4) % 7] + (12 if (deg + 4) >= 7 else 0)
    return [r, third, fifth]

def scale_notes(key, lo, hi):
    return [m for m in range(lo, hi + 1) if (m - key) % 12 in MAJOR]

# ---------- composition ----------
RHYTHMS = [  # 2-beat cells in 16th steps (lengths sum to 8)
    [2, 2, 2, 2], [3, 1, 2, 2], [2, 1, 1, 4], [1, 1, 2, 4], [4, 2, 2], [2, 2, 4], [1, 1, 1, 1, 2, 2], [6, 2]]

def make_motif(rng, key, prog, lo, hi):
    """2-bar melodic motif: list of (step_offset, length_steps, midi) over 32 sixteenth steps."""
    sc = scale_notes(key, lo, hi)
    notes, pos = [], 0
    cur = rng.choice([m for m in sc if (m - key) % 12 in (0, 4, 7)])
    while pos < 32:
        cell = rng.choice(RHYTHMS)
        for ln in cell:
            if pos >= 32: break
            bar = pos // 16
            ch = [c % 12 for c in chord(key, prog[bar % len(prog)])]
            if pos % 4 == 0:  # strong beats: chord tones
                cands = [m for m in sc if m % 12 in ch and abs(m - cur) <= 7] or sc
            else:             # weak: step-wise movement
                i = sc.index(min(sc, key=lambda m: abs(m - cur)))
                cands = sc[max(0, i - 2):i + 3]
            cur = rng.choice(cands)
            notes.append((pos, min(ln, 32 - pos), cur))
            pos += ln
    return notes

def vary(rng, motif, key, lo, hi):
    sc = scale_notes(key, lo, hi)
    out = []
    for p, l, m in motif:
        if p >= 16 and rng.random() < 0.45:
            i = sc.index(min(sc, key=lambda x: abs(x - m)))
            m = sc[max(0, min(len(sc) - 1, i + rng.choice([-2, -1, 1, 2])))]
        out.append((p, l, m))
    return out

def compose(seconds, seed=None, bpm=None):
    rng = random.Random(seed)
    bpm = bpm or rng.choice([144, 150, 156, 160])
    key = rng.choice([60, 62, 65, 67, 57])           # C, D, F, G, A
    step = 60 / bpm / 4                             # 16th note in seconds
    bar_len = 16 * step
    nbars = int(np.ceil(seconds / bar_len)) + 1
    prog = rng.choice(PROGS)
    lo, hi = key + 12, key + 26
    A = make_motif(rng, key, prog[:2], lo, hi)
    B = make_motif(rng, key, prog[2:], lo, hi)
    form = [A, vary(rng, A, key, lo, hi), B, vary(rng, B, key, lo, hi)]
    total = int((nbars * bar_len + 1) * SR)
    lead, harm, bass, drums = (np.zeros(total) for _ in range(4))

    def put(buf, start, sig):
        s = int(start * SR); e = min(total, s + len(sig))
        if s < total: buf[s:e] += sig[:e - s]

    for bar in range(nbars):
        t0 = bar * bar_len
        deg = prog[bar % 4]
        ch = chord(key, deg)
        # --- lead melody (2-bar motifs, A A' B B') ---
        motif = form[(bar // 2) % 4]
        last_bar = bar == nbars - 1
        for p, l, m in motif:
            if p // 16 != bar % 2: continue
            if last_bar: break
            n = int(l * step * SR * 0.92)
            sig = pulse(midi_hz(m), n, duty=0.25, vib=0.012 if l >= 4 else 0) * env(n, decay=0.08, sustain=0.55)
            put(lead, t0 + (p % 16) * step, sig)
            # echo channel (pulse 12.5%) one 8th later, quieter
            put(harm, t0 + (p % 16) * step + 2 * step, 0.45 * pulse(midi_hz(m), n, duty=0.125) * env(n, sustain=0.4))
        if last_bar:  # resolve on the tonic
            n = int(bar_len * SR * 0.9)
            put(lead, t0, pulse(midi_hz(key + 12), n, 0.25, vib=0.015) * env(n, decay=0.3, sustain=0.5, release=0.4))
        # --- arpeggio sparkle on harm channel every other bar ---
        if bar % 2 == 1 and not last_bar:
            for i in range(16):
                m = ch[i % 3] + 24
                n = int(step * SR * 0.8)
                put(harm, t0 + i * step, 0.22 * pulse(midi_hz(m), n, duty=0.125) * env(n, decay=0.04, sustain=0.3))
        # --- triangle bass: bouncy octave 8ths ---
        root = ch[0] - 24
        pattern = [root, root + 12, root + 7, root + 12] * 2
        for i, m in enumerate(pattern):
            if last_bar and i > 0: break
            n = int(2 * step * SR * (0.85 if not last_bar else 7))
            put(bass, t0 + i * 2 * step, triangle(midi_hz(m), n) * env(n, attack=0.002, decay=0.05, sustain=0.85))
        # --- noise drums ---
        for i in range(16):
            t = t0 + i * step
            if last_bar and i > 0: break
            if i in (0, 8) or (i == 10 and bar % 2):          # kick: falling triangle blip
                n = int(0.09 * SR); f = np.linspace(160, 50, n)
                ph = np.cumsum(f) / SR % 1; put(drums, t, 0.9 * (1 - 4 * np.abs(ph - .5)) * np.linspace(1, 0, n))
            if i in (4, 12):                                    # snare: long noise burst
                n = int(0.12 * SR); put(drums, t, 0.55 * noise(n, 9000) * np.linspace(1, 0, n) ** 1.5)
            if i % 2 == 0:                                      # hi-hat: short metallic noise
                n = int(0.03 * SR); put(drums, t, 0.18 * noise(n, 22000, short=True) * np.linspace(1, 0, n))
        if bar % 4 == 3 and not last_bar:                       # fill into next phrase
            for i in (13, 14, 15):
                n = int(0.06 * SR); put(drums, t0 + i * step, 0.4 * noise(n, 6000 + i * 600) * np.linspace(1, 0, n))

    mix = 0.30 * lead + 0.22 * harm + 0.34 * bass + 0.26 * drums
    mix = mix[:int(seconds * SR)]
    fo = int(min(1.2, seconds / 4) * SR); mix[-fo:] *= np.linspace(1, 0, fo)
    fi = int(0.02 * SR); mix[:fi] *= np.linspace(0, 1, fi)
    mix = np.tanh(mix * 1.4)                                    # gentle saturation
    mix = mix / (np.max(np.abs(mix)) + 1e-9) * 0.89
    return mix, dict(seed=seed, bpm=bpm, key=key, prog=prog)

def save(path, mix):
    pcm = (mix * 32767).astype(np.int16)
    with wave.open(path, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())

if __name__ == '__main__':
    out, secs = sys.argv[1], float(sys.argv[2])
    seed = sys.argv[3] if len(sys.argv) > 3 else None
    bpm = int(sys.argv[4]) if len(sys.argv) > 4 else None
    mix, info = compose(secs, seed, bpm)
    save(out, mix); print('wrote', out, info)
