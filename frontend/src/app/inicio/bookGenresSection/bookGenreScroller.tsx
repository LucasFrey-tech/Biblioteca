import { useEffect, useRef, useState } from "react";
import { BaseApi } from "@/API/baseApi";
import Styles from './styles.module.css';
import { BookCardProps } from "../bookCard/bookCardWithinInfo/book_card_within_info";
import BooksScroller from "../booksScroller/books_scroller";

type BooksGenreScrollerProps = {
    genreId: number;
    name: string;
    booksAmount: number;
};

export default function BooksGenreScroller({ genreId, name, booksAmount }: BooksGenreScrollerProps): React.JSX.Element {
    const [books, setBooks] = useState<BookCardProps[]>([]);
    const apiRef = useRef(new BaseApi());

    useEffect(() => {
    async function getCarouselItems() {
        try {
            const response = await apiRef.current.books.getBooksWithGenrePaginated(genreId, 1, booksAmount);

            const booksArray = response.items || [];

            const formattedBooks = booksArray.map(x => ({
                bookId: x.id,
                title: x.title,
                writer: x.author,
                img: x.image
            }));

            setBooks(formattedBooks);
        } catch (error) {
            console.error('Error al obtener libros por género paginados:', error);
            setBooks([]);
        }
    }
    getCarouselItems();
}, [genreId, booksAmount]);




    return (
        <div className={Styles.content_item} key={genreId}>
            <BooksScroller title={`Libros de ${name}`} books={books} />
        </div>
    );
}
