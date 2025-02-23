"use client";

import { getBooks } from "@/app/actions";
import React, { createContext, useEffect, useState } from "react";
import PlusButton from "./PlusButton";
import { Book } from "@/models";
import BookList from "./BookList";

interface UserBooksContext {
  books: Book[];
  updateBookList: (newItem: Book) => void;
}

const INITIAL_STATE: UserBooksContext = { books: [], updateBookList: () => {} };

export const BookContext = createContext(INITIAL_STATE);

export default function BooksContainer() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    async function loadBooks() {
      setisLoading(true);
      try {
        const allBooks = await getBooks();

        setBooks(allBooks);
      } catch (error) {

        console.log("No se pueden obtener los librps", error)
      } finally {
        setisLoading(false);
      }
    }
    loadBooks();
  }, []);

  function updateBookList(newItem: Book) {
    setBooks((prev) => [...prev, newItem]);
  }

  return (
    <BookContext.Provider value={{ books, updateBookList }}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-4xl max-md:text-2xl">Mis Libros</h2>
          <PlusButton />
        </div>
        <BookList isLoading={isLoading} books={books} />
      </div>
    </BookContext.Provider>
  );
}
