'use client';

import { FaCartPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import styles from '../../styles/BookCard.module.css';
import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';
import { BaseApi } from '@/API/baseApi';
import { User } from '@/API/types/user';
import Swal from 'sweetalert2';

import { Book } from '@/API/types/book';
type BookCardProps = Pick<Book, 'id' | 'title' | 'price' | 'image' | 'author' | 'subscriber_exclusive'>;

export default function BookCard({ book }: { book: BookCardProps }) {
    const authorName = book.author ?? 'Desconocido';
    const router = useRouter();
    const [user, setUser] = useState<User>();
    const refAPI = useRef<BaseApi | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
            const api = new BaseApi(token);
            refAPI.current = api;

            api.users.getOne(Number(userId))
                .then(userData => setUser(userData))
                .catch(error => console.error('Error al cargar usuario', error));
        }
    }, []);

    const handleCardClick = () => {
        router.push(`/book/${book.id}`);
    };

    const handleBuyClick = async (e: React.MouseEvent) => {
        e.stopPropagation();

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
            router.push('/login');
            return;
        }

        if (!book || !user || !refAPI.current) {
            alert('Libro, usuario o API no disponible ❌');
            return;
        }

        const detailedBook = await refAPI.current.books.getOne(book.id);
        if (detailedBook.stock <= 0) {
            Swal.fire({
                title: "Sin stock",
                text: "Este libro físico no tiene stock disponible.",
                icon: "warning",
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        try {
            const payload = {
                idUser: user.id,
                idBook: book.id,
                amount: 1,
                virtual: false
            };
            await refAPI.current.shoppingCart.create(payload);
            Swal.fire({
                title: "Libro agregado al carrito!",
                text: `${book.title} ha sido agregado a tu carrito.`,
                icon: "success",
                timer: 2500,
                showConfirmButton: false
            });
        } catch (error) {
            console.error('Error agregando al carrito:', error);
            Swal.fire({
                title: "No se pudo agregar al carrito!",
                text: `Error al agregar ${book.title} al carrito.`,
                icon: "error",
                timer: 2500,
                showConfirmButton: false
            });
        }
    };


    const isSubscriber = user?.userSubscriptions?.some(sub => sub.ongoing);
    const showExclusiveOverlay = book.subscriber_exclusive && !isSubscriber;

    return (
        <div
            className={`${styles.card} ${book.subscriber_exclusive ? styles.exclusiveCard : ''} ${showExclusiveOverlay ? styles.disabledCard : ''}`}
            onClick={handleCardClick}
            title={showExclusiveOverlay ? "Solo disponible para suscriptores" : undefined}
        >
            {showExclusiveOverlay && (
                <span className={styles.exclusiveLabel}>EXCLUSIVO SUSCRIPTORES</span>
            )}
            <Image
                src={
                    typeof book.image === 'string' && book.image.trim() !== ''
                        ? book.image
                        : '/libros/placeholder.png'
                }
                alt={book.title}
                className={styles.cover}
                width={220}
                height={200}
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
            <button
                className={styles.buyButton}
                onClick={handleBuyClick}
                disabled={showExclusiveOverlay}
            >
                <FaCartPlus className={styles.cartIcon} aria-hidden="true" />
                <span className={styles.buyText}>COMPRAR</span>
            </button>
        </div>
    );
}
