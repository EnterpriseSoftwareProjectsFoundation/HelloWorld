
const { fromCodePoint } = String;


const symbolOf = ( id ) =>
    fromCodePoint(0x2800 + id);

    
export function * symbols (){
    
    let id = 0;
    
    while( id < 256 )
        yield symbolOf(id++);
}
