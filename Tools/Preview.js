#!/usr/bin/env -S deno run -A --importmap=Source/Imports.json


import Canvas from '../Source/Canvas.js'


const { log , clear } = console;

clear();

const canvas = new Canvas(100,100);
canvas.text(0,0,'0123456789');
canvas.text(0,10,'ABCDEFGHIJKLMNOPQRSTUVQWXYZ');
canvas.text(0,20,'abcdefghujklmnopqrstuvqwxyz');

log(canvas.render());
