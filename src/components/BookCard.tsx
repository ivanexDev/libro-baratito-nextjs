import React from "react";
import Image from "next/image";
import { toCurrency } from "@/utils/toCurrency";

interface BookCardProps {
  book_title: string;
  image_url: string;
  author: string;
  price?: number;
}

const BookCard = ({ book_title, image_url, author, price }: BookCardProps) => {
  return (
    <div className="w-64">
      <Image
        src={image_url}
        alt={book_title}
        height={300}
        width={240}
        className="object-contain h-[300px] w-[240px]  border-2 border-gray-600/20"
      />
      <div className="m-2">
        <h3 className="font-bold text-sm h-11">{book_title}</h3>
        <p>{author}</p>
        <p className="text-orange-primary font-bold text-xl">
          {price && toCurrency(price)}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
