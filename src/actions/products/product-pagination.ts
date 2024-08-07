import prisma from '@/lib/prisma';
import { Gender } from '@prisma/client';

interface PaginationOptions {
    page?: number;
    take?: number;
    category?: Gender;
}

export const getPaginatedProductsWithImages = async ( { page = 1, take = 12, category }: Readonly<PaginationOptions> ) => {

    if ( isNaN( Number( page ) ) ) page = 1;
    if ( page < 1 ) page = 1;

    try {

        const products = await prisma.product.findMany( {
            take: take,
            skip: ( page - 1 ) * take,
            include: {
                productImages: {
                    take: 2,
                    select: {
                        url: true,
                    }
                }
            },
            where: {
                gender: category
            }
        } );

        const totalCount = await prisma.product.count( {
            where: {
                gender: category
            }
        } );
        const totalPages = Math.ceil( totalCount / take );

        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map( product => ( {
                ...product,
                images: product.productImages.map( image => image.url )
            } ) )
        };
    } catch ( error ) {
        throw new Error( 'No se pudieron cargar los productos' );
    }
};