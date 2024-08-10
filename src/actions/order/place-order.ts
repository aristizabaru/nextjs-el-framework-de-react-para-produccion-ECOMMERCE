'use server';

import { auth } from '@/auth';
import type { Address } from '@/interfaces';
import prisma from '@/lib/prisma';
import type { Size } from '@prisma/client';

interface ProductsToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async ( productsIds: ProductsToOrder[], address: Address ) => {
    try {

        // 1. Obtener datos de la sesión
        const session = await auth();
        const userId = session?.user.id;

        if ( !userId ) {
            return {
                ok: false,
                message: 'No hay sesión de usuario'
            };
        }

        // 2. Obtener datos de los productos
        // Nota: se pueden llevar 2+ productos con el mismo ID (diferentes tallas)

        const products = await prisma.product.findMany( {
            where: {
                id: {
                    in: productsIds.map( p => p.productId )
                }
            }
        } );


        // 3. Calcular los precios
        const itemsInOrder = productsIds.reduce( ( count, product ) => count + product.quantity, 0 );

        // 4. Cálculo del TAX (IVA), sub total y total
        // Nota: el IVA debe ser una constante desde BD para mantener integridad entre front y back
        const { subTotal, tax, total } = productsIds.reduce( ( totals, item ) => {

            const productQuantity = item.quantity;
            const product = products.find( product => product.id === item.productId );

            if ( !product ) throw new Error( `${ item.productId } no existe` );

            const subTotal = product.price * productQuantity;

            totals.subTotal += subTotal;
            totals.tax += subTotal * 0.19;
            totals.total += subTotal * 1.19;

            return totals;

        }, { subTotal: 0, tax: 0, total: 0 } );

        // 5. Crear la transacción de BD
        // https://www.prisma.io/docs/orm/prisma-client/queries/transactions#interactive-transactions

        const prismaTX = await prisma.$transaction( async ( tx ) => {

            // 5.1 Actualizar stock de productos
            const updatedProductPromises = products.map( ( product ) => {
                // Acumular valores de productos en orden (total de items)
                const productQuantity = productsIds
                    .filter( p => p.productId === product.id )
                    .reduce( ( accumulate, item ) => item.quantity + accumulate, 0 );

                if ( productQuantity === 0 ) {
                    throw new Error( `${ product.id } no tiene cantidad definida` );
                }

                return tx.product.update( {
                    where: {
                        id: product.id
                    },
                    data: {
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                } );

            } );

            const updatedProducts = await Promise.all( updatedProductPromises );

            // Verificar valores negativos en la existencia (no se puede comprar y se debe hacer rollback)
            updatedProducts.forEach( product => {
                if ( product.inStock < 0 ) {
                    throw new Error( `${ product.title } no tiene inventario suficiente` );
                }
            } );

            // 5.2 Crear la orden (encabezado - detalle)
            const order = await tx.order.create( {
                data: {
                    userId: userId,
                    itemsInOrder: itemsInOrder,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,
                    orderItem: {
                        createMany: {
                            data: productsIds.map( p => ( {
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price: products.find( product => product.id === p.productId )?.price ?? 0
                            } ) )
                        }
                    }
                }
            } );

            // - Validar si el price es 0 entonces se debe de enviar un error

            // 5.3 Crear la dirección de la orden
            const { country, address2, ...restAddress } = address;

            const orderAddress = await tx.orderAddress.create( {
                data: {
                    ...restAddress,
                    additionalAddress: address2,
                    countryId: country,
                    orderId: order.id
                }
            } );

            return {
                order: order,
                orderAddress: orderAddress,
                updatedProducts: updatedProducts,
            };
        } );

        return {
            ok: true,
            order: prismaTX.order.id,
            prismaTX: prismaTX
        };

    } catch ( error: any ) {
        return {
            ok: false,
            message: error.message
        };
    }
};