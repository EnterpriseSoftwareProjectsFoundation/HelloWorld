


export function widthOf ( grid ){
    return grid?.[0]?.length ?? 0;
}

export function heightOf ( grid ){
    return grid?.length ?? 0;
}

export function sizeOf ( grid ){
    return [ widthOf(grid) , heightOf(grid) ];
}
