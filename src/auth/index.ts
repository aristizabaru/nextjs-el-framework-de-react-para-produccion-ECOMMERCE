import NextAuth, { User } from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import { signInSchema } from '../lib/zod';
import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';
import { AdapterUser } from 'next-auth/adapters';

export const { handlers, signIn, signOut, auth } = NextAuth( {
    pages: {
        signIn: '/auth/login',
        newUser: 'auth/new-account'
    },
    providers: [
        Credentials( {
            credentials: {
                email: {},
                password: {},
            },
            // Lógica de login con credenciales
            authorize: async ( credentials ) => {

                // Zod validation
                const parsedCredentials = signInSchema.safeParse( credentials );
                if ( !parsedCredentials.success ) return null;

                const { email, password } = parsedCredentials.data;

                // Buscar correo en DB
                const user = await prisma.user.findUnique( { where: { email: email.toLocaleLowerCase() } } );
                if ( !user ) return null;

                // Comparar contraseñas
                const isAuthorized = bcryptjs.compareSync( password, user.password );
                if ( !isAuthorized ) return null;

                const { password: _, ...userWithoutPassword } = user;

                // return user object with their profile data
                return userWithoutPassword;
            },
        } )
    ],
    callbacks: {
        jwt ( { token, user } ) {
            if ( user ) { // User is available during sign-in
                token.data = user;
            }

            return token;
        },
        session ( { session, token, user } ) {

            /* IMPORTANTE PARA QUE CAMBIOS SE EJECUTEN A NIVEL DE SESSION */

            // Aquí se puede verificar antes de comenzar la sesión si alguna
            // propiedad del usuario ha cambiado en BD y debe ser actualizada
            // en las session. Toda la información es extraída del jwt pero
            // se puede revalidar si algo ha cambiado.

            session.user = token.data as AdapterUser & {
                id: string;
                name: string;
                email: string;
                emailVerified?: string;
                role: string;
                image?: string;
            } & User;

            return session;
        },
    },
} );