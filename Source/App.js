
import { widthOf , heightOf } from './Text.js'
import * as Console from './Console.js'
import Canvas from './Canvas.js'


const { log , clear } = console;
const { ceil } = Math;


const text = 'Hello World';

const
    textWidth = widthOf(text) ,
    textHeight = heightOf(text) ;


let
    height = 0 ,
    width = 0 ;

setInterval(() => {

    const [ w , h ] = Console.pixelSize();

    if(width === w && height === h)
        return;

    [ width , height ] = [ w , h ];


    const canvas = new Canvas(width,height);


    const
        y = (height - textHeight) / 2 ,
        x = (width - textWidth) / 2 ;

    canvas.text(x,y,text);


    const frame = canvas.render();
    clear();
    log(frame);

},100);
