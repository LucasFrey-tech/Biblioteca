'use client';

import { useEffect, useState, FormEvent, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

import { BaseApi } from '@/API/baseApi';
import { BookCatalogo } from '@/API/types/bookCatalogo';

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


export default function BookPage() {
    const [books, setBooks] = useState<BookCatalogo[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [authors, setAuthors] = useState<Author[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<number[]>([]);
    const [showMoreGenres, setShowMoreGenres] = useState(false);
    const [showMoreAuthors, setShowMoreAuthors] = useState(false);

    const apiRef = useRef<BaseApi | null>(null);

    useEffect(() => {

        const fetchData = async () => {

            const token = localStorage.getItem('token');
            if (token) {
                apiRef.current = new BaseApi(token);
            }

            try {

                const resBooks = await apiRef.current?.catalogo.getAll();

                if (!resBooks) {
                    throw new Error(`HTTP error! status: ${resBooks}`);
                }



                const dataBooks = resBooks.sort((a, b) => a.id - b.id);
                setBooks(dataBooks);

                const uniqueAuthors = Array.from(
                    new Map(
                        dataBooks.map(book => [book.author_id, { id: book.author_id, name: book.author }])
                    ).values()
                );

                setAuthors(uniqueAuthors);

                const uniqueGenres = Array.from(
                    new Set(dataBooks.flatMap(book => book.genre))
                ).map((genreName, index) => ({ id: index + 1, name: genreName }));
                setGenres(uniqueGenres)

            } catch (error) {
                console.error('Error al obtener datos:', error);
                setBooks([]);
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

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedGenres.length === 0 ||
            book.genre.some((g) => selectedGenres.includes(
                genres.find((gen) => gen.name === g)?.id || -1
            ))
        ) &&
        (selectedAuthors.length === 0 || selectedAuthors.includes(book.author_id))
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
                                    author: book.author
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