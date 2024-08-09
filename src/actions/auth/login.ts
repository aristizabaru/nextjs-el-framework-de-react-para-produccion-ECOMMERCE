'use server';

import { signIn } from '@/auth';

export const authenticate = async ( prevState: string | undefined, formData: FormData ) => {
    try {

        await signIn( 'credentials', {
            ...Object.fromEntries( formData ), // Se envían todos los datos del formulario
            redirect: false,
        } );

        return 'success';
    } catch ( error ) {

        return 'error';
    }

};

export const loginClient = async ( email: string, password: string ) => {
    try {

        await signIn( 'credentials', { email, password } );

        return {
            ok: true,
        };
    } catch ( error ) {

        console.log( error );

        return {
            ok: false,
            message: 'No se pudo autenticar'
        };
    }
};