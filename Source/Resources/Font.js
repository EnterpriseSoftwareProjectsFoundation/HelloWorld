
import { basename } from 'Path'
import * as Paths from 'Paths'
import { walk } from 'FileSystem'


const { readTextFile } = Deno;


const files = walk(Paths.font,{
    followSymlinks : false ,
    includeFiles : true ,
    includeDirs : false ,
    skip : [ /\/\Template\.txt$/ ]
})


const font = {};


for await (const { path } of files)
    await loadChar(path);


function charName ( path ){
    return basename(path)
        .split('.')[0];
}


async function loadChar ( path ){

    const data = await readTextFile(path);

    const
        pixels = readChar(data) ,
        name = charName(path) ;

    font[name] = pixels;
}


function readChar ( string ){

    const convert = (chars) => chars
        .map((char) => char === '●')
        .map((filled) => filled ? 1 : 0);

    return string
        .split('\n')
        .map((line) => line.split(''))
        .map(convert);
}


export default font;
