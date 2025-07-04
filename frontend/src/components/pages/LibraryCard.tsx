'use client';
import { useRouter } from 'next/navigation';
import styles from '../../styles/BookCard.module.css';
import Image from 'next/image';

type Book = {
    id: number;
    image: string;
    title: string;
    author: string | undefined;
};

export default function LibraryCard({ book }: { book: Book }) {
    const authorName = book.author ?? 'Desconocido';

    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/book/${book.id}`);
    };

    const handleReadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        router.push(`/book/${book.id}/read`);
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
            <button className={styles.buyButton} onClick={handleReadClick}>
                <span className={styles.buyText}>Leer</span>
            </button>
        </div>
    );
}