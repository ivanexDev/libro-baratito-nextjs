import BookCard from "@/components/BookCard";
import PlusButton from "@/components/PlusButton";
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

  const { data: userBooks, error: userBooksError } = await supabase
    .from("user_books")
    .select("book_id")
    .eq("user_id", user.id);

  console.error(userBooksError);

  const userBooksIds = userBooks?.map((book) => book.book_id);

  interface Book {
    id: string;
    book_title: string;
    url: string;
    image_url: string;
    author: string;
    price: number;
  }

  const { data, error: bookError } = await supabase
    .from("books")
    .select("id, book_title, url, image_url, author")
    .in("id", userBooksIds as string[]);

  console.error(bookError);

  const allBooksData = data as Book[];

  const latestPrices: Record<string, number> = {};

  for (const bookId of userBooksIds!) {
    const { data: latestPrice, error: latestPriceError } = await supabase
      .from("book_prices")
      .select("price")
      .eq("book_id", bookId)
      .order("date", { ascending: false }) // Ordenamos por fecha descendente
      .limit(1); // Solo queremos el último precio

    if (latestPriceError) throw latestPriceError;

    latestPrices[bookId] = latestPrice.length ? latestPrice[0].price : null;
  }

  Object.values(latestPrices).forEach((price, index) => {
    if (allBooksData) {
      allBooksData[index]["price"] = price;
    }
  });

  console.log("resp", latestPrices);

  return (
    <div>
      <section className="flex h-full justify-center">
        <div className="mt-5">
          <div className="flex justify-between">
            <h2 className="font-bold text-4xl mb-9">Mis Libros</h2>
            <PlusButton />
          </div>
          <div className="flex gap-3 flex-wrap">
            {allBooksData &&
              allBooksData.map((book, index) => {
                return <BookCard key={index} {...book} />;
              })}
          </div>
        </div>
      </section>
    </div>
  );
}
