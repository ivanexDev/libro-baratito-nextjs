import React from 'react'
import Image from "next/image";
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className='bg-white text-orange-primary w-full shadow-md flex items-center px-5 h-[80px] text-2xl font-bold border-b-[#D0D0D0]'>
      <Link href="/" className='flex items-center'>
      <Image src="/logo.png" alt="libro baratito logo" width={50} height={50}/>
      <span>Libro Baratito</span>
      </Link>
    </nav>
  )
}