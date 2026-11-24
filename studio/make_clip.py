#!/usr/bin/env python3
"""make_clip.py <scene> -> templates/clip-<scene>.html (scene file: scenes/clip-<scene>.js)"""
import sys
n=sys.argv[1]
b=open('templates/clip-overlay.html').read()
open(f'templates/clip-{n}.html','w').write(b.replace('/*SCENE*/',open(f'scenes/clip-{n}.js').read()))
