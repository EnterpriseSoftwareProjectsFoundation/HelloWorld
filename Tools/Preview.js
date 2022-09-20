#!/usr/bin/env -S deno run -A --importmap=Source/Imports.json


import Canvas from '../Source/Canvas.js'


const { log , clear } = console;

clear();

const canvas = new Canvas(100,100);
canvas.text(10,10,'0123456789');
canvas.text(10,26,'ABCDEFGHIJK')
canvas.text(10,38,'LMNOPQRSTUV');
canvas.text(10,50,'WXYZ');
canvas.text(10,62,'abcdefghijk');
canvas.text(10,74,'lmnopqrstuv');
canvas.text(10,86,'wxyz');

log(canvas.render());
