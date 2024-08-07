'use client';

import { generatePaginationNumbers } from '@/utils';
import clsx from 'clsx';
import Link from 'next/link';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface Props {
    totalPages: number;
    className?: string;
}


export const Pagination = ( { totalPages, className = '' }: Props ) => {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const pageString = searchParams.get( 'page' ) ?? 1;
    const currentPage = Number( pageString );
    if ( isNaN( currentPage ) || currentPage < 1 ) redirect( pathname );

    const allPages = generatePaginationNumbers( currentPage, totalPages );

    const createPageUrl = ( pageNumber: number | string ) => {
        const params = new URLSearchParams( searchParams );

        if ( pageNumber === '...' ) return `${ pathname }?${ params.toString() }`;
        if ( Number( pageNumber ) <= 0 ) return `${ pathname }`;
        if ( Number( pageNumber ) > totalPages ) return `${ pathname }?${ params.toString() }`;

        params.set( 'page', pageNumber.toString() );
        return `${ pathname }?${ params.toString() }`;
    };

    return (
        <div className={ `${ className } flex justify-center` }>
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none items-center">
                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={ createPageUrl( currentPage - 1 ) }>
                            <IoChevronBackOutline size={ 20 } />
                        </Link>
                    </li>

                    {
                        allPages.map( ( page, index ) => (
                            <li key={ `${ page }-${ index }` } className="page-item">
                                <Link
                                    className={
                                        clsx(
                                            'page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded',
                                            {
                                                'bg-blue-600 text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md': page === currentPage,
                                                'bg-transparent text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none': page !== currentPage,
                                            }
                                        )
                                    }
                                    href={ createPageUrl( page ) }>
                                    { page }
                                </Link>
                            </li>
                        ) )
                    }
                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={ createPageUrl( currentPage + 1 ) }>
                            <IoChevronForwardOutline size={ 20 } />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
