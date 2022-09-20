
import { charOffsets , asPixels } from './Text.js'
import * as Braille from './Braille.js'


const { floor } = Math;
const { log } = console;


const pixels = [ ... Braille.symbols() ];


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

        let lines = '';

        for(let y = 0;y < this.#height;y += 4,lines += '\n')
            for(let x = 0;x < this.#width;x += 2)
                lines += this.#renderBlock(x,y);

        return lines;
    }


    #renderBlock ( x , y ){

        const data = this.#data;

        let char =
            data[y + 0][x + 0] *   1 +
            data[y + 1][x + 0] *   2 +
            data[y + 2][x + 0] *   4 +
            data[y + 0][x + 1] *   8 +
            data[y + 1][x + 1] *  16 +
            data[y + 2][x + 1] *  32 +
            data[y + 3][x + 0] *  64 +
            data[y + 3][x + 1] * 128 ;

        return pixels[char];
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

        if( y >= this.#width )
            return;

        [ x , y ] = [ floor(x) , floor(y) ];

        this.#data[y][x] = state;
    }


    /**
     *  Resets all pixels.
     */

    clear (){

        const data = Array(this.#height)
            .fill(null);

        this.#data = data.map(() => {
            return Array(this.#width)
                .fill(null)
                .map(() => 0)
        });
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

        const
            height = pixels.length ,
            width = pixels[0]?.length ?? 0 ;

        for(let y = 0;y < height;y++){

            const line = pixels[y];

            for(let x = 0;x < width;x++)
                this.pixel(X + x,Y + y,line[x]);
        }
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

        // let offset = 0;
        //
        // for(const char of chars){
        //     this.overlay(x + offset,y,char);
        //     offset += (char[0]?.length ?? 0) + 2;
        // }
    }
}


function * combine ( A , B ){

    if(Array.isArray(A))
        A = A.values();

    if(Array.isArray(B))
        B = B.values();

    let a , b ;

    while (true){

        [ a , b ] = [ A.next() , B.next() ];

        if( a.done || b.done )
            return;

        yield [ a.value , b.value ];
    }
}
