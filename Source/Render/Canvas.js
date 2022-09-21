
import { charOffsets , asPixels } from 'Text'
import { combine } from 'Generator'

import * as Braille from 'Braille'
import * as Grid from 'Grid'


const { floor } = Math;
const { log } = console;


export default class Canvas {

    #height;
    #width;
    #data;


    constructor ( width , height ){

        if(width % 2 !== 0)
            throw 'Canvas width must be a mulitple of 2';

        if(height % 4 !== 0)
            throw 'Canvas height must be a mulitple of 4';

        this.#height = height;
        this.#width = width;

        this.clear();
    }


    /**
     *  Generates an image frame in form of a string.
     */

    render (){

        const
            height = this.#height ,
            width = this.#width ,
            data = this.#data ;

        let lines = '';

        for(let y = 0;y < height;y += 4,lines += '\n')
            for(let x = 0;x < width;x += 2)
                lines += Braille.fromPixels(data,x,y);

        return lines;
    }


    /**
     *  Sets a pixel to the given state.
     *  @param state Wether the pixel is on.
     */

    pixel ( x , y , state = true ){

        if( x < 0 || y < 0 )
            return;

        if( x >= this.#width )
            return;

        if( y >= this.#height )
            return;

        [ x , y ] = [ floor(x) , floor(y) ];

        this.#data[y][x] = state;
    }


    /**
     *  Resets all pixels.
     */

    clear (){

        const newColumn = () =>
            Array(this.#width)
                .fill(null)
                .map(() => 0);

        const newGrid = () =>
            Array(this.#height)
                .fill(null)
                .map(newColumn);

        this.#data = newGrid();
    }


    /**
     *  Overlay the given pixels onto the canvas.
     *
     *  Ignores out-of-bounds content.
     *
     *  @param X Left side of the content.
     *  @param Y  Top side of the content.
     *  @param pixels 2D array of [ 0 | 1 ]
     */

    overlay ( X , Y , pixels ){

        const [ width , height ] =
            Grid.sizeOf(pixels);

        for(let y = 0;y < height;y++)
            for(let x = 0,line = pixels[y];x < width;x++)
                this.pixel(X + x,Y + y,line[x]);
    }


    /**
     *  Write the given text.
     *
     *  Ignores out-of-bounds content.
     *  Replaces chars without representation with spaces.
     *  Spaces chars with a 2 pixel padding.
     *
     *  @param x Left side of the text.
     *  @param y  Top side of the text.
     *  @param text String to be displayed.
     */

    text ( x , y , text ){

        const
            chars = asPixels(text) ,
            offsets = charOffsets(chars) ;

        for(const [ char , offset ] of combine(chars,offsets))
            this.overlay(x + offset,y,char)
    }
}
