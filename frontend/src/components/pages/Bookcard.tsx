'use client';

import { FaCartPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import styles from '../../styles/BookCard.module.css';
import Image from 'next/image';

type Book = {
    id: number;
    image: string;
    title: string;
    price: number;
    author: string | undefined;
};

export default function BookCard({ book }: { book: Book }) {
    const authorName = book.author ?? 'Desconocido';

    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/book/${book.id}`);
    };

    const handleBuyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.card} onClick={handleCardClick}>
            <Image
                src={book.image}
                alt={book.title}
                className={styles.cover}
                width={200}
                height={300}
                placeholder="blur"
                blurDataURL="/libros/placeholder.png"
            />
            <div className={styles.titleContainer}>
                <h3 className={styles.title}>{book.title}</h3>
            </div>
            <p className={styles.author}>{authorName}</p>
            <strong className={styles.price}>
                {book.price.toLocaleString('es-AR', {
                    style: 'currency',
                    currency: 'ARS',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </strong>
            <button className={styles.buyButton} onClick={handleBuyClick}>
                <FaCartPlus className={styles.cartIcon} aria-hidden="true" />
                <span className={styles.buyText}>COMPRAR</span>
            </button>
        </div>
    );
}