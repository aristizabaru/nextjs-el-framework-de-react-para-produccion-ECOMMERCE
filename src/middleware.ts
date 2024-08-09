import { auth } from './auth';
import { NextResponse } from 'next/server';

// https://authjs.dev/getting-started/session-management/protecting
// https://authjs.dev/getting-started/session-management/protecting
export default auth( ( request ) => {
    const isAuthenticated = !!request.auth?.user;
    const isGoingToAuth = request.nextUrl.pathname.startsWith( '/auth' );

    if ( isAuthenticated && isGoingToAuth ) {
        return NextResponse.redirect( new URL( '/', request.url ) );
    }

    if ( !isAuthenticated && !isGoingToAuth ) {
        return NextResponse.redirect( new URL( '/auth/login', request.url ) );
    }

    return NextResponse.next();
} );

// Protected routes
export const config = {
    matcher: [
        '/auth/:path*',
        '/admin/:path*',
        '/profile/:path*',
        '/checkout/:path*',
        '/orders/:path*' ],
};