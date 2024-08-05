'use client';

import { Product } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
    product: Product;
}

export const ProductGridItem = ( { product }: Props ) => {

    const [ displayImage, setDisplayImage ] = useState( product.images.at( 0 ) );

    return (
        <div className='rounded-md overflow-hidden fade-in'>
            <Link href={ `/product/${ product.slug }` }>
                <Image
                    src={ `/products/${ displayImage }` }
                    alt={ product.title }
                    className='w-full object-cover'
                    width={ 500 }
                    height={ 500 }
                    onMouseEnter={ () => setDisplayImage( product.images.at( 1 ) ) }
                    onMouseLeave={ () => setDisplayImage( product.images.at( 0 ) ) }
                />
            </Link>
            <div className='p-4 flex flex-col'>
                <Link
                    className='hover:text-gray-600 text-xs'
                    href={ `/product/${ product.slug }` }>
                    { product.title.toUpperCase() }
                </Link>
                <span className='font-bold text-xs mt-1'>$ { product.price }</span>
            </div>
        </div >
    );
};
