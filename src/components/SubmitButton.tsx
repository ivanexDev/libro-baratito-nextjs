"use client";

import { useFormStatus } from "react-dom";

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
      {pending ? pendingText : children}
    </button>
  );
}
