import BooksContainer from "@/components/BooksContainer";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

interface UserPageProps {
  params: Promise<{ user: string }>;
}

export default async function Page({ params }: UserPageProps) {
  const supabase = await createClient();
  const userName = (await params).user;

  const decodedName = decodeURIComponent(userName);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  if (user.email !== decodedName) {
    return redirect(`/user/${user.email}`);
  }

  return (
    <section className="w-[90%] mx-auto h-full py-8">
      <BooksContainer />
    </section>
  );
}
