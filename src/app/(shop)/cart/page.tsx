import Link from 'next/link';
import { Title } from '@/components';
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSummary } from './ui/OrderSummary';

export default function CartPage () {

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
                        <ProductsInCart />
                    </div>
                    {/* checkout */ }
                    <div className='bg-white shadow-md px-7 py-10 h-max'>
                        <h2 className='text-2xl mb-6'>Resumen de orden</h2>
                        <OrderSummary />
                        <div>
                            <Link className='btn-primary flex justify-center mt-8' href={ '/checkout/address' }>Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}