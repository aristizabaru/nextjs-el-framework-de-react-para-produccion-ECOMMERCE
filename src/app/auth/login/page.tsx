import { titleFont } from '@/config';
import { LoginForm } from './ui/LoginForm';

export default function LoginPage () {

  // Se implementa autenticación del lado del servidor según documentación de NEXT.JS
  // https://authjs.dev/getting-started/authentication/credentials
  // En la implementación de la nueva cuenta se observa una implementación haciendo
  // validaciones del lado del cliente con React Hook Form
  // https://react-hook-form.com/

  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={ `${ titleFont.className } text-2xl mb-6 antialiased` }>Ingresar</h1>
      <LoginForm />
    </div>
  );
}