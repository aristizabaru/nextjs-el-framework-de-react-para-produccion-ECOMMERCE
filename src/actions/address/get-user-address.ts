'user form';

import prisma from '@/lib/prisma';

export const getUserAddress = async ( userId: string ) => {
    try {
        const userAddress = await prisma.userAddress.findFirst( { where: { userId: userId } } );

        if ( !userAddress ) return null;

        const { countryId, additionalAddress, ...rest } = userAddress;

        return {
            ...rest,
            country: countryId,
            address2: additionalAddress,
        };

    } catch ( error ) {
        console.log( error );
        return null;
    }
};