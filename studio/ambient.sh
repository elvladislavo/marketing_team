#!/usr/bin/env bash
# Original, license-free ambient bed generated with ffmpeg.
# Usage: ./ambient.sh <in.mp4> <out.mp4> [mood: warm|tech|calm] 
set -e; IN=$1; OUT=$2; MOOD=${3:-warm}
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN")
case $MOOD in
  warm) F="110|164.81|220|277.18";;   # A minor-ish pad
  tech) F="98|146.83|196|293.66";;    # G open fifths
  calm) F="130.81|196|261.63|329.63";; # C major
esac
IFS='|' read -r a b c d <<< "$F"
ffmpeg -loglevel error -y -i "$IN" -filter_complex "
sine=f=$a:d=$D[s1];sine=f=$b:d=$D[s2];sine=f=$c:d=$D[s3];sine=f=$d:d=$D[s4];
anoisesrc=d=$D:c=pink:a=0.04,lowpass=f=900[n];
[s1][s2][s3][s4][n]amix=inputs=5:normalize=0,volume=0.18,
tremolo=f=0.15:d=0.4,aecho=0.6:0.5:900|1400:0.35|0.25,lowpass=f=2200,
afade=t=in:d=1.2,afade=t=out:st=$(echo "$D-1.5"|bc):d=1.5,loudnorm=I=-20:TP=-2[a]" \
 -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 160k -shortest "$OUT"
echo "wrote $OUT"
