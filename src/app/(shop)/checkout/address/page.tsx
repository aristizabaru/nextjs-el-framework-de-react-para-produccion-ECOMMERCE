import { Title } from '@/components';
import Link from 'next/link';

export default function AddressPage () {
    return (
        <div className="flex flex-col sm:justify-center sm:items-center px-10 sm:px-0">
            <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
                <Title title="Dirección" subtitle="Dirección de entrega" />
                <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2 mt-8">
                    <div className="flex flex-col mb-2">
                        <span>Nombres</span>
                        <input
                            type="text"
                            className="p-2 rounded-md bg-gray-200 border-[1px] border-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <span>Apellidos</span>
                        <input
                            type="text"
                            className="p-2 rounded-md bg-gray-200 border-[1px] border-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <span>Dirección</span>
                        <input
                            type="text"
                            className="p-2 rounded-md bg-gray-200 border-[1px] border-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <span>Dirección 2 (opcional)</span>
                        <input
                            type="text"
                            className="p-2 rounded-md bg-gray-200 border-[1px] border-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <span>Código postal</span>
                        <input
                            type="text"
                            className="p-2 rounded-md bg-gray-200 border-[1px] border-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <span>Ciudad</span>
                        <input
                            type="text"
                            className="p-2 rounded-md bg-gray-200 border-[1px] border-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <span>País</span>
                        <select
                            className="p-2 rounded-md bg-gray-200 border-[1px] border-gray-300"
                        >
                            <option value="">[ Seleccione ]</option>
                            <option value="CRI">Costa Rica</option>
                        </select>
                    </div>
                    <div className="flex flex-col mb-2">
                        <span>Teléfono</span>
                        <input
                            type="text"
                            className="p-2 rounded-md bg-gray-200 border-[1px] border-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2 sm:mt-2">
                        <Link
                            href={ '/checkout' }
                            className="btn-primary flex w-full sm:w-1/2 justify-center ">
                            Siguiente
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}