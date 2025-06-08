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

type Genre = {
    id: number;
    name: string;
};

type BookGenre = {
    id: number;
    idBook: number;
    idGenre: number;
};

export default function BookPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [authors, setAuthors] = useState<Author[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [bookGenres, setBookGenres] = useState<BookGenre[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<number[]>([]);
    const [showMoreGenres, setShowMoreGenres] = useState(false);
    const [showMoreAuthors, setShowMoreAuthors] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resBooks = await fetch('http://localhost:3001/books', {
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

                const resGenres = await fetch('http://localhost:3001/genres', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const resBookGenres = await fetch('http://localhost:3001/book_genres', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!resBooks.ok) {
                    throw new Error(`HTTP error! status: ${resBooks.status}`);
                }
                if (!resAuthors.ok) {
                    throw new Error(`HTTP error! status: ${resAuthors.status}`);
                }
                if (!resGenres.ok) {
                    throw new Error(`HTTP error! status: ${resGenres.status}`);
                }
                if (!resBookGenres.ok) {
                    throw new Error(`HTTP error! status: ${resBookGenres.status}`);
                }

                const dataBooks = await resBooks.json();
                const dataAuthors = await resAuthors.json();
                const dataGenres = await resGenres.json();
                const dataBookGenres = await resBookGenres.json();

                if (!Array.isArray(dataBooks)) {
                    throw new Error('La respuesta de la API de libros no es un arreglo');
                }
                if (!Array.isArray(dataAuthors)) {
                    throw new Error('La respuesta de la API de autores no es un arreglo');
                }
                if (!Array.isArray(dataGenres)) {
                    throw new Error('La respuesta de la API de géneros no es un arreglo');
                }
                if (!Array.isArray(dataBookGenres)) {
                    throw new Error('La respuesta de la API de book_genres no es un arreglo');
                }

                console.log('Libros recibidos:', dataBooks);
                console.log('Géneros recibidos:', dataGenres);
                console.log('Asociaciones libro-género recibidas:', dataBookGenres);
                console.log('Autores recibidos:', dataAuthors);

                setBooks(dataBooks.sort((a, b) => a.id - b.id));
                setAuthors(dataAuthors);
                setGenres(dataGenres);
                setBookGenres(dataBookGenres);

            } catch (error) {
                console.error('Error al obtener datos:', error);
                setBooks([]);
                setAuthors([]);
                setGenres([]);
                setBookGenres([]);
            }
        };
        fetchData();
    }, []);

    const handleGenreToggle = (genreId: number) => {
        setSelectedGenres((prev) =>
            prev.includes(genreId)
                ? prev.filter((id) => id !== genreId)
                : [...prev, genreId]
        );
    };

    const handleAuthorToggle = (authorId: number) => {
        setSelectedAuthors((prev) =>
            prev.includes(authorId)
                ? prev.filter((id) => id !== authorId)
                : [...prev, authorId]
        );
    };

    const filteredBooks = Array.isArray(books)
        ? books.filter((book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedGenres.length === 0 ||
                bookGenres.some((bg) => bg.idBook === book.id && selectedGenres.includes(bg.idGenre))) &&
            (selectedAuthors.length === 0 || selectedAuthors.includes(book.author_id))
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
                    <div className={styles.genreFilter}>
                        <h4>Géneros</h4>
                        {genres.length > 0 ? (
                            <>
                                <ul className={showMoreGenres ? styles.expanded : ''}>
                                    {genres.map((genre) => (
                                        <li key={genre.id}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedGenres.includes(genre.id)}
                                                    onChange={() => handleGenreToggle(genre.id)}
                                                />
                                                {genre.name}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                                {genres.length > 4 && (
                                    <button
                                        className={styles.showMoreBtn}
                                        onClick={() => setShowMoreGenres(!showMoreGenres)}
                                    >
                                        {showMoreGenres ? 'Mostrar menos' : 'Mostrar más'}
                                    </button>
                                )}
                            </>
                        ) : (
                            <p>No hay géneros disponibles.</p>
                        )}
                    </div>
                    <hr />
                    <div className={styles.authorFilter}>
                        <h4>Autor</h4>
                        {authors.length > 0 ? (
                            <>
                                <ul className={showMoreAuthors ? styles.expanded : ''}>
                                    {authors.map((author) => (
                                        <li key={author.id}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedAuthors.includes(author.id)}
                                                    onChange={() => handleAuthorToggle(author.id)}
                                                />
                                                {author.name}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                                {authors.length > 4 && (
                                    <button
                                        className={styles.showMoreBtn}
                                        onClick={() => setShowMoreAuthors(!showMoreAuthors)}
                                    >
                                        {showMoreAuthors ? 'Mostrar menos' : 'Mostrar más'}
                                    </button>
                                )}
                            </>
                        ) : (
                            <p>No hay autores disponibles.</p>
                        )}
                    </div>
                </aside>

                <div className={styles.mainGrid}>
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                            <BookCard
                                key={book.id}
                                book={{
                                    id: book.id,
                                    title: book.title,
                                    image: book.image,
                                    price: book.price,
                                    author: authors.find((a) => a.id === book.author_id)?.name
                                }}
                                />
                            ))
                        ) : (
                            <p>No se encontraron libros.</p>
                        )}
                </div>
            </div>
           
        </>
                        
    );
}