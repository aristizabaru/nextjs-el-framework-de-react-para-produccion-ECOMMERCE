export const revalidate = 604800; // 7 días

import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/actions';
import { titleFont } from '@/config';
import {
    ProductMobileSlideshow,
    ProductSlideshow,
    StockLabel
} from '@/components';
import { AddToCart } from './ui/AddToCart';

interface Props {
    params: {
        slug: string;
    };
}

export async function generateMetadata ( { params }: Props, parent: ResolvingMetadata ): Promise<Metadata> {
    // read route params
    const slug = params.slug;

    // Fetch data
    const product = await getProductBySlug( slug );

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = ( await parent ).openGraph?.images || [];

    return {
        title: product?.title ?? 'Teslo Shop',
        description: product?.description ?? 'Una tienda inspirada en Tesla',
        openGraph: {
            title: product?.title ?? 'Teslo Shop',
            description: product?.description ?? 'Una tienda inspirada en Tesla',
            images: [ `/products/${ product?.images.at( 1 ) }` ],
        },
    };
}

export default async function ProductPage ( { params }: Readonly<Props> ) {

    const { slug } = params;
    const product = await getProductBySlug( slug );
    if ( !product ) notFound();

    return (
        <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>
            {/* Slideshow */ }
            <div className='col-span-1 md:col-span-2 bg-gray-200'>
                {/* Mobile slideshow */ }
                <ProductMobileSlideshow className='mb-4 block md:hidden' images={ product.images } title={ product.title } />
                {/* Desktop slide show */ }
                <ProductSlideshow className='md:block hidden' images={ product.images } title={ product.title } />
            </div>
            {/* Detalles */ }
            <div className='col-span-1 px-5'>
                <StockLabel slug={ slug } />
                <h1 className={ `${ titleFont.className }  antialiased text-lg` }>
                    { product.title.toUpperCase() }
                </h1>
                <p className='text-sm mb-5 font-bold'>$ { product.price }</p>
                {/* Add to cart */ }
                <AddToCart product={ product } />
                {/* Descripción */ }
                <h3 className='font-bold text-sm mb-2 mt-4'>Descripción</h3>
                <p className='font-light'>{ product.description }</p>
            </div>
        </div>
    );
}