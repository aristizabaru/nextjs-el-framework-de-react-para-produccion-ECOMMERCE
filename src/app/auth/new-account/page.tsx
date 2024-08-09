import { titleFont } from '@/config';
import { RegisterForm } from './ui/RegisterForm';

export default function NewAccountPage () {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={ `${ titleFont.className } text-2xl mb-6 antialiased` }>Nueva cuenta</h1>
      <RegisterForm />
    </div >
  );
}