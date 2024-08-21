'use server';

import prisma from '@/lib/prisma';

export const setTransactionId = async ( orderId: string, transactionId: string ) => {
    try {

        const updatedOrder = await prisma.order.update( {
            where: {
                id: orderId
            },
            data: {
                transactionId: transactionId
            }
        } );

        if ( !updatedOrder ) throw new Error();

        return {
            ok: true
        };

    } catch ( error ) {
        console.log( error );

        return {
            ok: false,
            message: 'Algo ha salido mal con la transacción'
        };
    }
};