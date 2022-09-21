
import { widthOf , heightOf } from 'Text'
import * as Console from 'Console'
import Canvas from 'Canvas'


const { log , clear } = console;
const { ceil } = Math;


const text = 'Hello World';

const
    textWidth = widthOf(text) ,
    textHeight = heightOf(text) ;


Console.onResize(redraw);


function redraw ({ cancel }){

    const [ width , height ] = Console.pixelSize();

    const canvas = new Canvas(width,height);

    const
        y = (height - textHeight) / 2 ,
        x = (width - textWidth) / 2 ;

    canvas.text(x,y,text);


    const frame = canvas.render();

    clear();

    log(frame);
}
