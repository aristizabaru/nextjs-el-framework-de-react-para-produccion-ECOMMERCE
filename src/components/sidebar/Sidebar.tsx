'use client';

import { useUIStore } from '@/store';
import clsx from 'clsx';
import Link from 'next/link';
import { IoCartOutline, IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5';

export const Sidebar = () => {

    const { isSideMenuOpen, closeSideMenu } = useUIStore();

    return (
        <div>
            {/* Black background */ }
            {
                isSideMenuOpen && (
                    <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'></div>
                )
            }
            {/* Blur */ }
            {
                isSideMenuOpen && (
                    <div
                        onClick={ () => closeSideMenu() }
                        className='fade-in fixed top-0 left-0 w-screen h-screen z-10  backdrop-blur-sm'></div>
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
                {/* Menú */ }
                <Link
                    href={ '/' }
                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                >
                    <IoPersonOutline size={ 20 } />
                    <span className='ml-3 uppercase font-light'>Perfil</span>
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
                    <IoLogInOutline size={ 20 } />
                    <span className='ml-3 uppercase font-light'>Ingresar</span>
                </Link>
                <Link
                    href={ '/' }
                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                >
                    <IoLogOutOutline size={ 20 } />
                    <span className='ml-3 uppercase font-light'>Salir</span>
                </Link>
                {/* Line separator */ }
                <div className='w-full h-px bg-gray-200 my-10' />
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
            </nav>

        </div>
    );
};
