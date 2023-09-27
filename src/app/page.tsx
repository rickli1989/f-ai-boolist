import { Book } from "@/types/book";
import React from "react";
import BookList from "./bookList/index";

export default async function Page() {
  const books = await getBooks();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-[100%] md:w-[75%]">
      <div className="flex max-w-full w-[285px] flex-col">
        <div className="flex flex-col self-stretch ml-4 mt-14">
          <div className="bg-red-500 flex flex-col self-stretch pl-3.5 pr-3.5 pt-6 rounded-md h-[710px]">
            <div className="flex flex-col self-stretch">
              <div className="flex max-w-full w-[234px] flex-row items-start justify-between gap-5">
                <div className="flex flex-col min-w-[91px]">
                  <div className="text-zinc-100 font-bold text-xs">
                    Shopping
                  </div>
                  <div className="text-zinc-100 font-bold text-2xl">
                    Wish list{" "}
                  </div>
                </div>
                <div className="bg-zinc-100 min-w-[36px] text-red-400 font-bold text-xs mt-5 -mr-2 px-1 py-1 rounded-sm">
                  Books
                </div>
              </div>
              <BookList books={books} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

async function getBooks() {
  const response = await fetch("http://localhost:3000/api/books");
  const books: Book[] = await response.json();

  return {
    show: books.filter((book) => !book.isHidden),
    hidden: books.filter((book) => book.isHidden),
  };
}
