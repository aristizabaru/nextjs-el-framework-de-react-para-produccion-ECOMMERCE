
export const generatePaginationNumbers = ( currentPage: number, totalPages: number ) => {

    // Siga las instrucciones para configurar correctamente el paginador
    const configPagination = {
        maxPagination: 7,
        // `splitInterval + sideInterval` no puede ser mayor o igual que `maxPagination`
        splitInterval: 3, // Debe ser número impar
        sideInterval: 1, // `sideInterval + 2` no puede ser mayor que 'splitInterval'
        separator: '...',
    };

    const canSplitPagination = totalPages > configPagination.maxPagination;
    const isPageOnFirstInterval = currentPage <= configPagination.splitInterval;
    const isPageOnLastInterval = currentPage + configPagination.splitInterval > totalPages;

    if ( !canSplitPagination ) {
        return Array.from( { length: totalPages }, ( _, i ) => i + 1 );
    }

    if ( canSplitPagination && isPageOnFirstInterval ) {
        const firstInterval = Array.from( { length: configPagination.splitInterval }, ( _, i ) => i + 1 );
        const lastInterval = [];

        for ( let i = totalPages - ( configPagination.sideInterval - 1 ); i <= totalPages; i++ ) {
            lastInterval.push( i );
        }

        return [ ...firstInterval, configPagination.separator, ...lastInterval ];
    }

    if ( canSplitPagination && isPageOnLastInterval ) {

        const firstInterval = Array.from( { length: configPagination.sideInterval }, ( _, i ) => i + 1 );
        const lastInterval = [];

        for ( let i = totalPages - ( configPagination.splitInterval - 1 ); i <= totalPages; i++ ) {
            lastInterval.push( i );
        }

        return [ ...firstInterval, configPagination.separator, ...lastInterval ];
    }

    const firstInterval = Array.from( { length: configPagination.sideInterval }, ( _, i ) => i + 1 );
    const lastInterval = [];
    for ( let i = totalPages - ( configPagination.sideInterval - 1 ); i <= totalPages; i++ ) {
        lastInterval.push( i );
    }

    const positionsToRenderFromMiddle = Math.trunc( configPagination.splitInterval / 2 );
    const middleInterval = [];
    for ( let i = currentPage - positionsToRenderFromMiddle; i <= currentPage; i++ ) {
        middleInterval.push( i );
    }
    for ( let i = currentPage + 1; i <= currentPage + positionsToRenderFromMiddle; i++ ) {
        middleInterval.push( i );
    }

    return [
        ...firstInterval,
        configPagination.separator,
        ...middleInterval,
        configPagination.separator,
        ...lastInterval ];


};