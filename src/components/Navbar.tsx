import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SubmitButton } from "./SubmitButton";
import { signOutAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";

export const Navbar = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  return (
    <nav className="bg-white text-orange-primary w-full shadow-md flex justify-between items-center px-5 min-h-[80px]  font-bold border-b-[#D0D0D0]">
      <Link href="/" className="flex items-center text-2xl">
        <Image
          src="/logo.png"
          alt="libro baratito logo"
          width={50}
          height={50}
        />
        <span>Libro Baratito</span>
      </Link>
      {user && (
        <form>
          <SubmitButton
            formAction={signOutAction}
            pendingText="Cerrando Sesion..."
          >
            Cerrar Sesion
          </SubmitButton>
        </form>
      )}
    </nav>
  );
};
