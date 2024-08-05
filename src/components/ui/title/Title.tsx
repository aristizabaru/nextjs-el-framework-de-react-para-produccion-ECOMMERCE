import { titleFont } from '@/config';

interface Props {
    title: string;
    subtitle?: string;
    className?: string;
}

export const Title = ( { title, subtitle, className }: Props ) => {
    return (
        <div className={ `mt-3 ${ className }` }>
            <h1 className={ `${ titleFont.className } antialiased text-4xl font-semibold my-5` }>
                { title }
            </h1>
            {
                subtitle && (
                    <h3 className='text-xl mb-4'>{ subtitle }</h3>
                )
            }
        </div >
    );
};
