import { getOrderById } from '@/actions';
import { PayPalButton, Title } from '@/components';
import { currencyFormatter } from '@/utils';
import clsx from 'clsx';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { IoCartOutline } from 'react-icons/io5';


interface Props {
    params: {
        id: string;
    };
}

const TAX = 19;

export default async function OrderPage ( { params }: Readonly<Props> ) {

    const { id } = params;

    const { ok, order } = await getOrderById( id );

    if ( !ok ) redirect( '/' );

    console.log( order );
    const address = order!.orderAddress;


    return (
        <div className='flex justify-center items-center px-10 sm:px-0'>
            <div className='flex flex-col w-[1000px]'>
                <Title title={ 'Orden de compra' } />
                <div className='text-sm relative -top-3'>
                    <span className='font-bold'>N° de orden: </span><span>{ id }</span>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-5'>
                    {/* carrito */ }
                    <div className='flex flex-col'>
                        <div className={
                            clsx(
                                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                                {
                                    'bg-rose-500': !order!.isPaid,
                                    'bg-teal-500': order!.isPaid,

                                }
                            )
                        }>
                            <IoCartOutline size={ 30 } />
                            <span className='mx-2'>{ order!.isPaid ? 'Orden pagada' : 'Orden pendiente de pago' }</span>
                        </div>
                        {/* items */ }
                        {
                            order!.orderItem.map( item => (
                                <div key={ `${ item.product.slug } - ${ item.size }` } className='flex mb-4'>
                                    <Image
                                        src={ `/products/${ item.product.productImages[ 0 ].url }` }
                                        alt={ item.product?.title ?? 'Teslo shop' }
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
                                        <p className='text-xs'>{ item.product?.title.toUpperCase() }</p>
                                        <p className='text-sm mb-2'>{ currencyFormatter( item.price ) } x 2</p>
                                        <p className='text-sm'><span className='font-bold'>Subtotal:</span> { currencyFormatter( item.price * 3 ) }</p>
                                    </div>
                                </div>
                            ) )
                        }
                    </div>
                    {/* checkout */ }
                    <div className='bg-white shadow-md px-7 py-10 h-max'>

                        <h2 className='text-2xl mb-6'>Dirección de entrega</h2>
                        <div className="flex flex-col gap-y-1">
                            <p>{ `${ address!.firstName } ${ address!.lastName }` }</p>
                            <p>{ `${ address!.address }, ${ address!.countryId }` }</p>
                            <p>Zip Code { address!.postalCode }</p>
                        </div>
                        {/* Divider */ }
                        <div className='w-full h-[1px]  bg-gray-200 my-8' />
                        <h2 className='text-2xl mb-6'>Resumen de orden</h2>
                        <div className='grid grid-cols-2 gap-y-1'>
                            <span className='font-bold'>No. Productos</span>
                            <span className='text-right'>{ order?.itemsInOrder } artículos</span>
                            <span className='font-bold'>Subtotal</span>
                            <span className='text-right'>{ order!.subTotal }</span>
                            <span className='font-bold'>IVA ({ TAX }%)</span>
                            <span className='text-right'>{ currencyFormatter( order!.tax ) }</span>
                            <span className='font-bold text-2xl mt-5'>TOTAL</span>
                            <span className='text-right text-2xl mt-5'>{ currencyFormatter( order!.total ) }</span>
                        </div>
                        {
                            !order!.isPaid && (
                                <PayPalButton orderId={ order!.id } amount={ order!.total } />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}