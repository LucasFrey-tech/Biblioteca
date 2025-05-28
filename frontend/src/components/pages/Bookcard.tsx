// 'use client';

// import { FaCartPlus } from 'react-icons/fa';
// import { useRouter } from 'next/navigation';
// import styles from '../../styles/BookCard.module.css';
// import { useState, useEffect } from 'react';
// import Image from 'next/image';

// type Author = {
//     id: number;
//     name: string;
// };

// type Book = {
//     id: number;
//     title: string;
//     price: number;
//     author: Author;
// };

// export default function BookCard({ book }: { book: Book }) {
//     const [authorName, setAuthorName] = useState<string>('Cargando...');

//     useEffect(() => {
//         fetch(`/api/authors/${book.author}`)
//             .then((res) => res.json())
//             .then((data) => setAuthorName(data.name))
//             .catch(() => setAuthorName('Desconocido'));
//     }, [book.author]);

//     const imagePath = `/libros/book_${book.id}.png`;

//     const router = useRouter();

//     const handleCardClick = () => {
//         router.push(`/book/${book.id}`);
//     };

//     const handleBuyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//         e.stopPropagation();

//     };

//     return (
//         <div className={styles.card} onClick={handleCardClick}>
//             <Image
//                 src={imagePath}
//                 alt={book.title}
//                 className={styles.cover}
//                 width={200}
//                 height={300}
//                 placeholder="blur"
//                 blurDataURL="/libros/placeholder.png"
//                 onError={(e) => {
//                     e.currentTarget.src = '/libros/placeholder.png';
//                 }}
//             />
//             <div className={styles.titleContainer}>
//                 <h3 className={styles.title}>{book.title}</h3>
//             </div>
//             <p className={styles.author}>{book.author?.name ?? 'Desconocido'}</p>
//             <strong className={styles.price}>
//                 {book.price.toLocaleString('es-AR', {
//                     style: 'currency',
//                     currency: 'ARS',
//                     minimumFractionDigits: 2,
//                     maximumFractionDigits: 2,
//                 })}
//             </strong>
//             <button className={styles.buyButton} onClick={handleBuyClick}>
//                 <FaCartPlus className={styles.cartIcon} aria-hidden="true" />
//                 <span className={styles.buyText}>COMPRAR</span>
//             </button>
//         </div>
//     );
// }

'use client';

import { FaCartPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import styles from '../../styles/BookCard.module.css';
import Image from 'next/image';

type Book = {
    id: number;
    title: string;
    price: number;
    author: {
        id: number;
        name: string;
    };
};

export default function BookCard({ book }: { book: Book }) {
    const authorName = book.author?.name ?? 'Desconocido';
    const imagePath = `/libros/book_${book.id}.png`;
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
                src={imagePath}
                alt={book.title}
                className={styles.cover}
                width={200}
                height={300}
                placeholder="blur"
                blurDataURL="/libros/placeholder.png"
                onError={(e) => {
                    e.currentTarget.src = '/libros/placeholder.png';
                }}
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