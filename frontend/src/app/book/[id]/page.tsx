'use client';

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import StarRating from "@/components/ui/StarRating";
import Image from "next/image";

import { BaseApi } from "@/API/baseApi";
import { User } from "@/API/types/user";
import { Book } from "@/API/types/book";
import { Review } from "@/API/types/review";

import styles from '../../../styles/BookDetail.module.css';
import Swal from "sweetalert2";

export default function BookDetail() {
    const params = useParams();
    const [book, setBook] = useState<Book>();
    const [review, setReview] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedFormat, setSelectedFormat] = useState<'physical' | 'ebook'>('physical');

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
                    // Inicializar API
                    const api = new BaseApi(token);
                    refAPI.current = api;

                    // Obtener usuario
                    const userData = await api.users.getOne(Number(userId));
                    setUser(userData);

                    // Obtener libro
                    const bookData = await api.books.getOne(bookId);
                    setBook(bookData);

                    // Obtener reviews de un libro especifico
                    const reviewsData = await api.review.getByBookId(bookId);
                    setReview(reviewsData);
                }

            } catch (error) {
                console.error('Error al cargar los datos', error);
                setError('Error al cargar los datos del libro.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params]);

    const handleAddToCart = async () => {
        if (!book || !user || !refAPI.current) {
            alert('Libro, usuario o API no disponible ❌');
            return;
        }
        try {
            const payload = {
                idUser: user.id,
                idBook: book.id,
                amount: amount,
                virtual: selectedFormat === 'ebook'
            };
            await refAPI.current.shoppingCart.create(payload);
            Swal.fire({
             title: "Éxito",
             text: "Libro agregado al carrito correctamente",
             icon: "success",
             timer: 2000, 
             showConfirmButton: false
});
            
        } catch (error) {
            console.error('Error agregando al carrito:', error);
            Swal.fire({
            title: "Error",
            text: "No se pudo agregar el libro al carrito",
            icon: "error",
            timer: 2000, 
            showConfirmButton: false
            });
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p style={{ color: 'red' }}>❌ {error}</p>;
    if (!book) return <p>Libro no encontrado!!!</p>;

    return (
        <div className={styles.container}>
            <div className={styles.columns}>
                {/* Columna izquierda */}
                <div className={styles.leftColumn}>
                    <div className={styles.coverContainer}>
                        <Image
                            src={book.image}
                            alt={book.title}
                            className={styles.cover}
                            width={300}
                            height={450}
                            placeholder="blur"
                            blurDataURL="/libros/placeholder.png"
                        />
                    </div>
                </div>

                {/* Columna del medio */}
                <div className={styles.middleColumn}>
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

                {/* Columna derecha */}
                <div className={styles.rightColumn}>
                    <h1 className={styles.title}>{book.title}</h1>
                    <div className={styles.priceBox}>
                        <p className={styles.price}>
                            {new Intl.NumberFormat('es-AR', {
                                style: 'currency',
                                currency: 'ARS'
                            }).format(book.price)}
                        </p>
                        <button className={styles.buyButton}>Comprar Ahora</button>
                        <button className={styles.cartButton} onClick={handleAddToCart}>
                            Agregar al Carrito
                        </button>
                    </div>

                    <div className={styles.formatButtons}>
                        <button
                            className={`${styles.format} ${selectedFormat === 'physical' ? styles.active : ''}`}
                            onClick={() => setSelectedFormat('physical')}
                        >
                            Físico
                        </button>
                        <button
                            className={`${styles.format} ${selectedFormat === 'ebook' ? styles.active : ''}`}
                            onClick={() => setSelectedFormat('ebook')}
                        >
                            eBook
                        </button>
                    </div>

                    {selectedFormat === 'physical' && (
                        <div className={styles.stockBox}>
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
                    )}
                </div>
            </div>

            {/* Sinopsis debajo del contenido principal */}
            <div className={styles.sinopsis}>
                <h2>Sinopsis:</h2>
                <p>{book.description}</p>
            </div>

            {/* Reviews */}
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