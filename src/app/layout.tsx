import type { Metadata } from "next";
import { inter } from '@/config';
import { Provider } from '@/components';
import "./globals.css";
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | Shop',
    default: 'Inicio - Teslo | Shop'
  },
  description: "Una tienda virtual de productos",
};

export default async function RootLayout ( { children, }: Readonly<{ children: React.ReactNode; }> ) {

  return (
    <html lang="es">
      <Provider>
        <body className={ inter.className }>{ children }</body>
      </Provider>
    </html>
  );
}
