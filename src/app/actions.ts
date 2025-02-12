"use server";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required"
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  const user = await supabase.auth.getUser();
  if (!user) {
    return redirect("/sign-in");
  }
  return redirect(`/user/${user.data.user?.email}`);
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/forgot?redirect_to=/user/${encodeURIComponent(
      email
    )}/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      `/user/${user?.email}/reset-password`,
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      `/user/${user?.email}/reset-password`,
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      `/user/${user?.email}/reset-password`,
      "Password update failed"
    );
  }

  encodedRedirect(
    "success",
    `/user/${user}/reset-password`,
    "Password updated"
  );
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const createBook = async (
  book_title: string,
  url: string,
  image_url: string,
  author: string,
  price: number | string
) => {
  const supabase = await createClient();

  // Obtener el usuario autenticado
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    console.error("Error obteniendo el usuario:", userError);
    return;
  }

  const user_id = userData.user.id;

  // Verificar si el libro ya existe en la base de datos
  const { data: existingBook, error: fetchBookError } = await supabase
    .from("books")
    .select("id")
    .eq("url", url)
    .single();

  let book_id;

  if (fetchBookError) {
    if (fetchBookError.code !== "PGRST116") {
      // Error de "no rows found"
      console.error("Error buscando el libro:", fetchBookError);
      return;
    }
  }

  if (!existingBook) {
    // Insertar el libro en la tabla "books" solo si no existe
    const { data: bookData, error: bookError } = await supabase
      .from("books")
      .insert([{ book_title, url, image_url, author }])
      .select()
      .single();
    console.log("este es el precio antes de la funcion", price);
    await addPrice(price, url);

    if (bookError || !bookData) {
      console.error("Error insertando el libro:", bookError);
      return;
    }

    book_id = bookData.id;
  } else {
    book_id = existingBook.id;
  }

  // Verificar si el usuario ya tiene asociado este libro
  const { data: existingUserBook, error: fetchUserBookError } = await supabase
    .from("user_books")
    .select("id")
    .eq("user_id", user_id)
    .eq("book_id", book_id)
    .single();

  if (fetchUserBookError && fetchUserBookError.code !== "PGRST116") {
    console.error(
      "Error verificando la asociación del libro con el usuario:",
      fetchUserBookError
    );
    return;
  }

  if (!existingUserBook) {
    // Asociar el libro al usuario si no está registrado en user_books
    const { error: userBookError } = await supabase
      .from("user_books")
      .insert([{ user_id, book_id }]);

    if (userBookError) {
      console.error("Error asociando el libro al usuario:", userBookError);
    } else {
      console.log(`Libro "${book_title}" asociado al usuario ${user_id}`);
    }
  } else {
    console.log(
      `El usuario ${user_id} ya tiene asociado el libro "${book_title}"`
    );

    return book_id
  }
};

export const addPrice = async (price: number | string, url: string) => {
  const supabase = await createClient();

  // Obtener el book_id
  const { data: book, error: bookError } = await supabase
    .from("books")
    .select("id")
    .eq("url", url)
    .single();

  if (bookError || !book) {
    console.error("Error obteniendo el book_id:", bookError);
    return null;
  }

  const book_id = book.id;
  console.log("Book ID:", book_id);

  console.log("Precio del libro:", price);

  // Insertar el precio en book_prices
  const { data: priceData, error: priceError } = await supabase
    .from("book_prices") // Asegúrate de que el nombre de la tabla sea 'book_prices'
    .insert([{ book_id, price }]) // Usa 'precio' en lugar de 'price'
    .select()
    .single();

  if (priceError || !priceData) {
    console.error("Error al agregar el precio:", priceError);
    return null;
  }

  console.log("Precio agregado exitosamente:", priceData);
};

interface Book {
  id: string;
  book_title: string;
  image_url: string;
  author: string;
  price?: number;
}

export async function getBooks() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userBooks, error: userBooksError } = await supabase
    .from("user_books")
    .select("book_id")
    .eq("user_id", user?.id);

  if (userBooksError) {
    console.error(userBooksError.message);
    throw new Error("Error fetching user books"); // Lanza el error
  }

  const userBooksIds = userBooks?.map((book) => book.book_id);

  const { data, error: bookError } = await supabase
    .from("books")
    .select("id, book_title, url, image_url, author")
    .in("id", userBooksIds as string[]);

  if (bookError) {
    console.error(bookError.message);
    throw new Error("Error fetching books"); // Lanza el error
  }

  const allBooksData: Book[] = data;

  const latestPrices: Record<string, number> = {};

  if (userBooksIds) {
    // Verifica si userBooksIds existe antes de iterar
    for (const bookId of userBooksIds) {
      const { data: latestPrice, error: latestPriceError } = await supabase
        .from("book_prices")
        .select("price")
        .eq("book_id", bookId)
        .order("date", { ascending: false })
        .limit(1);

      if (latestPriceError) {
        console.error("Error fetching latest price:", latestPriceError);
        throw new Error("Error fetching latest price"); // Lanza el error
      }

      latestPrices[bookId] = latestPrice.length ? latestPrice[0].price : null;
    }

    Object.values(latestPrices).forEach((price, index) => {
      if (allBooksData && allBooksData[index]) {
        // Verifica si allBooksData[index] existe
        allBooksData[index]["price"] = price;
      }
    });
  }

  return allBooksData;
}
