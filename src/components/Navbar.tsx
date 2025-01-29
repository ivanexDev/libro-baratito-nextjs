import React from 'react'
import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className='bg-white text-orange-primary w-full shadow-md flex items-center px-5 h-[80px] text-2xl font-bold border-b-[#D0D0D0]'>
        <Image src="/logo.png" alt="libro baratito logo" width={50} height={50}/>
        <span>Libro Baratito</span>
    </nav>
  )
}