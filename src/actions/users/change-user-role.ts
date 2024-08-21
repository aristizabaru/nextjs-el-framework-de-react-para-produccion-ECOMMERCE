'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const changeUserRole = async ( userId: string, role: 'admin' | 'user' ) => {
    const session = await auth();

    if ( session?.user.role !== 'admin' ) {
        return {
            ok: false,
            message: 'Debe ser usuario administrador'
        };
    }

    try {
        await prisma.user.update( {
            where: { id: userId },
            data: {
                role: role
            }
        } );

        revalidatePath( '/admin/users' );

        return {
            ok: true
        };

    } catch ( error ) {
        console.log( error );
        return {
            ok: false,
            message: 'No se pudo actualizar el rol'
        };
    }
};