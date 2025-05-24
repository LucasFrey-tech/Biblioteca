'use client';

import { useEffect, useState, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import BookCard from '../../components/pages/Bookcard';
import styles from '../../styles/catalogo.module.css';

type Author = {
    id: number;
    name: string;
};

type Book = {
    id_book: number;
    title: string;
    price: number;
    author: Author;
};

export default function BookPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const res = await fetch('/api/books');
            const data = await res.json();
            setBooks(data);
        };
        fetchBooks();
    }, []);

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
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
                    {filteredBooks.map((book) => (
                        <BookCard key={book.id_book} book={book} />
                    ))}
                </div>
            </div>
        </>
    );
}

//BASE
// {books.map((book) => (
// <BookCard key={book.id_book} book={book} />
// ))}

//JSON
// {BooksJson.books.map((book:Book) => (
//     <BookCard key={book.id_book} book={book} />
//     ))}