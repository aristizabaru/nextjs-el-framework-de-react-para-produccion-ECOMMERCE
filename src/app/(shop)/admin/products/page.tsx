export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedOrders, getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductImage, Title } from '@/components';
import { currencyFormatter } from '@/utils';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';

interface Props {
    searchParams: {
        page?: string;
    };
}


export default async function ProductsPage ( { searchParams }: Readonly<Props> ) {

    const page = searchParams.page ? parseInt( searchParams.page ) : 1;
    const { products, totalPages } = await getPaginatedProductsWithImages( { page } );

    return (
        <>
            <Title title='Productos' subtitle='Administración de inventario' className='mb-12' />
            <div className='flex justify-end mb-5'>
                <Link
                    className='btn-primary'
                    href={ '/admin/product/new' }>
                    Nuevo producto
                </Link>
            </div>
            <div className="mb-10">
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Imagen
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Título
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Precio
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Género
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Stock
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Tallas
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map( product => (
                                <tr
                                    key={ product.id }
                                    className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                >

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <Link href={ `/product/${ product.slug }` }>
                                            <ProductImage
                                                src={ product.productImages.at( 0 )?.url }
                                                alt='Teslo Shop'
                                                width={ 80 }
                                                height={ 80 }
                                                className='w-20 h-20 rounded'
                                            />
                                        </Link>
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <Link
                                            href={ `/admin/product/${ product.slug }` }
                                            className='hover:underline'
                                        >
                                            { product.title }
                                        </Link>
                                    </td>
                                    <td className=" text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        { currencyFormatter( product.price ) }
                                    </td>
                                    <td className=" text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        { product.gender }
                                    </td>
                                    <td className=" text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        { product.inStock }
                                    </td>
                                    <td className=" text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        { product.sizes.join( ', ' ) }
                                    </td>
                                </tr>
                            ) )
                        }
                    </tbody>
                </table>
                <Pagination totalPages={ totalPages } className='mt-10' />
            </div>
        </>
    );
}