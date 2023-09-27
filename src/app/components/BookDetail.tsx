import { Book } from "@/types/book";
import Image from "next/image";
import React from "react";

export function BookDetail({ book }: { book: Book }) {
  return (
    <div className="bg-red-500 flex max-w-full w-[475px] h-[710px] flex-col mt-14 pt-8 pb-6 px-5 rounded-md">
      <div className="flex max-w-full  flex-col min-h-[263px] ml-1.5 pl-5 py-10 ">
        <div className="flex-row flex max-w-full min-h-[263px] ml-1.5 pl-5 py-10 relative">
          <Image
            src={book.imageUrl}
            alt={book.title}
            width={240}
            height={300}
            className="-ml-10"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex max-w-full  mr-0 flex-col text-center ">
              <div className="text-white font-bold text-3xl">{book.title}</div>
              <a className="text-zinc-100 font-medium text-xs mt-3 ml-1">
                {book.author}
              </a>
            </div>
          </div>
        </div>
      </div>
      <a href="..." className="text-white font-bold text-xs ml-3 mt-8">
        Publisher's Summary
      </a>{" "}
      <div className="text-white font-normal text-xs ml-3 self-center text-left mt-5">
        {book.publisherSummary}
      </div>
    </div>
  );
}
