import { titleFont } from '@/config';
import Link from 'next/link';

interface Props {
    className?: string;
}

export const Footer = ( { className }: Readonly<Props> ) => {
    return (
        <div className={ `${ className } w-full py-4 px-5 text-sm flex justify-between` }>
            <Link href={ '/' } className='font-bold antialiased'>
                <span className={ `${ titleFont.className } font-bold` }>Teslo </span>
                <span className='font-light'>| Shop</span>
            </Link>
            <span className='font-light'> { new Date().getFullYear() }</span>
        </div>
    );
};
