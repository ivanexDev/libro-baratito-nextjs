import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const InterSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Libro Baratito - Seguimiento de Precios de Libros",
  description: "Encuentra ofertas de libros al instante. Agrega la URL de cualquier libro y recibe notificaciones por email cuando su precio baje.",
  keywords: "libros, ofertas, precio, seguimiento, notificaciones, descuentos",
  authors: [{ name: "IvanexDev" }, {name: "MicaheDev"}],
  openGraph: {
    title: "Libro Baratito - Seguimiento de Precios de Libros",
    description: "Encuentra ofertas de libros al instante. Agrega la URL de cualquier libro y recibe notificaciones por email cuando su precio baje.",
    type: "website",
    locale: "es_ES"
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${InterSans.className} bg-white antialiased text-sm text-gray-600 flex flex-col h-screen`}
      >
        <Navbar/>
        <main className="flex-grow">
        {children}
        </main>

        <div className="hidden max-md:flex content-normal min-h-[80px] relative bottom-0"></div>

      </body>
    </html>
  );
}
