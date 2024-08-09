'use client';

import { authenticate } from '@/actions';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { IoInformationCircleOutline, } from 'react-icons/io5';

export const LoginForm = () => {

    // https://authjs.dev/getting-started/authentication/credentials
    // En la implementación de la nueva cuenta se observa una implementación haciendo
    // validaciones del lado del cliente con React Hook Form
    // https://react-hook-form.com/

    const [ state, dispatch ] = useFormState( authenticate, undefined );

    useEffect( () => {
        if ( state === 'success' ) {
            window.location.replace( '/' );
        }
    }, [ state ] );


    return (
        <form action={ dispatch } className="flex flex-col text-sm">
            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"
                name='email' />
            <label htmlFor="email">Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                name='password' />

            {
                state === 'error' && (
                    <>
                        <p
                            className='text-sm text-rose-500 my-3 flex items-center gap-1'>
                            <IoInformationCircleOutline className='text-rose-500' />Credenciales inválidas
                        </p>
                    </>
                )
            }
            <LoginButton />
            {/* divisor l ine */ }
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-700">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>
            <Link
                href="/auth/new-account"
                className="btn-secondary text-center">
                Crear cuenta
            </Link>
        </form>
    );
};


function LoginButton () {
    const { pending } = useFormStatus();

    return (
        <button
            type='submit'
            className={
                clsx( {
                    'btn-primary': !pending,
                    'btn-disabled': pending,
                } )
            }
            disabled={ pending }>
            Ingresar
        </button>
    );
}