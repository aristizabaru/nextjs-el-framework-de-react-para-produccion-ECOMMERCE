export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedUsers } from '@/actions';
import { Title } from '@/components';
import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';

export default async function OrdersPage () {

    const { ok, users = [] } = await getPaginatedUsers();

    if ( !ok ) redirect( '/auth/login' );


    return (
        <>
            <Title title="Usuarios" subtitle='Administradores de la tienda' className='mb-12' />
            <div className="mb-10">
                <UsersTable users={ users } />
            </div>
        </>
    );
}