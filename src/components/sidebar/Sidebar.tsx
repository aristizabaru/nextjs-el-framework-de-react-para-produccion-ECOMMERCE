'use client';

import { useSession } from "next-auth/react";
import Link from 'next/link';
import { useUIStore } from '@/store';
import clsx from 'clsx';
import {
    IoCloseOutline,
    IoLogInOutline,
    IoLogOutOutline,
    IoSearchOutline,
} from 'react-icons/io5';
import { ShopMenu } from './ShopMenu';
import { logout } from '@/actions';
import { AdminMenu } from './AdminMenu';

export const Sidebar = () => {

    const { isSideMenuOpen, closeSideMenu } = useUIStore();

    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;
    const isAdmin = session?.user.role === 'admin';

    return (
        <div>
            {/* Black background */ }
            {
                isSideMenuOpen && (
                    <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30' />
                )
            }
            {/* Blur */ }
            {
                isSideMenuOpen && (
                    <button
                        onClick={ () => closeSideMenu() }
                        className='fade-in fixed top-0 left-0 w-screen h-screen z-10  backdrop-blur-sm cursor-default' />
                )
            }
            {/* Side menu */ }
            <nav className={
                clsx(
                    'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
                    { 'translate-x-full': !isSideMenuOpen }
                )
            }>
                <IoCloseOutline
                    size={ 30 }
                    className='absolute top-5 right-5 cursor-pointer'
                    onClick={ () => closeSideMenu() }
                />
                {/* Input */ }
                <div className='relative mt-14'>
                    <IoSearchOutline size={ 20 } className='absolute top-2 left-2' />
                    <input
                        type="text"
                        placeholder='Buscar'
                        className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-[1px] border-gray-200 focus:outline-none focus:border-gray-600' />
                </div>
                {/* Shop Menu */ }
                {
                    isAuthenticated && (
                        <>
                            <ShopMenu />
                            {/* Line separator */ }
                            <div className='w-full h-px bg-gray-200 my-10' />
                        </>
                    )
                }

                {/* Admin Menu */ }
                {
                    isAdmin && (
                        <>
                            <AdminMenu />
                            {/* Line separator */ }
                            <div className='w-full h-px bg-gray-200 my-10' />
                        </>
                    )
                }

                {
                    !isAuthenticated && (
                        <Link
                            href={ '/auth/login' }
                            onClick={ () => closeSideMenu() }
                            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                        >
                            <IoLogInOutline size={ 20 } />
                            <span className='ml-3 uppercase font-light'>Ingresar</span>
                        </Link>
                    )
                }
                {
                    isAuthenticated && (
                        <button
                            onClick={ async () => {
                                await logout();
                                window.location.replace( window.location.pathname );
                            } }
                            className='flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                        >
                            <IoLogOutOutline size={ 20 } />
                            <span className='ml-3 uppercase font-light'>Salir</span>
                        </button>
                    )
                }
            </nav>

        </div>
    );
};
