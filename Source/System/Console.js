
const { consoleSize , stdout } = Deno;


export function charSize (){

    const { columns , rows } =
        consoleSize(stdout.rid);

    return [ columns , rows - 2 ]
}


export function pixelSize (){

    const [ width , height ] = charSize();

    return [ width * 2 , height * 4 ]
}


export function onResize ( callback ){

    let [ height , width ] = [ 0 , 0 ];

    let id;

    const listener = {
        cancel : () =>
            clearInterval(id)
    }

    id = setInterval(() => {

        const [ w , h ] = pixelSize();

        if(width === w && height === h)
            return;

        [ width , height ] = [ w , h ];

        callback(listener);

    },100);
}
