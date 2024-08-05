import { titleFont } from '@/config';
import Link from 'next/link';

export const PageNotFound = () => {
    return (
        <div className='flex flex-col-reverse md:flex-row h-[80vh] w-full justify-center items-center align-middle'>
            <div className='text-center px-5 mx-5'>
                <h2 className={ `${ titleFont.className } antialiased text-9xl mb-2` }>404</h2>
                <p className='font-semibold text-xl'>Página no encontrada</p>
                <p className="font-light">
                    <span>Puedes regresar al </span>
                    <Link href={ '/' } className='font-bold hover:underline transition-all'>Inicio</Link>
                </p>
            </div>
        </div>
    );
};
