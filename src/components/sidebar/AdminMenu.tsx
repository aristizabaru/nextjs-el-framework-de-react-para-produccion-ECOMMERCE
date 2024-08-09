import Link from 'next/link';
import React from 'react';
import {
    IoPeopleOutline,
    IoShirtOutline,
    IoTicketOutline
} from 'react-icons/io5';

export const AdminMenu = () => {
    return (
        <>
            <Link
                href={ '/' }
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoShirtOutline size={ 20 } />
                <span className='ml-3 uppercase font-light'>Productos</span>
            </Link>
            <Link
                href={ '/' }
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoTicketOutline size={ 20 } />
                <span className='ml-3 uppercase font-light'>Ordenes</span>
            </Link>
            <Link
                href={ '/' }
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoPeopleOutline size={ 20 } />
                <span className='ml-3 uppercase font-light'>Clientes</span>
            </Link>
        </>
    );
};
