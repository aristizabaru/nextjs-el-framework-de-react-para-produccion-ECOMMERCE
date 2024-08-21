import { useUIStore } from '@/store';
import Link from 'next/link';
import React from 'react';
import {
    IoPeopleOutline,
    IoShirtOutline,
    IoTicketOutline
} from 'react-icons/io5';

export const AdminMenu = () => {

    const { closeSideMenu } = useUIStore();


    return (
        <>
            <Link
                href={ '/admin/products' }
                onClick={ () => closeSideMenu() }
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoShirtOutline size={ 20 } />
                <span className='ml-3 uppercase font-light'>Productos</span>
            </Link>
            <Link
                href={ '/admin/orders' }
                onClick={ () => closeSideMenu() }
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoTicketOutline size={ 20 } />
                <span className='ml-3 uppercase font-light'>Ordenes</span>
            </Link>
            <Link
                href={ '/admin/users' }
                onClick={ () => closeSideMenu() }
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoPeopleOutline size={ 20 } />
                <span className='ml-3 uppercase font-light'>Usuarios</span>
            </Link>
        </>
    );
};
