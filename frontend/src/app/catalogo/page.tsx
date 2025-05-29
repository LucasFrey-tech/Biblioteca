'use client';

import { useEffect, useState, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';

import { Book } from '../../../../backend/src/entidades/book.entity';


import BookCard from '../../components/pages/Bookcard';
import styles from '../../styles/catalogo.module.css';

type Author = {
    id: number;
    name: string;
};

export default function BookPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [authors, setAuthors] = useState<Author[]>([]);


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch('http://localhost:3001/books', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const resAuthors = await fetch('http://localhost:3001/authors', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                const dataAuthors = await resAuthors.json();

                if (!Array.isArray(data)) {
                    throw new Error('La respuesta de la API no es un arreglo');
                }

                console.log('Libros recibidos:', data);

                setBooks(data);
                setAuthors(dataAuthors);

            } catch (error) {
                console.error('Error al obtener libros:', error);
                setBooks([]);
            }
        };
        fetchBooks();
    }, []);

    const filteredBooks = Array.isArray(books)
        ? books.filter((book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Búsqueda enviada:', searchTerm);
        setSearchQuery(searchTerm);
    };

    return (
        <>
            <form className={styles.searchForm} onSubmit={handleSubmit}>
                <div className={styles.searchBarContainer}>
                    <input
                        type="search"
                        name="q"
                        placeholder="¿Qué estás buscando?"
                        aria-label="¿Qué estás buscando?"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchBar}
                    />
                    <button
                        type="submit"
                        className={styles.searchSubmitBtn}
                        aria-label="Buscar"
                    >
                        <FaSearch className={styles.searchIcon} aria-hidden="true" />
                    </button>
                </div>
            </form>

            <div className={styles.wrapper}>
                <aside className={styles.sidebar}>
                    <h3>Filtros</h3>
                    <p>Próximamente...</p>
                </aside>

                <div className={styles.mainGrid}>
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                            <BookCard key={book.id} book={{id: book.id, title: book.title, price: book.price, author: authors.find((a) => a.id == book.author_id)?.name}} />
                        ))
                    ) : (
                        <p>No se encontraron libros.</p>
                    )}
                </div>
            </div>
        </>
    );
}