import BookCard from "@/components/BookCard";
import PlusButton from "@/components/PlusButton";
import { books } from "@/db/db";
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
  return (
    <div>
      <section className="flex h-full justify-center">
        <div className="mt-5">
          <div className="flex justify-between">
            <h2 className="font-bold text-4xl mb-9">Mis Libros</h2>
            <PlusButton />
          </div>
          <div className="flex gap-3">
            {books.map((book, index) => {
              return <BookCard key={index} {...book} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
