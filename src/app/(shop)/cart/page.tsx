import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { QuantitySelector, Title } from '@/components';
import { initialData } from '@/seed/seed';

const productsInCart = [
    initialData.products.at( 0 ),
    initialData.products.at( 1 ),
];

export default function CartPage () {

    // if ( !productsInCart.length ) redirect( '/empty' );

    return (
        <div className='flex justify-center items-center px-10 sm:px-0'>
            <div className='flex flex-col w-[1000px]'>
                <Title title='Carrito' />
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-5'>
                    {/* carrito */ }
                    <div className='flex flex-col'>
                        <span className='text-xl'>Agregar más items</span>
                        <Link href={ '/' } className='underline mb-8'>Continua comprando</Link>
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
                                        <p className='text-sm mb-2'>$ { product?.price }</p>
                                        <QuantitySelector quantity={ 3 } />
                                        <button className='underline mt-3 text-sm'>Remover</button>
                                    </div>
                                </div>
                            ) )
                        }
                    </div>
                    {/* checkout */ }
                    <div className='bg-white shadow-md px-7 py-10 h-max'>
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
                        <div>
                            <Link className='btn-primary flex justify-center mt-8' href={ '/checkout/address' }>Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}