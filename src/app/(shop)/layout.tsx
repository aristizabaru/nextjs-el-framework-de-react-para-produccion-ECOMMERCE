import { Sidebar, TopMenu } from '@/components';

export default function ShopLayout ( { children }: Readonly<{ children: React.ReactNode; }> ) {
    return (
        <main className='min-h-screen '>
            <TopMenu />
            <Sidebar />
            <div className='px-4 sm:px-8'>
                { children }
            </div>
        </main>
    );
}