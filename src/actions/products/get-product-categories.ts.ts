'use server';

import prisma from '@/lib/prisma';

export const getProductCategories = async () => {

    try {
        const categories = await prisma.category.findMany( {
            orderBy: {
                name: 'asc'
            }
        } );
        if ( !categories ) return [];

        return categories;

    } catch ( error ) {
        console.log( error );
        return [];
    }
};