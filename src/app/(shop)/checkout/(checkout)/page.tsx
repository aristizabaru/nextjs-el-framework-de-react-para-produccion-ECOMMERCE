import { Title } from '@/components';
import Link from 'next/link';
import { ProductsInCart } from './ui/ProductsInCart';
import { PlaceOrder } from './ui/PlaceOrder';


export default function CheckoutPage () {
    return (
        <div className='flex justify-center items-center px-10 sm:px-0'>
            <div className='flex flex-col w-[1000px]'>
                <Title title='Checkout' />
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-5'>
                    {/* carrito */ }
                    <div className='flex flex-col'>
                        <span className='text-xl'>Verifica la orden</span>
                        <Link href={ '/cart' } className='underline mb-8'>Editar</Link>
                        {/* items */ }
                        <ProductsInCart />
                    </div>
                    {/* checkout */ }
                    <PlaceOrder />
                </div>
            </div>
        </div>
    );
}