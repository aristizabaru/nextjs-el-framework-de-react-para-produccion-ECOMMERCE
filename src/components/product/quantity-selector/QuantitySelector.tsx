'use client';

import { useState } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
    quantity: number;
}

export const QuantitySelector = ( { quantity: initialQuantity }: Readonly<Props> ) => {

    const [ quantity, setQuantity ] = useState( initialQuantity );

    const onAddQuantity = () => {
        if ( quantity === 5 ) return;
        setQuantity( quantity + 1 );
    };

    const onSubtractQuantity = () => {
        if ( quantity === 1 ) return;
        setQuantity( quantity - 1 );
    };

    return (
        <div className='flex'>
            <button onClick={ onSubtractQuantity }>
                <IoRemoveCircleOutline size={ 30 } />
            </button>
            <span className='w-16 mx-3 px-6 bg-gray-50 border-[1px] border-gray-200 text-center rounded flex items-center justify-center'>
                { quantity }
            </span>
            <button onClick={ onAddQuantity }>
                <IoAddCircleOutline size={ 30 } />
            </button>
        </div>
    );
};
