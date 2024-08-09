import Link from 'next/link';
import {
    IoPersonOutline,
    IoTicketOutline
} from 'react-icons/io5';
import { useUIStore } from '@/store';


export const ShopMenu = () => {

    const { closeSideMenu } = useUIStore();

    return (
        <>
            <Link
                href={ '/profile' }
                onClick={ () => closeSideMenu() }
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
        </>
    );
};
