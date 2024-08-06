
export default function AuthLayout ( { children }: Readonly<{ children: React.ReactNode; }> ) {
    return (
        <main className='flex justify-center'>
            <div className='w-full sm:w-[300px] px-10'>
                { children }
            </div>
        </main>
    );
}