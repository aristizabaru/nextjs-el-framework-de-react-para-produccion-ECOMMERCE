"use client";

import { createUpdateProduct } from '@/actions';
import { Categories, Product, ProductImage, Size } from "@/interfaces";
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface Props {
    product: Partial<Product> & { productImages?: ProductImage[]; };
    categories: Categories[];
}

interface FormInputs {
    title: string;
    slug: string;
    description: string;
    price: number;
    inStock: number;
    sizes: string[];
    tags: string;
    gender: 'men' | 'women' | 'kid' | 'unisex';
    categoryId: string;

    // TODO: imágenes
}

const sizes = [ "XS", "S", "M", "L", "XL", "XXL" ];

export const ProductForm = ( { product, categories }: Props ) => {

    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { isValid },
        getValues,
        setValue,
        watch,
    } = useForm<FormInputs>( {
        defaultValues: {
            ...product,
            tags: product.tags?.join( ', ' ),
            sizes: product.sizes ?? []
        }
    } );

    watch( 'sizes' );

    const onSizeChanged = ( size: Size ) => {
        const sizes = new Set( getValues( 'sizes' ) );

        sizes.has( size ) ? sizes.delete( size ) : sizes.add( size );

        setValue( 'sizes', Array.from( sizes ) );
    };

    const onSubmit = async ( data: FormInputs ) => {
        const formData = new FormData();

        const { ...productToSave } = data;

        if ( product.id ) {
            formData.append( 'id', product.id ?? '' );
        }
        formData.append( 'title', productToSave.title );
        formData.append( 'slug', productToSave.slug );
        formData.append( 'description', productToSave.description );
        formData.append( 'price', productToSave.price.toString() );
        formData.append( 'inStock', productToSave.inStock.toString() );
        formData.append( 'sizes', productToSave.sizes.toString() );
        formData.append( 'tags', productToSave.tags );
        formData.append( 'categoryId', productToSave.categoryId );
        formData.append( 'gender', productToSave.gender );

        const { ok, product: updatedProduct } = await createUpdateProduct( formData );

        if ( !ok ) {
            alert( 'No se pudo actualizar' );
            return;
        }

        router.replace( `/admin/product/${ updatedProduct?.slug }` );

        console.log( { ok } );
    };

    return (
        <form
            onSubmit={ handleSubmit( onSubmit ) }
            className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-10">
            {/* Textos */ }
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Título</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200"
                        { ...register( 'title', { required: true } ) } />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Slug</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200"
                        { ...register( 'slug', { required: true } ) } />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Descripción</span>
                    <textarea
                        rows={ 5 }
                        className="p-2 border rounded-md bg-gray-200"
                        { ...register( 'description', { required: true } ) }
                    ></textarea>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Price</span>
                    <input type="number" className="p-2 border rounded-md bg-gray-200"
                        { ...register( 'price', { required: true } ) } />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Tags</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200"
                        { ...register( 'tags', { required: true, min: 0 } ) } />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Gender</span>
                    <select className="p-2 border rounded-md bg-gray-200"
                        { ...register( 'gender', { required: true } ) } >
                        <option value="">[Seleccione]</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kid">Kid</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Categoría</span>
                    <select className="p-2 border rounded-md bg-gray-200"
                        { ...register( 'categoryId', { required: true } ) } >
                        <option value="">[Seleccione]</option>
                        {
                            categories.map( category => (
                                <option key={ category.id } value={ category.id }>{ category.name }</option>
                            ) )
                        }
                    </select>
                </div>

                <button className="btn-primary w-full">
                    Guardar
                </button>
            </div>

            {/* Selector de tallas y fotos */ }
            <div className="w-full">

                <div className="flex flex-col mb-2">
                    <span>Stock</span>
                    <input type="number" className="p-2 border rounded-md bg-gray-200"
                        { ...register( 'inStock', { required: true, min: 0 } ) } />
                </div>

                {/* As checkboxes */ }
                <div className="flex flex-col">

                    <span>Tallas</span>
                    <div className="flex flex-wrap mb-2 gap-2">

                        {
                            sizes.map( size => (
                                // bg-blue-500 text-white <--- si está seleccionado
                                <div
                                    key={ size }
                                    onClick={ () => onSizeChanged( size as Size ) }
                                    className={
                                        clsx( 'flex items-center justify-center px-4 py-2 border rounded text-sm cursor-pointer',
                                            {
                                                'bg-blue-500 text-white': getValues( 'sizes' ).includes( size )
                                            }
                                        )
                                    }>
                                    <span>{ size }</span>
                                </div>
                            ) )
                        }

                    </div>


                    <div className="flex flex-col mb-2">

                        <span>Fotos</span>
                        <input
                            type="file"
                            multiple
                            className="p-2 border rounded-md bg-gray-200"
                            accept="image/png, image/jpeg, image/avif"
                        />

                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                        {
                            product.productImages?.map( image => (
                                <div key={ image.id }>
                                    <Image
                                        alt={ product.title ?? '' }
                                        src={ `/products/${ image.url }` }
                                        width={ 300 }
                                        height={ 300 }
                                        className='rounded-t shadow-md'
                                    />
                                    <button
                                        onClick={ () => console.log( image.id ) }
                                        className='btn-danger rounded-b-xl w-full'>
                                        Eliminar
                                    </button>
                                </div>
                            ) )
                        }
                    </div>

                </div>
            </div>
        </form>
    );
};