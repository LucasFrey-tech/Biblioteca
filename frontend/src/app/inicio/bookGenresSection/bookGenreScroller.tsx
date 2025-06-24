import { BaseApi } from "@/API/baseApi";
import { useEffect, useRef, useState } from "react";
import BooksScroller from "../booksScroller/books_scroller";
import Styles from './styles.module.css';
import { BookCardProps } from "../bookCard/bookCardWithinInfo/book_card_within_info";

type BooksGenreScrollerProps = {
    genreId: number
    name: string
}

export default function BooksGenreScroller({genreId,name}:BooksGenreScrollerProps): React.JSX.Element {

    const [books, setBooks] = useState<BookCardProps[]>([]);
    const apiRef = useRef(new BaseApi());

    useEffect(() => {
        async function getCarouselItems() {
            const books = await apiRef.current.books.getBooksWithGenre(genreId);
            const formatedBooks = books.map(x => {return { bookId: x.id, title: x.title, writer: x.author, img: x.image }})
            setBooks(formatedBooks);
        }
        getCarouselItems()
    }, [genreId]);

    return (
        <div className={Styles.content_item} key={genreId}>
            <BooksScroller title={`Libros de ${name}`} books={books} />
        </div>
    )
}