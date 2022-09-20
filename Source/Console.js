
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
