import prisma from '@/lib/prisma';

export const getProductBySlug = async ( slug: string ) => {

    try {
        const product = await prisma.product.findFirst( {
            where: {
                slug: slug
            },
            include: {
                productImages: {
                    select: {
                        url: true,
                    }
                }
            }
        } );


        if ( !product ) return null;

        const { productImages, ...rest } = product;

        return {
            ...rest,
            images: product.productImages.map( image => image.url )
        };
    } catch ( error ) {
        throw new Error( 'No se pudo cargar el producto' );
    }
};