
const { fromCodePoint } = String;


const symbolOf = ( id ) =>
    fromCodePoint(0x2800 + id);


export function * symbols (){

    let id = 0;

    while( id < 256 )
        yield symbolOf(id++);
}


const Pixels = [ ... symbols() ];

const offsets = [
    [ 0 , 0 ] ,
    [ 0 , 1 ] ,
    [ 0 , 2 ] ,
    [ 1 , 0 ] ,
    [ 1 , 1 ] ,
    [ 1 , 2 ] ,
    [ 0 , 3 ] ,
    [ 1 , 3 ] ,
]

export function fromPixels ( pixels , X , Y ){

    const toPosition =
        ([ x , y ]) => [ X + x , Y + y ];

    const toPixelState =
        ([ x , y ]) => pixels[y][x];

    const weightPixel =
        (state,index) => state * 2 ** index;

    const sum =
        ( a , b ) => a + b ;

    const char = offsets
        .map(toPosition)
        .map(toPixelState)
        .map(weightPixel)
        .reduce(sum);

    return Pixels[char];
}
