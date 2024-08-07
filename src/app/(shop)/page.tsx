export const revalidate = 60; // segundos

import { redirect } from 'next/navigation';
import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function HomePage ( { searchParams }: Props ) {

  const page = searchParams.page ? parseInt( searchParams.page ) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages( { page } );

  if ( !products.length ) redirect( '/' );

  return (
    <>
      <Title
        title='Tienda'
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
