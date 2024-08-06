import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';

export default function EmptyCartPage () {
    return (
        <div className='flex justify-center items-center h-[800px]'>
            <IoCartOutline size={ 80 } className='mx-5' />
            <div className='flex flex-col items-center'>
                <h1 className='text-xl font-semibold'>Tu carrito está vacío</h1>
                <Link href={ '/' } className='hover:underline'>Regresar</Link>
            </div>
        </div>
    );
}