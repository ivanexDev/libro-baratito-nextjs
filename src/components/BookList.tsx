import React from "react";
import BookCard from "./BookCard";
import { Book } from "@/models";
import { LuLoader } from "react-icons/lu";

type BookListProps = {
  books: Book[];
  isLoading: boolean;
};

export default function BookList({ books, isLoading }: BookListProps) {
  if (books.length <= 0 && isLoading) {
    return <div className="h-[50vh] flex justify-center items-center">

      <LuLoader className="w-24 h-24 animate-spin" />
    </div>;
  }

  if (books.length <= 0 && !isLoading) {
    return <div className="h-[50vh] flex justify-center items-center">No Existen Libros Agregados</div>;
  }

  return (
      <div className="flex gap-3 flex-wrap justify-center">
        {books.length > 0 &&
          books.map((book, index) => {
            return <BookCard key={index} {...book} />;
          })}
      </div>
  );
}
