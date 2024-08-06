import { ProductGrid, Title } from '@/components';
import { Category } from '@/interfaces';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';

interface Props {
    params: {
        id: Category;
    };
}

const labels: Record<Category, string> = {
    men: 'HOMBRES',
    women: 'MUJERES',
    kid: 'NIÑOS',
    unisex: 'UNISEX'
};

const products = initialData.products;

export default function CategoryPage ( { params }: Readonly<Props> ) {

    const { id } = params;
    const productsByGender = products.filter( ( { gender } ) => gender === id );
    const categoryTitle = ( id in labels ) ? labels[ id ] : notFound();

    return (
        <>
            <Title
                title={ categoryTitle }
                subtitle='Todos los productos'
                className='mb-2'
            />
            <ProductGrid
                products={ productsByGender }
            />
        </>
    );
}