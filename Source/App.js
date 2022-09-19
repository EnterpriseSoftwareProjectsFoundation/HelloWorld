
import Canvas from './Canvas.js'


const { log , clear } = console;

const canvas = new Canvas(100,100);
canvas.clear();
canvas.text(10,10,'Hello World');
const frame = canvas.render();
log(frame);
