"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';  // Importa useParams
import styles from '../../../styles/BookDetail.module.css';

type Book = {
  id_book: number;
  title: string;
  author: string;
  genre: string[];
  description: string;
  price: number;
  stock: number;
  exclusive: boolean;
  isbn: string;
  created_at: string;
  updated_at: string;
};

export default function BookDetail() {
  const router = useRouter();
  const params = useParams();  // Usa useParams para obtener params
  const id = params?.id as string;  // Asegura que es string
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchBook() {
      try {
        const response = await fetch('http://localhost:3001/books');
        if (!response.ok) throw new Error('Error al cargar el libro');
        const books: Book[] = await response.json();
        const selectedBook = books.find((b) => b.id_book === parseInt(id));
        if (selectedBook) {
          setBook(selectedBook);
        } else {
          setError('Libro no encontrado');
        }
      } catch (err) {
        setError('Error al cargar el libro');
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!book) return <div>Libro no encontrado</div>;

  const stockStatus = book.stock > 0 ? 'Disponible' : 'Sin Stock';
  const imagePath = `/books_covers/book_${book.id_book}.png`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{book.title}</h1>
        <button className={styles.backButton} onClick={() => router.back()}>
          Volver
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img
            src={imagePath}
            alt={book.title}
            className={styles.cover}
            onError={(e) => (e.currentTarget.src = '/books_covers/default_cover.png')}
          />
        </div>
        <div className={styles.details}>
          <p className={styles.author}>Por {book.author}</p>
          <p className={styles.stock}>Stock: {stockStatus}</p>
          <p className={styles.price}>Precio: {book.price}</p>
          <div className={styles.genre}>
            Categorización:
            <ul>
              {book.genre.map((g, index) => (
                <li key={index}>{g}</li>
              ))}
            </ul>
          </div>
          <button className={styles.buyButton}>Comprar Ahora</button>
          <button className={styles.cartButton}>Agregar al Carrito</button>
        </div>
      </div>
      <div className={styles.description}>
        <h2>Descripción</h2>
        <p>{book.description}</p>
      </div>
      <div className={styles.reviews}>
        <h2>Reviews</h2>
        <ul>
          <li>Usuario: Una reseña muy interesante sobre el libro.</li>
          <li>Usuario: Muy buena lectura, lo recomiendo.</li>
          <li>Usuario: Interesante pero un poco lento al inicio.</li>
        </ul>
      </div>
    </div>
  );
}