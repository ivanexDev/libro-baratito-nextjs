import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  const supabase = await createClient();
  const userName = (await params).user;

  const decodedName = decodeURIComponent(userName)

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  if (user.email !== decodedName) {
    return redirect(`/user/${user.email}`);
  }
  return <div>Usuario: {decodedName}</div>;
}
