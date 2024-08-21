'use server';

import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const productSchema = z.object( {
    id: z.string().uuid().optional().nullable(),
    title: z.string().min( 3 ).max( 255 ),
    slug: z.string().min( 3 ).max( 255 ),
    description: z.string(),
    price: z.coerce.number().min( 0 ).transform( val => Number( val.toFixed( 2 ) ) ),
    inStock: z.coerce.number().min( 0 ).transform( val => Number( val.toFixed( 0 ) ) ),
    categoryId: z.string().uuid(),
    sizes: z.coerce.string().transform( val => val.split( ',' ) ),
    tags: z.string(),
    gender: z.nativeEnum( Gender ),
} );

export const createUpdateProduct = async ( formData: FormData ) => {

    const data = Object.fromEntries( formData );
    const parsedProduct = productSchema.safeParse( data );

    if ( !parsedProduct.success ) {
        console.log( parsedProduct.error );
        return { ok: false };
    }

    const product = parsedProduct.data;
    product.slug = product.slug.toLowerCase().replace( / /g, '-' ).trim();

    const { id, ...restProduct } = product;


    const prismaTx = await prisma.$transaction( async ( tx ) => {
        try {
            let product: Product;
            const tagsArray = restProduct.tags.split( ',' ).map( tag => tag.trim().toLowerCase() );

            if ( id ) {
                // Actualizar

                product = await prisma.product.update( {
                    where: { id: id },
                    data: {
                        ...restProduct,
                        sizes: {
                            set: restProduct.sizes as Size[]
                        },
                        tags: {
                            set: tagsArray
                        }
                    }
                } );

            } else {
                // Crear
                product = await prisma.product.create( {
                    data: {
                        ...restProduct,
                        sizes: {
                            set: restProduct.sizes as Size[]
                        },
                        tags: {
                            set: tagsArray
                        }
                    }
                } );


            }

            return {
                ok: true,
                product: product
            };

        } catch ( error ) {
            return {
                ok: false,
            };
        }

    } );
    revalidatePath( '/admin/products' );
    revalidatePath( `/admin/product/${ prismaTx.product?.slug }` );
    revalidatePath( `/products/${ prismaTx.product?.slug }` );

    return {
        ok: true,
        product: prismaTx.product
    };
};