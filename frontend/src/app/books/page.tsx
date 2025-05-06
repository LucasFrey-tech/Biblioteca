"use client";

import { useEffect, useState } from 'react';
import { fetchBooks } from '../../lib/api';
import BookCard from '../../components/Bookcard';
import styles from '../../styles/books.module.css';
import BooksJson from '../../../assets/json/booksPreload.json';

type Book = {
    id_book: number;
    title: string;
    author: string;
    price: number;
};

export default function BookPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      async function loadBooks() {
        try {
          const data = await fetchBooks();
          setBooks(data);
        } catch (error) {
          setError('Error al cargar los libros');
        } finally {
          setLoading(false);
        }
      }
      loadBooks();
    }, []);
  
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return(
        <div className="container">
            <h1>Catalogo de Libros</h1>
            <div className={styles.grid}>
                {books.map((book) => (
                <BookCard key={book.id_book} book={book} />
                ))}
            </div>
        </div>
    );
}


// {BooksJson.books.map((book:Book) => (
//     <BookCard key={book.id_book} book={book} />
//     ))}