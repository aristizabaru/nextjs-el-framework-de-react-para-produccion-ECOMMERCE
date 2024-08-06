import { Footer, Sidebar, TopMenu } from '@/components';

export default function ShopLayout ( { children }: Readonly<{ children: React.ReactNode; }> ) {
    return (
        <main className='min-h-screen grid grid-cols-1'>
            <TopMenu />
            <Sidebar />
            <div className='px-4 sm:px-8'>
                { children }
            </div>
            <Footer className='place-self-end mt-8' />
        </main>
    );
}