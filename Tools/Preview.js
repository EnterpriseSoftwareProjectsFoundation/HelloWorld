#!/usr/bin/env -S deno run -A --importmap=Source/Imports.json


import Canvas from '../Source/Canvas.js'


const { log , clear } = console;

clear();

const canvas = new Canvas(100,100);
canvas.text(0,10,'0123456789');
canvas.text(0,26,'ABCDEFGHIJKL')
canvas.text(0,38,'MNOPQRSTUVQW');
canvas.text(0,50,'XYZ');
canvas.text(0,62,'abcdefghijkl');
canvas.text(0,74,'mnopqrstuvw');
canvas.text(0,86,'xyz');

log(canvas.render());
