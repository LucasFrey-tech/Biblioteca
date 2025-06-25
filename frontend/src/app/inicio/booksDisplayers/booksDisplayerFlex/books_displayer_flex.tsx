import BookCardWithColumnInfo,{BookCardProps} from '../../bookCard/bookCardColumnInfo/book_card_column_info';
import Styles from './styles.module.css';

interface BooksDisplayerProps {
    title: string;
    books: BookCardProps[];
}

export default function BooksDisplayerFlex({title,books}:BooksDisplayerProps): React.JSX.Element {
    return (
        <div className={Styles.container}>
            <div className={Styles.title}>
                <h3>{title}</h3>
                <hr></hr>
            </div>
            <div className={Styles.content}>
                {books.map((book) => (
                    <BookCardWithColumnInfo
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        writer={book.writer}
                        img={book.img}
                    />
                ))}
            </div>
      </div>
    );
}