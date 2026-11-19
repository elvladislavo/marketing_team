#!/usr/bin/env bash
# Add original 8-bit music to a video.
# Usage: ./chip.sh <in.mp4> <out.mp4> [seed] [bpm]
set -e; IN=$1; OUT=$2; SEED=${3:-$(basename "$IN" .mp4)}; BPM=${4:-}
DIR=$(cd "$(dirname "$0")" && pwd)
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN")
WAV=$(mktemp --suffix=.wav)
python3 "$DIR/chiptune.py" "$WAV" "$D" "$SEED" $BPM >/dev/null
ffmpeg -loglevel error -y -i "$IN" -i "$WAV" -filter_complex "[1:a]loudnorm=I=-17:TP=-1.5[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest "$OUT"
rm -f "$WAV"; echo "wrote $OUT"
