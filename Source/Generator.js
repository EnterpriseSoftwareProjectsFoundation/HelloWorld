

/**
 *  Combine two generators / arrays into one.
 *  Terminates once either runs out of items.
 */

export function * combine ( A , B ){

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
