import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { Title } from '@/components';

export default async function ProfilePage () {

    const session = await auth();
    // if ( !session?.user ) redirect( '/' );

    return (
        <div>
            <Title title='Perfil' />
            <pre>{ JSON.stringify( session!.user, null, 2 ) }</pre>
            <h2>{ session!.user.role }</h2>
        </div>
    );
}