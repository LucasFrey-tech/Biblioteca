'use client';

import { FormEvent, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import BookCard from '../../componentes/Bookcard';
import styles from '../../styles/catalogo.module.css';
import BooksJson from '../../../assets/json/books_preload.json';
import AuthorsJson from '../../../assets/json/authors_preload.json';

type Book = {
    id_book: number;
    title: string;
    author: number;
    price: number;
};

type Author = {
    id: number;
    name: string;
};

type BookWithAuthorName = Book & { author_name: string };

export default function BookPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const booksWithAuthors: BookWithAuthorName[] = BooksJson.books.map((book) => {
        const author = AuthorsJson.authors.find((a) => a.id === book.author);
        return {
            ...book,
            author_name: author ? author.name : 'Desconocido',
        };
    });

    const filteredBooks = booksWithAuthors.filter((book) =>
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
                {/* FILTROS */}
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