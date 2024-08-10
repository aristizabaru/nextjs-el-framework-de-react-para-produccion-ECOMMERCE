import { Title } from '@/components';
import { AddressForm } from './ui/AddressForm';
import { getCountries, getUserAddress } from '@/actions';
import { auth } from '@/auth';
import { Address } from '@/interfaces';

export default async function AddressPage () {

    const session = await auth();
    const countries = await getCountries();
    const userAddress = await getUserAddress( session!.user.id );

    return (
        <div className="flex flex-col sm:justify-center sm:items-center px-10 sm:px-0">
            <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
                <Title title="Dirección" subtitle="Dirección de entrega" />
                <AddressForm countries={ countries } userStoredAddress={ userAddress as Partial<Address> } />
            </div>
        </div>
    );
}