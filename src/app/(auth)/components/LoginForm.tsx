import Button from '@/components/Button'
import { Github } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const LoginForm = () => {
  return (
    <form className="flex flex-col gap-4">
      <h2 className="text-center text-2xl text-gray-800 font-bold">
        Ingresa a tu cuenta
      </h2>
      <div className="flex flex-col gap-1">
        <label className="text-gray-600" htmlFor="email">
          Correo electronico
        </label>
        <input
          className="input"
          placeholder="ejemplo@mail.com"
          type="email"
          id="email"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-gray-600" htmlFor="password">
          Contraseña
        </label>
        <input
          className="input"
          placeholder="***********"
          type="password"
          id="password"
        />
      </div>
      <div className="flex justify-between items-center">
      <Link href="/reset-password" className="link">
       ¿Olvidaste tu contraseña?
      </Link>

      <Link href="/signup" className="link">
       ¿No tienes cuenta?
      </Link>
      </div>

      <Button label="Iniciar Sesión"/>
      <div className="flex items-center gap-4">
        <span className="h-[1px] w-full bg-gray-600" />
        <p className="text-center text-gray-600">O</p>
        <span className="h-[1px] w-full bg-gray-600" />
      </div>
      <button className="btn bg-black text-white">
      <Github className="w-5 h-5"/>Iniciar Sesion con Github
      </button>
    </form>
  )
}
