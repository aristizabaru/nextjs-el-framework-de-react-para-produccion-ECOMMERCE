'use client';

import { useCartStore } from '@/store';
import { currencyFormatter } from '@/utils';
import { useEffect, useState } from 'react';

const TAX = 19;

export const OrderSummary = () => {

    const { itemsInCart, subTotal, tax, total } = useCartStore( state => state.getSummaryInformation( TAX ) );
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
        <div className='grid grid-cols-2 gap-y-1'>
            <span className='font-bold'>No. Productos</span>
            <span className='text-right'>{ itemsInCart === 1 ? '1 artículo' : `${ itemsInCart } artículos` }</span>
            <span className='font-bold'>Subtotal</span>
            <span className='text-right'>{ currencyFormatter( subTotal ) }</span>
            <span className='font-bold'>IVA ({ TAX }%)</span>
            <span className='text-right'>{ currencyFormatter( tax ) }</span>
            <span className='font-bold text-2xl mt-5'>TOTAL</span>
            <span className='text-right text-2xl mt-5'>{
                itemsInCart ? currencyFormatter( total ) : currencyFormatter( 0 ) }
            </span>
        </div>
    );
};
