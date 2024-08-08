'use client';

import { QuantitySelector } from '@/components';
import { useCartStore } from '@/store';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export const ProductsInCart = () => {

    const updateProductQuantity = useCartStore( state => state.updateProductQuantity );
    const removeProductFromCart = useCartStore( state => state.removeProductFromCart );
    const productsInCart = useCartStore( state => state.cart );
    const [ loaded, setLoaded ] = useState( false );

    useEffect( () => {
        setLoaded( true );
    }, [] );

    useEffect( () => {
        redirectOnEmptyCart();
    }, [ productsInCart ] );

    const redirectOnEmptyCart = () => {
        if ( productsInCart.length ) return;

        redirect( '/empty' );
    };

    if ( !loaded ) {
        // Aquí va skeleton
        return (
            <p>Loading...</p>
        );
    };

    return (
        <>
            {
                productsInCart.map( product => (
                    <div key={ `${ product.slug }-${ product.size }` } className='flex mb-4'>
                        <Image
                            src={ `/products/${ product.image }` }
                            alt={ product?.title ?? 'Teslo shop' }
                            width={ 100 }
                            height={ 100 }
                            style={ {
                                maxWidth: '100px',
                                height: 'auto',
                            } }
                            priority
                            className='mr-5'
                        />
                        <div>
                            <Link href={ `/product/${ product.slug }` } className='text-xs hover:underline'>
                                { `${ product.size } - ${ product.title.toUpperCase() }` }
                            </Link>
                            <p className='text-sm mb-2'>$ { product.price }</p>
                            <QuantitySelector
                                quantity={ product.quantity }
                                onQuantityChanged={ quantity => updateProductQuantity( product, quantity ) }
                            />
                            <button
                                onClick={ () => removeProductFromCart( product ) }
                                className='underline mt-3 text-sm'>
                                Remover
                            </button>
                        </div>
                    </div>
                ) )
            }
        </>
    );
};
