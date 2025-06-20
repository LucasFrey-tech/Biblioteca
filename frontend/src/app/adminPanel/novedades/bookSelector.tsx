import { BaseApi } from "@/API/baseApi";
import React, { useEffect, useRef, useState } from "react";
import Styles from "./styles.module.css"

type Book = {
    id: number;
    title: string;
}

export default function BookSelector(): React.JSX.Element {
    const bookPlaceholder: Book = { id: 0, title: "Placeholdes" }

    const [books, setBook] = useState<Book[]>([]);
    const [bookSelected, setBookSelected] = useState<Book>();

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

    function handleBookRecomendationChange(arg0: string, value: string): void {
        const newBookSelectedId = parseInt(value);
        const selectedBook = books.find(book => book.id === newBookSelectedId) ?? bookPlaceholder;
        setBookSelected(selectedBook);
    }

    return (
        <div className={Styles.bookSelector}>
            <select
                name="subscriber_exclusive"
                value={"false"}
                onChange={(e) => {
                    const value = e.target.value === "true";
                }}
                >
                {
                    books.map((book) => (
                        <option key={book.id} value={book.id}>
                            {book.title}
                        </option>
                    ))
                }
            </select>
        </div>
    )

}