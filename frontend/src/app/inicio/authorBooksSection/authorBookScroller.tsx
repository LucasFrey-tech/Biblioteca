import { BaseApi } from "@/API/baseApi";
import { useEffect, useRef, useState } from "react";
import { BookCardProps } from "../bookCard/bookCardWithinInfo/book_card_within_info";
import BooksScroller from "../booksScroller/books_scroller";
import Styles from './styles.module.css';

type AuthorBooksScrollerProps = {
    authorId: number
    name: string
}

export default function AuthorBookScroller({authorId,name}:AuthorBooksScrollerProps): React.JSX.Element{
        const [books, setBooks] = useState<BookCardProps[]>([]);
        const apiRef = useRef(new BaseApi());

        useEffect(() => {
            async function getCarouselItems() {
                const books = await apiRef.current.books.getBooksByAuthor(authorId);
                const formatedBooks = books.map(x => {return { bookId: x.id, title: x.title, writer: x.author, img: x.image }})
                setBooks(formatedBooks);
            }
            getCarouselItems()
        }, []);

        return (
            <div className={Styles.content_item} key={authorId}>
                <BooksScroller title={`Libros de ${name}`} books={books} />
            </div>
        )
}