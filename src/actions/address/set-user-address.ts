'use server';

import type { Address } from '@/interfaces';
import prisma from '@/lib/prisma';

export const setUserAddress = async ( address: Address, userId: string ) => {
    try {
        const savedAddress = await createOrReplaceAddress( address, userId );

        return {
            ok: true,
            address: savedAddress
        };

    } catch ( error ) {
        console.log( error );

        return {
            ok: false,
            message: 'No se pudo grabar la dirección'
        };
    }
};


const createOrReplaceAddress = async ( address: Address, userId: string ) => {
    try {

        const storeAddress = await prisma.userAddress.findFirst( { where: { userId } } );

        const addressToSave = {
            userId: userId,
            address: address.address,
            additionalAddress: address.address2,
            countryId: address.country,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            postalCode: address.postalCode,
            city: address.city,
        };

        if ( !storeAddress ) {
            const newAddress = await prisma.userAddress.create( {
                data: addressToSave
            } );

            return newAddress;
        }

        const updatedAddress = await prisma.userAddress.update( {
            data: { ...addressToSave },
            where: { userId }
        } );

        return updatedAddress;

    } catch ( error ) {
        console.log( error );
        throw new Error( 'No se pudo grabar la dirección' );
    }
};