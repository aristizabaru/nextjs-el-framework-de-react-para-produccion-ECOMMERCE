'use client';

import { placeOrder } from '@/actions';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormatter } from '@/utils';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const TAX = 19;

export const PlaceOrder = () => {

    const [ loaded, setLoaded ] = useState( false );
    const [ isPlacingOrder, setIsPlacingOrder ] = useState( false );
    const [ errorMessage, setErrorMessage ] = useState( '' );
    const router = useRouter();

    const address = useAddressStore( state => state.address );
    const { subTotal, itemsInCart, tax, total } = useCartStore( state => state.getSummaryInformation( TAX ) );
    const cart = useCartStore( state => state.cart );
    const clearCart = useCartStore( state => state.clearCart );

    useEffect( () => {
        setLoaded( true );
    }, [] );

    const onPlaceOrder = async () => {
        setIsPlacingOrder( true );

        const productsToOrder = cart.map( product => ( {
            productId: product.id,
            quantity: product.quantity,
            size: product.size,
        } ) );

        const resp = await placeOrder( productsToOrder, address );
        if ( !resp.ok ) {
            setIsPlacingOrder( false );
            setErrorMessage( resp.message );
            return;
        }
        // La transacción fue exitosa
        clearCart();
        router.replace( `/orders/${ resp.order }` );
    };

    if ( !loaded ) return ( <p>Loading</p> );

    return (
        <div className='bg-white shadow-md px-7 py-10 h-max'>

            <h2 className='text-2xl mb-6'>Dirección de entrega</h2>
            <div className="flex flex-col gap-y-1">
                <p>{ `${ address.firstName } ${ address.lastName }` }</p>
                <p>{ `${ address.address }, ${ address.city }` }</p>
                <p>Zip Code { address.postalCode }</p>
            </div>
            {/* Divider */ }
            <div className='w-full h-[1px]  bg-gray-200 my-8' />
            <h2 className='text-2xl mb-6'>Resumen de orden</h2>
            <div className='grid grid-cols-2 gap-y-1'>
                <span className='font-bold'>No. Productos</span>
                <span className='text-right'>{ itemsInCart } artículos</span>
                <span className='font-bold'>Subtotal</span>
                <span className='text-right'>{ subTotal }</span>
                <span className='font-bold'>IVA ({ TAX }%)</span>
                <span className='text-right'>{ currencyFormatter( tax ) }</span>
                <span className='font-bold text-2xl mt-5'>TOTAL</span>
                <span className='text-right text-2xl mt-5'>{ currencyFormatter( total ) }</span>
            </div>
            <div className='mt-8'>
                {
                    errorMessage && (
                        <p className='text-sm text-rose-500 mb-3'>{ errorMessage }</p>
                    )
                }
                <button
                    onClick={ onPlaceOrder }
                    className={
                        clsx( {
                            'btn-primary': !isPlacingOrder,
                            'btn-disabled': isPlacingOrder,
                        } )
                    }
                // href={ '/orders/123' }
                >
                    Comprar
                </button>
            </div>
        </div>
    );
};
