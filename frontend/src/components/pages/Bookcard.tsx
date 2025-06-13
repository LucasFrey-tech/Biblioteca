'use client';

import { FaCartPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import styles from '../../styles/BookCard.module.css';
import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';
import { BaseApi } from '@/API/baseApi';
import { User } from '@/API/types/user';

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

    const handleBuyClick = async () => {
        if (!book || !user || !refAPI.current) {
            alert('Libro, usuario o API no disponible ❌');
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
            alert('Libro agregado al carrito ✅');
        } catch (error: any) {
            console.error('Error agregando al carrito:', error.message);
            alert(`Error al agregar al carrito: ${error.message} ❌`);
        }
    };


    return (
        <div className={styles.card} onClick={handleCardClick}>
            <Image
                src={book.image}
                alt={book.title}
                className={styles.cover}
                width={200}
                height={150}
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