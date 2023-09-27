import { Book } from "@/types/book";
import Image from "next/image";
import React from "react";

export function BookItem({ book }: { book: Book }) {
  return (
    <div
      className={`shadow flex max-w-full w-[243px] flex-row items-start gap-2.5 mt-4 pl-2 pr-5 py-3 rounded-md justify-between 
    ${
      book.isHidden
        ? "bg-red-400"
        : "bg-gradient-to-r from-red-500 to-orange-200"
    }`}
    >
      <div className="flex flex-row items-start">
        <Image
          src={book.isHidden ? "/assets/eye-cross.svg" : "/assets/eye.svg"}
          alt="Cross Icon"
          className="aspect-[1.4] object-contain object-center w-3.5 max-w-full self-center -mt-0.5"
          width={24}
          height={24}
        />

        <div className="flex flex-col self-center mt-px ml-2">
          <div
            className={`text-white font-bold text-xs ${
              book.isHidden ? "line-through" : ""
            }`}
          >
            {book.title}
          </div>
          <div
            className={`text-zinc-100 mt-1 ${
              book.isHidden ? "line-through" : ""
            }`}
            style={{ fontSize: 10 }}
          >
            {book.author}
          </div>
        </div>
      </div>
      <Image
        src="/assets/cross.svg"
        alt="Cross Icon"
        className="aspect-[1] object-contain object-center w-2.5 max-w-full self-center"
        width={24}
        height={24}
      />
    </div>
  );
}
