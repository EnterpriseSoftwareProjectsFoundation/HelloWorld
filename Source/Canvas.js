
import Font from './Font.js'


const { min , max , floor , round , abs } = Math;
const { log } = console;

const pixels = Array(256)
    .fill(null)
    .map((_,index) => String.fromCodePoint(0x2800 + index));


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
    
    render (){
        
        let lines = '';
        
        for(let y = 0;y < this.#height;y += 4,lines += '\n')
            for(let x = 0;x < this.#width;x += 2)
                lines += this.#renderBlock(x,y);

        return lines;
    }
    
    #renderBlock (x,y){
        
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
    
    
    pixel (x,y,state = true){
        
        if( x < 0 || y < 0 )
            return;
            
        if( x < this.#width && y < this.#width )
            this.#data[y][x] = state;
    }
    
    
    clear (){
        
        const data = Array(this.#height)
            .fill(null);
        
        this.#data = data.map(() => {
            return Array(this.#width)
                .fill(null)
                .map(() => 0)
        });
    }
    
    overlay (X,Y,pixels){
        
        const { length : height } = pixels;
        
        for(let y = 0;y < height;y++){
            
            const line = pixels[y];
            const { length : width } = line ;
                
            for(let x = 0;x < width;x++)
                this.pixel(X + x,Y + y,line[x]);
        }
    }
    
    text (x,y,text){
        
        const chars = text
            .split('')
            .map((char) => Font[char] ?? Font[' ']);
            
        let offset = 0;
            
        for(const char of chars){
            this.overlay(x + offset,y,char);
            offset += (char[0]?.length ?? 0) + 2;
        }
    }
}