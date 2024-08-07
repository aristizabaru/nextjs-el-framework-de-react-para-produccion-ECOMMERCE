'use client';

import { getStockBySlug } from '@/actions';
import { useEffect, useState } from 'react';

interface Props {
    slug: string;
}

export const StockLabel = ( { slug }: Props ) => {

    const [ stock, setStock ] = useState( 0 );
    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        fetchStock();
    }, [] );

    const fetchStock = async () => {
        const inStock = await getStockBySlug( slug );
        setStock( inStock );
        setLoading( false );
    };

    return (
        <>
            {
                loading
                    ? (
                        <div className='mb-4 h-4 rounded w-1/3 animate-pulse bg-gray-200'>
                        </div>
                    )
                    : (
                        <div className='mb-4 text-xs'>
                            <span className='font-bold'>stock: </span> { stock }
                        </div>
                    )
            }
        </>
    );
};


