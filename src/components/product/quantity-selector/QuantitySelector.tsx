'use client';

import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
    quantity: number;
    onQuantityChanged: ( quantity: number ) => void;
}

export const QuantitySelector = ( { quantity, onQuantityChanged }: Readonly<Props> ) => {

    const onValueChange = ( value: number ) => {
        if ( quantity + value < 1 ) return;
        onQuantityChanged( quantity + value );
    };

    return (
        <div className='flex'>
            <button onClick={ () => onValueChange( -1 ) }>
                <IoRemoveCircleOutline size={ 30 } />
            </button>
            <span className='w-16 mx-3 px-6 bg-gray-50 border-[1px] border-gray-200 text-center rounded flex items-center justify-center'>
                { quantity }
            </span>
            <button onClick={ () => onValueChange( +1 ) }>
                <IoAddCircleOutline size={ 30 } />
            </button>
        </div>
    );
};
