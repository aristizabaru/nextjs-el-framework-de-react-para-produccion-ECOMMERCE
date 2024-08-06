import { Title } from '@/components';
import { initialData } from '@/seed/seed';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';

const productsInCart = [
    initialData.products.at( 0 ),
    initialData.products.at( 1 ),
    initialData.products.at( 2 ),
];

interface Props {
    params: {
        id: string;
    };
}

export default function OrderPage ( { params }: Readonly<Props> ) {

    const { id } = params;

    // TODO: verificar
    // redirect('/')

    return (
        <div className='flex justify-center items-center px-10 sm:px-0'>
            <div className='flex flex-col w-[1000px]'>
                <Title title={ `Orden #${ id }` } />
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-5'>
                    {/* carrito */ }
                    <div className='flex flex-col'>
                        <div className={
                            clsx(
                                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                                {
                                    'bg-rose-500': false,
                                    'bg-teal-500': true,

                                }
                            )
                        }>
                            <IoCartOutline size={ 30 } />
                            {/* <span className='mx-2'>Pendiente de pago</span> */ }
                            <span className='mx-2'>Pagada</span>
                        </div>
                        {/* items */ }
                        {
                            productsInCart.map( product => (
                                <div key={ product?.slug } className='flex mb-4'>
                                    <Image
                                        src={ `/products/${ product?.images.at( 0 ) }` }
                                        alt={ product?.title ?? 'Teslo shop' }
                                        width={ 100 }
                                        height={ 100 }
                                        style={ {
                                            maxWidth: '100px',
                                            height: 'auto',
                                        } }
                                        priority
                                        className='mr-5'
                                    />
                                    <div>
                                        <p className='text-xs'>{ product?.title.toUpperCase() }</p>
                                        <p className='text-sm mb-2'>$ { product?.price } x 2</p>
                                        <p className='text-sm'><span className='font-bold'>Subtotal:</span> $ { product?.price! * 3 }</p>
                                    </div>
                                </div>
                            ) )
                        }
                    </div>
                    {/* checkout */ }
                    <div className='bg-white shadow-md px-7 py-10 h-max'>

                        <h2 className='text-2xl mb-6'>Dirección de entrega</h2>
                        <div className="flex flex-col gap-y-1">
                            <p>Andrés Aristizábal</p>
                            <p>Calle 24 #56 - 70</p>
                            <p>Envigado</p>
                            <p>ZIP 456785</p>
                        </div>
                        {/* Divider */ }
                        <div className='w-full h-[1px]  bg-gray-200 my-8' />
                        <h2 className='text-2xl mb-6'>Resumen de orden</h2>
                        <div className='grid grid-cols-2 gap-y-1'>
                            <span className='font-bold'>No. Productos</span>
                            <span className='text-right'>3 artículos</span>
                            <span className='font-bold'>Subtotal</span>
                            <span className='text-right'>$ 100</span>
                            <span className='font-bold'>IVA (19%)</span>
                            <span className='text-right'>$ 19</span>
                            <span className='font-bold text-2xl mt-5'>TOTAL</span>
                            <span className='text-right text-2xl mt-5'>$ 19</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}