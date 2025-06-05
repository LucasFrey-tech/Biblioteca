'use client';

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import StarRating from "@/components/ui/StarRating";
import Image from "next/image";

import { BaseApi } from "@/API/baseApi";
import { User } from "@/API/types/user";

import styles from '../../../styles/BookDetail.module.css';


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

    const [user, setUser] = useState<User>();
    const [amount, setAmount] = useState<number>(1);

    const refAPI = useRef<BaseApi | null>(null);

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
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');

                if (!token || !userId) {
                    console.warn('No hay token o userId en localStorage');
                } else {
                    // Inicializamos la API y guardamos la referencia
                    const api = new BaseApi(token);
                    refAPI.current = api;

                    // Obtenemos el usuario desde la API
                    const userData = await api.users.getOne(Number(userId));
                    setUser(userData);
                }


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

    const handleAddToCart = async () => {
        if (!book || !user) return;
        try {
            const payload = {
                idUser: user.id,
                idBook: book.id,
                amount: amount
            };

            const res = await fetch(`http://localhost:3000/shopping-cart/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('No se pudo agregar al carrito');
            alert('Libro agregado al carrito ✅');
        } catch (error) {
            console.error('Error agregando al carrito:', error);
            alert('Error al agregar al carrito ❌');
        }
    };


    if (loading) return <p>Cargando...</p>;
    if (error) return <p style={{ color: 'red' }}>❌ {error}</p>;
    if (!book) return <p>Libro no encontrado!!!</p>;

    const imagePath = book.image
        ? `/libros/${book.image}.png`
        : '/libros/placeholder.png';

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
                    <button className={styles.cartButton} onClick={handleAddToCart}>Agregar al Carrito</button>
                </div>

                <div className={styles.formatButtons}>
                    <button className={styles.format}>Físico</button>
                    <button className={styles.format}>eBook</button>
                </div>

                <div className={styles.stock}>
                    <p><strong>Stock Disponible</strong></p>
                    <p>Cantidad: {book.stock} Unidades</p>
                    <div className={styles.amountSelector}>
                        <label htmlFor="amount">Cantidad: </label>
                        <input
                            id="amount"
                            type="number"
                            min={1}
                            max={book.stock}
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className={styles.amountInput}
                        />
                    </div>
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
