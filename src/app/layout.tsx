import type { Metadata } from "next";
import { inter } from '@/config';
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | Shop',
    default: 'Inicio - Teslo | Shop'
  },
  description: "Una tienda virtual de productos",
};

export default function RootLayout ( { children, }: Readonly<{ children: React.ReactNode; }> ) {
  return (
    <html lang="es">
      <body className={ inter.className }>{ children }</body>
    </html>
  );
}
