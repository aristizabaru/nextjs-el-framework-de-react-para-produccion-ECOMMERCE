'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from '@paypal/paypal-js';
import { PayPalCheckPayment, setTransactionId } from '@/actions';

interface Props {
    orderId: string;
    amount: number;
}

export const PayPalButton = ( { orderId, amount }: Props ) => {

    const [ { isPending } ] = usePayPalScriptReducer();

    const roundedAmount = ( Math.round( amount * 100 ) ) / 100;

    if ( isPending ) return (
        <>
            <div className='mt-8 mb-4 h-[45px] bg-slate-200 animate-pulse rounded' />
            <div className=' h-[45px] bg-slate-200 animate-pulse rounded' />
        </>
    );

    const createOrder = async ( data: CreateOrderData, actions: CreateOrderActions ): Promise<string> => {

        const transactionId = await actions.order.create( {
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: `${ roundedAmount }`,
                    },
                    invoice_id: orderId,
                }
            ],
            intent: 'CAPTURE',
        } );

        const resp = await setTransactionId( orderId, transactionId );

        if ( !resp.ok ) {
            console.log( resp.message );
        }

        return transactionId;
    };

    const onApprove = async ( data: OnApproveData, actions: OnApproveActions ): Promise<void> => {
        const details = await actions.order?.capture();
        if ( !details ) return;

        await PayPalCheckPayment( details.id! );

    };

    return (
        <div className='mt-8'>
            <PayPalButtons
                createOrder={ createOrder }
                onApprove={ onApprove }
            />
        </div>
    );
};
