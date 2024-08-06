import { notFound } from 'next/navigation';
import { initialData } from '@/seed/seed';
import { titleFont } from '@/config';
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector } from '@/components';

interface Props {
    params: {
        slug: string;
    };
}

const products = initialData.products;

export default function ProductPage ( { params }: Readonly<Props> ) {

    const { slug } = params;
    const product = products.filter( ( { slug: productSlug } ) => productSlug === slug ).at( 0 );
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
                <h1 className={ `${ titleFont.className }  antialiased text-lg` }>
                    { product.title.toUpperCase() }
                </h1>
                <p className='text-sm mb-5 font-bold'>$ { product.price }</p>
                {/* Selector de tallas */ }
                <SizeSelector selectedSize={ product.sizes.at( 1 )! } availableSizes={ product.sizes } />
                {/* Selector de cantidad */ }
                <QuantitySelector quantity={ 2 } />
                {/* Botón */ }
                <button className='btn-primary my-5'>Agregar al carrito</button>
                {/* Descripción */ }
                <h3 className='font-bold text-sm mb-2 mt-4'>Descripción</h3>
                <p className='font-light'>{ product.description }</p>
            </div>
        </div>
    );
}