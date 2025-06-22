'use client';

import { useParams, useRouter } from "next/navigation";
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
    const router = useRouter();
    const [book, setBook] = useState<Book>();
    const [review, setReview] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedFormat, setSelectedFormat] = useState<'physical' | 'ebook'>('physical');

    const [user, setUser] = useState<User>();
    const [amount, setAmount] = useState<number>(1);

    const apiRef = useRef<BaseApi | null>(null);

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

                const bookData = await (token ? new BaseApi(token) : new BaseApi()).books.getOne(bookId);
                setBook(bookData);

                if (token && userId) {
                    const api = new BaseApi(token);
                    apiRef.current = api;

                    const userData = await api.users.getOne(Number(userId));
                    setUser(userData);

                    const reviewsData = await api.review.getByBookId(bookId);
                    setReview(reviewsData);
                } else {
                    const api = new BaseApi();
                    const reviewsData = await api.review.getByBookId(bookId);
                    setReview(reviewsData);
                }
            } catch (error) {
                console.error('Error al cargar los datos', error);
                setError('Error al cargar los datos.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [params]);

    const handleAddToCart = async () => {
        if (!user) {
            router.push('/login');
            return;
        }

        if (!book || !apiRef.current) {
            alert('Libro o API no disponible ❌');
            return;
        }

        try {
            const payload = {
                idUser: user.id,
                idBook: book.id,
                amount: amount,
                virtual: selectedFormat === 'ebook'
            };

            await apiRef.current.shoppingCart.create(payload);

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

    const handleBuyNow = async () => {
        if (!user) {
            router.push('/login');
            return;
        }

        if (!book || !apiRef.current) {
            alert('Libro o API no disponible ❌');
            return;
        }

        try {
            const payload = {
                idUser: user.id,
                idBook: book.id,
                amount: 1,
                virtual: false
            };

            await apiRef.current.shoppingCart.create(payload);

            Swal.fire({
                title: "Libro agregado al carrito",
                text: "Serás redirigido al carrito.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                router.push('/shopping_cart');
            });

        } catch (error) {
            console.error('Error agregando al carrito:', error);
            Swal.fire({
                title: "Error",
                text: "No se pudo agregar el libro al carrito.",
                icon: "error",
                timer: 2000,
                showConfirmButton: false
            });
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p style={{ color: 'red' }}>❌ {error}</p>;
    if (!book) return <p>Libro no encontrado!!!</p>;

    
    const isSubscriber = user?.userSubscriptions?.some(sub => sub.ongoing);
    const showExclusiveFrame = book.subscriber_exclusive && !isSubscriber;

    return (
        <div className={styles.container}>
            <div className={styles.columns}>
                {/* Columna izquierda */}
                <div className={styles.leftColumn}>
                    <div className={`${styles.coverContainer} ${showExclusiveFrame ? styles.exclusiveFrame : ''}`}>
                        {showExclusiveFrame && (
                            <span className={styles.exclusiveBadge}>Suscriptores exclusivo</span>
                        )}
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
                                <li key={cat.id || idx}>{cat.name}</li>
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
                    </div>

                    {showExclusiveFrame ? (
                        <div className={styles.lockedMessage}>
                            <p>📚 Este libro es exclusivo para suscriptores.</p>
                            <p>Obtenga una suscripción para poder acceder a este contenido.</p>
                        </div>
                    ) : (
                        <>
                            <button className={styles.buyButton} onClick={handleBuyNow}>
                                Comprar Ahora
                            </button>
                            <button className={styles.cartButton} onClick={handleAddToCart}>
                                Agregar al Carrito
                            </button>

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
                        </>
                    )}
                </div>
            </div>

            {/* Sinopsis */}
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
                            <div className={styles.avatar}>
                            <Image
                                src="/logos/usuario.png"
                                alt={book.title}
                                className={styles.cover}
                                width={300}
                                height={450}
                            /> 
                            </div>
                            
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
