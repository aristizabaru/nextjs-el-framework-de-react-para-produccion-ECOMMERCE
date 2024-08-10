'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export const getOrderById = async ( orderId: string ) => {

    const session = await auth();

    if ( !session?.user ) {
        return {
            ok: false,
            message: 'Debe estar autenticado'
        };
    }

    try {
        const order = await prisma.order.findUnique( {
            where: {
                id: orderId
            },
            include: {
                orderAddress: true,
                orderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,
                        product: {
                            select: {
                                title: true,
                                slug: true,

                                productImages: {
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        } );

        if ( !order ) throw `${ orderId } no existe`;
        if ( session.user.role === 'user' ) {
            if ( session.user.id !== order.userId ) {
                throw `${ orderId } no es de ese usuario`;
            }
        }

        return {
            ok: true,
            order: order
        };
    } catch ( error ) {
        console.log( error );

        return {
            ok: false,
            message: 'Orden no existe'
        };
    }
};