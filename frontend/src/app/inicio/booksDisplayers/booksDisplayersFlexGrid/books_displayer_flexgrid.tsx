import { BookRecommendationDTO } from '@/API/types/bookRecomendation.dto';
import BookCardWithColumnInfo from '../../bookCard/bookCardColumnInfo/book_card_column_info';
import Styles from './styles.module.css';

interface BooksDisplayerProps {
    title: string;
    rows: number;
    books: BookRecommendationDTO[];
}

export default function BooksDisplayerFlexGrid({ title, books }: BooksDisplayerProps): React.JSX.Element {
    return (
        <div className={Styles.container}>
            <div className={Styles.title}>
                <h3>{title}</h3>
                <hr />
            </div>
            <div className={Styles.contentContainer}>
                <div className={Styles.content}>
                    {books.map((book) => (
                        <BookCardWithColumnInfo
                            key={book.id}
                            id={book.id}
                            title={book.title}
                            writer={book.author}
                            img={book.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
