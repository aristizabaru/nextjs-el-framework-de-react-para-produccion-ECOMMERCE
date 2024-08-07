export const sleep = async ( seconds: number = 1 ) => {
    await new Promise( ( resolve ) => {
        setTimeout( () => {
            resolve( true );
        }, seconds * 1000 );
    } );
};