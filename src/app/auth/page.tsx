import { permanentRedirect } from 'next/navigation';

export default function AuthPage () {
    return (
        permanentRedirect( '/auth/login' )
    );
}