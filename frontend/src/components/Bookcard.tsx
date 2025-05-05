import { FaCartPlus } from 'react-icons/fa';
import styles from '../styles/BookCard.module.css';

type Book = {
    id_book: number;
    title: string;
    author: string;
    price: number;
};


export default function BookCard({ book }: { book: Book }) {

    const imagePath = `/books_covers/book_${book.id_book}.png`;

    const precioFormateado = `$${book.price.toFixed(2)
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')},00`;

    return (
        <div className={styles.card}>
            <img src={imagePath} alt={book.title} className={styles.cover} onError={(e) => (e.currentTarget.src = '/books_covers/placeholder.png')} />
            <h3 className={styles.title}>{book.title}</h3>
            <p className={styles.author}>{book.author}</p>
            <p className={styles.price}>{precioFormateado}</p>
            <button className={styles.buyButton}>
                <FaCartPlus className={styles.cartIcon} aria-hidden="true" />
                <span className={styles.buyText}>COMPRAR</span>
            </button>
        </div>
    );
}