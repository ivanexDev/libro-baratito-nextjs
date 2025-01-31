import { signInAction } from "@/app/actions";
import { SubmitButton } from "@/components/SubmitButton";
import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SignIn() {
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
          name="email"
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
          name="password"
        />
      </div>
      <div className="flex justify-between items-center">
        <Link href="/forgot-password" className="link">
          ¿Olvidaste tu contraseña?
        </Link>

        <Link href="/sign-up" className="link">
          ¿No tienes cuenta?
        </Link>
      </div>

      <SubmitButton pendingText="Iniciando Sesion..." formAction={signInAction}>Iniciar Sesion</SubmitButton>
      <div className="flex items-center gap-4">
        <span className="h-[1px] w-full bg-gray-600" />
        <p className="text-center text-gray-600">O</p>
        <span className="h-[1px] w-full bg-gray-600" />
      </div>
      <button type="button" className="btn bg-black text-white">
        <Github className="w-5 h-5" />
        Iniciar Sesion con Github
      </button>
    </form>
  );
}
