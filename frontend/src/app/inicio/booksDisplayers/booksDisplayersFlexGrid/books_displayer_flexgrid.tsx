import { BookRecommendationDTO } from '@/API/types/bookRecomendation.dto';
import BookCardWithColumnInfo from '../../bookCard/bookCardColumnInfo/book_card_column_info';
import Styles from './styles.module.css';

interface BooksDisplayerProps {
    title: string;
    rows: number;
    books: BookRecommendationDTO[];
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
                    <div key={i} id={`${i}`} className={Styles.content}>
                        {books.slice(i * booksXRow, i === 0 ? booksXRow : booksXRow * (i + 1)).map((book) => {
                            return <BookCardWithColumnInfo
                                key={book.id}
                                id={book.id}
                                title={book.title}
                                writer={book.author}
                                img={book.image}
                            />
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}