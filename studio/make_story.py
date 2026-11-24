#!/usr/bin/env python3
"""Build a photo-story Reel page: make_story.py <scene-name>  -> templates/story-<name>.html"""
import sys
n=sys.argv[1]
base=open('templates/photo-story.html').read()
scene=open(f'scenes/{n}.js').read()
open(f'templates/story-{n}.html','w').write(base.replace('/*SCENE*/',scene))
