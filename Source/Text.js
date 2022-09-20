
import Font from './Font.js'


const { max } = Math;


const toPixels = ( char ) =>
    Font[char] ?? Font[' '];


/**
 *  Convert text to it's braille pixels.
 *  @returns Array of 2D pixel maps.
 */

export function asPixels ( text ){
    return text
        .split('')
        .map(toPixels);
}


/**
 *  Calculates a text's pixel width.
 */

export function widthOf ( text ){
    return [ ... charOffsets(asPixels(text)) ].pop();
}

/**
 *  Calculates a text's pixel height.
 */

export function heightOf ( text ){

    let height = 0;

    for(const char of asPixels(text))
        height = max(height,char[0]?.length ?? 0);

    return height;
}


/**
 *  Calculates char offsets for each 2D pixel map.
 *  @returns Generator of char offsets.
 */

export function * charOffsets ( pixels ){

    const widthOf = ( charmap ) =>
        charmap[0]?.length ?? 0;

    let offset = 0;

    for(const charmap of pixels){

        yield offset;

        offset += widthOf(charmap) + 2;
    }

    yield offset - 2;
}