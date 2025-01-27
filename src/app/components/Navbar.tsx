import React from 'react'
import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className='fixed bg-white text-orangePrimary w-full flex items-center px-5 h-[80px] text-2xl font-bold'>
        <Image src="/icon.png" alt="libro baratito logo" width={50} height={50}/>
        <span>Libro Baratito</span>
    </nav>
  )
}