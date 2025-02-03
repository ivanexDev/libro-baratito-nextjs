import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/FormMessage";
import { SubmitButton } from "@/components/SubmitButton";

export default async function ResetPassword(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="w-full h-full flex justify-center items-center">
      <form className="flex flex-col gap-4">
        <h2 className="text-center text-2xl text-gray-800 font-bold">
          Cambiar contraseña
        </h2>
        <p className="text-gray-600 text-center">
          Por favor ingresa tu nueva contraseña
        </p>
        <div className="flex flex-col gap-1">
          <label className="text-gray-600" htmlFor="password">
            Contraseña nueva
          </label>
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Contraseña nueva"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-600" htmlFor="confirmPassword">
            Confirmar Contraseña
          </label>
          <input
            className="input"
            type="password"
            name="confirmPassword"
            placeholder="Confirmar Contraseña"
            required
          />
        </div>

        <SubmitButton
          pendingText="Cargando..."
          formAction={resetPasswordAction}
        >
          Cambiar Contraseña
        </SubmitButton>
        
        <FormMessage message={searchParams}/>
      </form>
    </div>
  );
}
