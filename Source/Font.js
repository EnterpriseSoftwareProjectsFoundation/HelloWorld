
import { basename } from 'Path'
import * as Paths from 'Paths'
import { walk } from 'FileSystem'


const { readTextFile } = Deno;


const files = walk(Paths.font,{
    followSymlinks : false ,
    includeFiles : true ,
    includeDirs : false ,
    maxDepth : 1 ,
    skip : [ /\/\Template\.txt$/ ]
})


const font = {};


for await (const { path } of files){

    const data = await readTextFile(path);

    const pixels = data
        .split('\n')
        .map((line) => line.split(''))
        .map((chars) => chars
            .map((char) => char === '●')
            .map((filled) => filled ? 1 : 0))

    const name = basename(path)
        .split('.')[0];

    font[name] = pixels;
}


export default font;
