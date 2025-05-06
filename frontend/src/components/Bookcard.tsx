"use client";

import { FaCartPlus } from 'react-icons/fa';
import { useRouter } from 'next/router';
import styles from '../styles/BookCard.module.css';

type Book = {
    id_book: number;
    title: string;
    author: string;
    price: number;
};


export default function BookCard({ book }: { book: Book }) {

    const imagePath = `/books_covers/book_${book.id_book}.png`;
    // const imageName = book.title.toLowerCase().replace(/\s+/g, '_');
    // const imagePath = `/books_covers/${imageName}.jpg`;

    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/book/${book.id_book}`);
    };

    const handleBuyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Prevent card click event from firing
        // Temporarily do nothing
    };

    return (
        <div className={styles.card} onClick={handleCardClick}>
            <img
                src={imagePath}
                alt={book.title}
                className={styles.cover}
                onError={(e) => (e.currentTarget.src = '/books_covers/default_cover.png')}
            />
            <h3 className={styles.title}>{book.title}</h3>
            <p className={styles.author}>{book.author}</p>
            <p className={styles.price}>{book.price}</p>
            <button className={styles.buyButton} onClick={handleBuyClick}>
                <FaCartPlus className={styles.cartIcon} aria-hidden="true" />
                <span className={styles.buyText}>COMPRAR</span>
            </button>
        </div>
    );
}