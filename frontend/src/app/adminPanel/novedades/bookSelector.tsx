import { BaseApi } from "@/API/baseApi";
import React, { useEffect, useRef, useState } from "react";
import Styles from "./styles.module.css"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";

type Book = {
  id: number;
  title: string;
}
type BookSelectorProps = {
  id: number;
  idBook: number;
  onBookIdChange: (id: number, idBook: number) => void;
}

export default function BookSelector(props: BookSelectorProps): React.JSX.Element {
  const [books, setBook] = useState<Book[]>([]);

  const apiRef = useRef(new BaseApi());

  useEffect(() => {
    async function getBooks() {
      const bookData = await apiRef.current.books.getAll();
      const books = bookData.map(book => ({
        id: book.id,
        title: book.title
      }))
      setBook(books);
    }
    getBooks()
  }, []);

  function handleBookChange(value: string): void {
    const newBookSelectedId = parseInt(value);
    props.onBookIdChange(props.id,newBookSelectedId)
  }

  return (
    <div className={Styles.bookSelector}>
      <Select
        onValueChange={handleBookChange}
        value={String(props.idBook)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar autor" />
        </SelectTrigger>
        <SelectContent>
          {books.map((book) => (
            <SelectItem key={book.id} value={String(book.id)}>
              {book.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )

}