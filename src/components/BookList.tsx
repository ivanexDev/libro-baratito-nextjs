import React from "react";
import BookCard from "./BookCard";
import { Book } from "@/models";

type BookListProps = {
  books: Book[];
  isLoading: boolean;
};

export default function BookList({ books, isLoading }: BookListProps) {
  if (books.length <= 0 && isLoading) {
    return <div>Cargando...</div>;
  }

  if (books.length <= 0 && !isLoading) {
    return <div>No Existen Libros Agregados</div>;
  }

  return (
    <div className="flex gap-3 flex-wrap">
      {books.length > 0 &&
        books.map((book, index) => {
          return <BookCard key={index} {...book} />;
        })}
    </div>
  );
}
