'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import StarRating from "@/components/ui/StarRating";
import Image from "next/image";

import styles from '../../../styles/BookDetail.module.css';

type Author = {
    id: number;
    name: string;
};

type Book = {
    id: number;
    title: string;
    author: string;
    author_id: number;
    description: string;
    genre: string[];
    anio: number;
    isbn: string;
    image: string;
    stock: number;
    subscriber_exclusive: boolean;
    price: number;
}

type Review = {
    id: number;
    id_user: number;
    username: string;
    comment: string;
    rating: number;
    reviewDate: string;
};

export default function BookDetail() {
    const params = useParams();
    const [book, setBook] = useState<Book>();
    const [review, setReview] = useState<Review[]>([]);


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if (!params || !params.id) {
            setError('ID del libro no proporcionado.');
            setLoading(false);
            return;
        }

        const bookId = Array.isArray(params.id) ? parseInt(params.id[0]) : parseInt(params.id);

        if (isNaN(bookId)) {
            setError('ID del libro inválido.');
            setLoading(false);
            return;
        }


        const fetchData = async () => {
            try {
                const resBook = await fetch(`http://localhost:3001/books/${bookId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const dataBook = await resBook.json();

                setBook(dataBook);

                if (!resBook.ok) throw new Error('Libro no encontrado');

                const resReviews = await fetch(`http://localhost:3001/reviews/book/${bookId}`);
                const reviewsData = await resReviews.json();

                setReview(reviewsData);

            } catch (error) {
                console.error('Error al cargar los datos', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p style={{ color: 'red' }}>❌ {error}</p>;
    if (!book) return <p>Libro no encontrado!!!</p>;

    const imagePath = book.image
        ? `/libros/${book.image}.png`
        : '/libros/placeholder.png';

    // console.log('Genres:', book.genre);
    // console.log('Type of genres:', typeof book.genre);
    // console.log('Is Array:', Array.isArray(book.genre));

    return (
        <div className={styles.container}>
            <div className={styles.leftColumn}>
                <h1 className={styles.title}>{book.title}</h1>
                <div className={styles.coverContainer}>
                    <Image
                        src={imagePath}
                        alt={book.title}
                        className={styles.cover}
                        width={300}
                        height={450}
                        placeholder="blur"
                        blurDataURL="/libros/placeholder.png"
                    />
                </div>
                <div className={styles.synopsis}>
                    <h2>Sinopsis:</h2>
                    <p>{book.description}</p>
                </div>
            </div>

            <div className={`${styles.middleColumn}`}>
                <div className={styles.meta}>
                    <p><strong>Autor:</strong> {book.author}</p>
                    <p><strong>Año:</strong> {book.anio}</p>
                    <p><strong>Categorías:</strong></p>
                    <ul>
                        {book.genre.map((cat, idx) => (
                            <li key={idx}>{cat}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={styles.rightColumn}>
                <div className={styles.priceBox}>
                    <p className={styles.price}>
                        {new Intl.NumberFormat('es-AR', {
                            style: 'currency',
                            currency: 'ARS'
                        }).format(book.price)}
                    </p>
                    <button className={styles.buyButton}>Comprar Ahora</button>
                    <button className={styles.cartButton}>Agregar al Carrito</button>
                </div>

                <div className={styles.formatButtons}>
                    <button className={styles.format}>Físico</button>
                    <button className={styles.format}>eBook</button>
                </div>

                <div className={styles.stock}>
                    <p><strong>Stock Disponible</strong></p>
                    <p>Cantidad: {book.stock} Unidades</p>
                </div>
            </div>

            <div className={styles.reviews}>
                <h2>Reviews:</h2>
                {review.length === 0 ? (
                    <p>No hay reviews aún.</p>
                ) : (
                    review.map((r) => (
                        <div key={r.id} className={styles.reviewCard}>
                            <div className={styles.avatar}></div>
                            <div className={styles.reviewContent}>
                                <div className={styles.reviewHeader}>
                                    <strong>{r.username}</strong>
                                    <StarRating rating={r.rating} />
                                </div>
                                <p>{r.comment}</p>
                                <small>{r.reviewDate}</small>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
