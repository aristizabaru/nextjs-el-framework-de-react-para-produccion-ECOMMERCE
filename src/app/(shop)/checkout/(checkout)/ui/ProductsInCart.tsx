'use client';

import { useCartStore } from '@/store';
import { currencyFormatter } from '@/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const ProductsInCart = () => {

    const productsInCart = useCartStore( state => state.cart );
    const [ loaded, setLoaded ] = useState( false );

    useEffect( () => {
        setLoaded( true );
    }, [] );

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
                            <span
                                // href={ `/product/${ product.slug }` }
                                className='text-xs mb-2 block leading-5'>
                                { `${ product.size } - ${ product.title.toUpperCase() } x ( ${ product.quantity } )` }
                            </span>
                            <p className='text-sm mb-2 font-bold'>
                                $ { currencyFormatter( product.price * product.quantity ) }
                            </p>

                        </div>
                    </div>
                ) )
            }
        </>
    );
};
