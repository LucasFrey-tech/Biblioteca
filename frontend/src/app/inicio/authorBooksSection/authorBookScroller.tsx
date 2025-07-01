import { useEffect, useRef, useState } from "react";
import { BaseApi } from "@/API/baseApi";
import Styles from './styles.module.css';
import { BookCardProps } from "../bookCard/bookCardWithinInfo/book_card_within_info";
import BooksScroller from "../booksScroller/books_scroller";

type AuthorBookScrollerProps = {
    authorId: number;
    name: string;
    booksAmount: number;
};

export default function AuthorBookScroller({ authorId, name, booksAmount }: AuthorBookScrollerProps): React.JSX.Element {
    const [books, setBooks] = useState<BookCardProps[]>([]);
    const apiRef = useRef(new BaseApi());

    useEffect(() => {
        async function getBooksByAuthor() {
            try {
                const response = await apiRef.current.books.getBooksByAuthorPaginated(authorId, 1, booksAmount);
                const booksArray = response.items || [];

                const formattedBooks = booksArray.map(x => ({
                    bookId: x.id,
                    title: x.title,
                    writer: x.author,
                    img: x.image
                }));

                setBooks(formattedBooks);
            } catch (error) {
                console.error("Error al obtener libros por autor:", error);
                setBooks([]);
            }
        }

        getBooksByAuthor();
    }, [authorId, booksAmount]);

    return (
        <div className={Styles.content_item} key={authorId}>
            <BooksScroller title={`Libros de ${name}`} books={books} />
        </div>
    );
}
