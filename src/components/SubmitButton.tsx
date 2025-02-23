"use client";

import { useFormStatus } from "react-dom";
import { LuLoader } from "react-icons/lu";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pendingText?: string;
}

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type="submit"
      aria-disabled={pending}
      className={`btn bg-orange-primary text-white ${pending ? 'loading' : ''}`} // Añadir clases para estilos
    >
      <span className="inline-flex max-md:hidden">
        {pending ? pendingText : children}
      </span>
      <span className="hidden max-md:inline-flex">
        {pending ? <LuLoader className="animate-spin"/> : children}
      </span>
    </button>
  );
}
