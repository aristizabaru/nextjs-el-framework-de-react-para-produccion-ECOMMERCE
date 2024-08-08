'use client';

import { QuantitySelector, SizeSelector } from '@/components';
import type { CartProduct, Product, Size } from '@/interfaces';
import { useCartStore } from '@/store';
import { useState } from 'react';
import { IoAlertCircleOutline } from 'react-icons/io5';

interface Props {
    product: Product;
}

export const AddToCart = ( { product }: Readonly<Props> ) => {

    const { addProductToCart } = useCartStore();

    const [ size, setSize ] = useState<Size | undefined>();
    const [ quantity, setQuantity ] = useState<number>( 1 );
    const [ posted, setPosted ] = useState( false );

    const addToCart = () => {
        setPosted( true );
        if ( !size ) return;

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images.at( 0 )!
        };

        addProductToCart( cartProduct );
        setPosted( false );
        setQuantity( 1 );
        setSize( undefined );
    };

    return (
        <>
            {
                posted && !size && (
                    <div className='text-xs text-rose-600 top-5 relative flex items-center gap-1'>
                        <IoAlertCircleOutline />
                        <span>Debe seleccionar una talla</span>
                    </div>
                )
            }

            {/* Selector de tallas */ }
            <SizeSelector
                selectedSize={ size }
                availableSizes={ product.sizes }
                onSizeChanged={ setSize }
            />
            {/* Selector de cantidad */ }
            <QuantitySelector
                quantity={ quantity }
                onQuantityChanged={ setQuantity }
            />
            {/* Botón */ }
            <button
                onClick={ addToCart }
                className='btn-primary my-5'>
                Agregar al carrito
            </button>
        </>
    );
};
