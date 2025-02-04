'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { loginClient, registerUser } from '@/actions';
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from 'react';

type FormInputs = {
    name: string;
    email: string;
    password: string;
};


export const RegisterForm = () => {

    const [ errorMessage, setErrorMessage ] = useState( '' );
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async ( data ) => {
        setErrorMessage( '' );
        const { name, email, password } = data;

        const resRegister = await registerUser( name, email, password );

        if ( !resRegister.ok ) {
            setErrorMessage( resRegister.message! );
        }

        await loginClient( email.toLocaleLowerCase(), password );
        window.location.replace( '/' );
    };

    return (
        <form onSubmit={ handleSubmit( onSubmit ) } className="flex flex-col text-sm">
            <label htmlFor="name">Nombre</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-rose-500': errors.name
                        }
                    )
                }
                type="name"
                autoFocus
                { ...register( 'name', { required: true } ) }
            />
            <label htmlFor="email">Correo electrónico</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-rose-500': errors.email
                        }
                    )
                }
                type="email"
                { ...register( 'email', { required: true, pattern: /^\S+@\S+$/i } ) }
            />
            <label htmlFor="password">Contraseña</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-rose-500': errors.password
                        }
                    )
                }
                type="password"
                { ...register( 'password', { required: true, minLength: 8 } ) }
            />
            {
                errorMessage && ( <span className='text-sm mb-4 text-rose-500'>{ errorMessage }</span> )
            }

            <button
                className="btn-primary">
                Crear cuenta
            </button>
            {/* divisor l ine */ }
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-700">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>
            <Link
                href="/auth/login"
                className="btn-secondary text-center">
                Login
            </Link>
        </form>
    );
};
