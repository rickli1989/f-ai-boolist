"use client";
import { Book } from "@/types/book";
import React, { useState } from "react";
import Image from "next/image";
import { BookItem } from "../components/BookItem";
import { BookDetail } from "../components/BookDetail";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DragUpdate,
} from "react-beautiful-dnd";

export default function BookList({
  books,
}: {
  books: { show: Book[]; hidden: Book[] };
}) {
  const [showBooks, setShowBooks] = useState(books.show);
  const [hiddenBooks, setHiddenBooks] = useState(books.hidden);
  const [hoveredBookId, setHoveredBookId] = useState<string | null>(null);
  const [hasChanged, setHasChanged] = useState(false);
  const [hidePlaceholder, setHidePlaceholder] = useState(false);

  // Fetch the books from the server
  const fetchBooks = async () => {
    const response = await fetch("http://localhost:3000/api/books");
    const fetchedBooks: Book[] = await response.json();
    const organizedBooks = {
      show: fetchedBooks.filter((book) => !book.isHidden),
      hidden: fetchedBooks.filter((book) => book.isHidden),
    };
    setShowBooks(organizedBooks.show);
    setHiddenBooks(organizedBooks.hidden);
  };

  const onDragUpdateHandler = (update: DragUpdate) => {
    if (update.destination) {
      if (update.destination.droppableId === "hiddenList") {
        setHidePlaceholder(true);
      } else {
        setHidePlaceholder(false);
      }
    }
  };

  const onDragStart = () => {
    setHasChanged(false);
  };

  const handleMouseEnter = (bookId: string) => {
    setHoveredBookId(bookId);
  };

  const handleMouseLeave = () => {
    setHoveredBookId(null);
  };

  const getBookById = (bookId: string): Book =>
    books.show.concat(books.hidden).find((b) => b.id === bookId)!;

  const resetBooks = () => {
    fetchBooks();
    setHasChanged(false);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside the droppable area
    if (!destination) {
      return;
    }

    let sourceList, setSourceList;

    if (source.droppableId === "showList") {
      sourceList = books.show;
      setSourceList = setShowBooks;
    } else {
      sourceList = books.hidden;
      setSourceList = setHiddenBooks;
    }

    if (source.droppableId !== destination.droppableId) {
      let destinationList, setDestinationList;

      if (source.droppableId === "showList") {
        destinationList = books.hidden;
        setDestinationList = setHiddenBooks;
      } else {
        destinationList = books.show;
        setDestinationList = setShowBooks;
      }

      // Remove book from source and add to destination
      const [movedBook] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, movedBook);

      // Update isHidden attribute
      movedBook.isHidden = !movedBook.isHidden;

      // Update state to trigger rerender
      setSourceList([...sourceList]);
      setDestinationList([...destinationList]);
    } else {
      // Reordering within the same list
      const [reorderedItem] = sourceList.splice(source.index, 1);
      sourceList.splice(destination.index, 0, reorderedItem);

      // Update state to trigger rerender
      setSourceList([...sourceList]);
    }
    setHasChanged(true);
    setHidePlaceholder(false);
  };

  return (
    <div className="flex">
      <div>
        <DragDropContext
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdateHandler}
        >
          <Droppable droppableId="showList">
            {(provided) => {
              return (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {showBooks.map((book, index) => (
                    <Draggable
                      key={book.id}
                      draggableId={book.id}
                      index={index}
                    >
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onMouseEnter={() => handleMouseEnter(book.id)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <BookItem book={book} />
                          </div>
                        );
                      }}
                    </Draggable>
                  ))}
                  {hidePlaceholder ? null : provided.placeholder}
                </div>
              );
            }}
          </Droppable>

          <div className="flex max-w-full w-[238px] flex-row items-start gap-4 mt-3.5 justify-between">
            <div className="bg-white self-center min-h-[1px] w-30p" />
            <div className="text-white font text-xs self-center text-center">
              Hidden list
            </div>
            <div className="bg-white self-center min-h-[1px] w-30p" />
          </div>
          <Droppable droppableId="hiddenList">
            {(provided) => {
              return (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {hiddenBooks.map((book, index) => (
                    <Draggable
                      key={book.id}
                      draggableId={book.id}
                      index={index}
                    >
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onMouseEnter={() => handleMouseEnter(book.id)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <BookItem book={book} />
                          </div>
                        );
                      }}
                    </Draggable>
                  ))}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>

        {hasChanged && (
          <div
            className="flex flex-grow-0 h-[30px] mt-[14px] hover:cursor-pointer"
            onClick={resetBooks}
          >
            <Image
              src={"/assets/reset.svg"}
              alt={"reset"}
              className="self-center mt-1 -ml-2"
              width={40}
              height={40}
            />
            <div className=" text-orange-200 text-xs font-bold self-start">
              Reset
            </div>
          </div>
        )}
      </div>
      {hoveredBookId ? (
        <div className="fadeIn -mt-32 ml-6">
          <BookDetail book={getBookById(hoveredBookId)} />
        </div>
      ) : null}
    </div>
  );
}
