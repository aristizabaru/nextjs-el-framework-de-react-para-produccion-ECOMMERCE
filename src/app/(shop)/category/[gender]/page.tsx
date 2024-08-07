export const revalidate = 60; // segundos

import { Metadata, ResolvingMetadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { Gender } from '@prisma/client';

interface Props {
    params: {
        gender: string;
    },
    searchParams: {
        page?: string;
    };
}

const labels: Record<string, string> = {
    men: 'Hombres',
    women: 'Mujeres',
    kid: 'Niños',
    unisex: 'Unisex'
};

export async function generateMetadata ( { params }: Props, parent: ResolvingMetadata ): Promise<Metadata> {

    const gender = params.gender;

    return {
        title: labels[ gender ] ?? 'Teslo Shop',
        description: 'Una tienda inspirada en Tesla',
    };
}

export default async function CategoryPage ( { params, searchParams }: Readonly<Props> ) {

    const { gender } = params;
    const categoryTitle = ( gender in labels ) ? labels[ gender ] : notFound();
    const page = searchParams.page ? parseInt( searchParams.page ) : 1;
    const { products, totalPages } = await getPaginatedProductsWithImages( {
        page,
        category: gender as Gender
    } );

    if ( !products.length ) redirect( `/category/${ gender }` );

    return (
        <>
            <Title
                title={ categoryTitle.toUpperCase() }
                subtitle='Todos los productos'
                className='mb-2'
            />
            <ProductGrid
                products={ products }
            />
            <Pagination className='my-16 mb-20' totalPages={ totalPages } />
        </>
    );
}