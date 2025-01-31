import { forgotPasswordAction } from "@/app/actions";
import Button from "@/components/Button";
import { SubmitButton } from "@/components/SubmitButton";
import Link from "next/link";

export default function RecoveryPassword() {
  return (
    <form className="flex flex-col gap-4">
      <h2 className="text-center text-2xl text-gray-800 font-bold">
        Recuperar Contraseña
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

      <div className="flex justify-between items-center">
        <Link href="/sign-in" className="link">
          Ya tengo cuenta
        </Link>

        <Link href="/sign-up" className="link">
          ¿No tienes cuenta?
        </Link>
      </div>

      <SubmitButton pendingText="Cargando..." formAction={forgotPasswordAction}>Enviar</SubmitButton>
    </form>
  );
}
