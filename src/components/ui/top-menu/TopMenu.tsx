'use client';

import Link from 'next/link';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';
import { useCartStore, useUIStore } from '@/store';
import { titleFont } from '@/config';
import { useEffect, useState } from 'react';

export const TopMenu = () => {

    const { openSideMenu } = useUIStore();
    const totalItemsInCart = useCartStore( state => state.getTotalItems() );
    const [ loaded, setLoaded ] = useState( false );

    // Evita error de hidratación al solo renderizar el componente
    // cuando se carga la data
    useEffect( () => {
        setLoaded( true );
    }, [] );

    return (
        <nav className='flex px-5 justify-between items-center w-full'>
            {/* Logo */ }
            <div>
                <Link href={ '/' }>
                    <span className={ `${ titleFont.className } antialiased font-bold` }>Teslo</span>
                    <span> | Shop</span>
                </Link>
            </div>
            {/* Center menu */ }
            <div className='hidden sm:block'>
                <Link
                    className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
                    href={ '/category/men' }>
                    Hombres
                </Link>
                <Link
                    className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
                    href={ '/category/women' }>
                    Mujeres
                </Link>
                <Link
                    className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
                    href={ '/category/kid' }>
                    Niños
                </Link>
            </div>
            {/* Search | Cart | Menu */ }
            <div className='flex items-center gap-2'>
                <Link href={ '/search' }>
                    <IoSearchOutline className='w-5 h-5' />
                </Link>
                <Link href={ totalItemsInCart < 1 && loaded ? '/empty' : '/cart' }>
                    <div className="relative">
                        {
                            ( loaded && totalItemsInCart > 0 ) && (
                                <span className='fade-in absolute text-xs rounded-full px-1 -top-2 -right-2 bg-blue-700 text-white'>
                                    { totalItemsInCart }
                                </span>
                            )
                        }
                        <IoCartOutline className='w-5 h-5' />
                    </div>
                </Link>
                <button
                    onClick={ () => openSideMenu() }
                    className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>
                    Menú
                </button>
            </div>
        </nav>
    );
};
