import React from "react";
import Link from "next/link";
import { SubmitButton } from "./SubmitButton";
import { signOutAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import { LuLogOut } from "react-icons/lu";
import Logo from "./Logo";

export const Navbar = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    
    <nav className="bg-white text-orange-primary w-full z-10 shadow-md flex justify-between items-center px-5 min-h-[80px] h-[80px] font-bold border-b-[#D0D0D0] max-md:fixed max-md:bottom-0 max-md:inset-x-0 max-md:bg-orange-primary max-md:rounded-t-3xl">
      <Link href="/" className="flex items-center text-2xl max-md:text-white text-orange-primary">
       <Logo/>
        <span className="text-xl max-md:hidden">Libro Baratito</span>
      </Link>
      {user && (
        <form>
          <SubmitButton
          className="bg-white"
            formAction={signOutAction}
            pendingText="Cerrando Sesion..."
          >
            <span className="hidden max-md:inline-flex justify-center items-center gap-2"> <LuLogOut className="w-4 h-4" /></span>
            <span className="max-md:hidden inline-flex justify-center items-center gap-2">Cerrar Sesión<LuLogOut className="w-5 h-5" /></span>
          </SubmitButton>
        </form>
      )}
    </nav>

  );
};
