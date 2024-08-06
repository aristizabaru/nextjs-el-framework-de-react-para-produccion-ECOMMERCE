import { titleFont } from '@/config';
import Link from 'next/link';

export default function NewAccountPage () {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={ `${ titleFont.className } text-2xl mb-6 antialiased` }>Nueva cuenta</h1>
      <div className="flex flex-col text-sm">
        <label htmlFor="name">Nombre</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="name" />
        <label htmlFor="email">Correo electrónico</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email" />
        <label htmlFor="email">Contraseña</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email" />
        <button
          className="btn-primary">
          Crear cuenta
        </button>
        {/* divisor l ine */ }
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-700">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>
        <Link
          href="/auth/login"
          className="btn-secondary text-center">
          Login
        </Link>
      </div>
    </div>
  );
}