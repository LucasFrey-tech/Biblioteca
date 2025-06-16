import BookCardWithColumnInfo, { BookCardProps } from '../../bookCard/bookCardColumnInfo/book_card_column_info';
import Styles from './styles.module.css';

interface BooksDisplayerProps {
    title: string;
    rows: number;
    books: BookCardProps[];
}

export default function BooksDisplayerFlexGrid({ title, rows, books }: BooksDisplayerProps): React.JSX.Element {
    const booksXRow = Math.ceil(books.length / rows);
    return (
        <div className={Styles.container}>
            <div className={Styles.title}>
                <h3>{title}</h3>
                <hr></hr>
            </div>
            <div className={Styles.contentContainer}>
                {Array.from({ length: rows }).map((_, i) => (
                    <div className={Styles.content}>
                        {books.slice(i * booksXRow, i === 0 ? booksXRow : booksXRow * (i + 1)).map((book) => {
                            return <BookCardWithColumnInfo
                                title={book.title}
                                writer={book.writer}
                                img={book.img}
                            />
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}