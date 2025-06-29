'use client';

import { useEffect, useState, FormEvent, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { BaseApi } from '@/API/baseApi';
import { BookCatalogo } from '@/API/types/bookCatalogo';
import { Author } from '@/API/types/author';
import { Genre } from '@/API/types/genre';
import { PaginatedResponse } from '@/API/service';
import BookCard from '../../components/pages/Bookcard';
import styles from '../../styles/catalogo.module.css';

export default function BookPage() {
    const [books, setBooks] = useState<BookCatalogo[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<number[]>([]);
    const [showMoreGenres, setShowMoreGenres] = useState(false);
    const [showMoreAuthors, setShowMoreAuthors] = useState(false);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalBooks, setTotalBooks] = useState(0);

    const apiRef = useRef<BaseApi | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            apiRef.current = new BaseApi();

            const token = localStorage.getItem('token');
            if (token) {
                apiRef.current = new BaseApi(token);
            }

            try {
                // Cargar géneros y autores (paginados, pero solo tomamos la primera página)
                const resGenres = await apiRef.current?.genre.getAllPaginated(1, 100);
                const resAuthors = await apiRef.current?.authors.getAllPaginated(1, 100);

                // Mapear 'genres' y 'authors' a 'items'
                setGenres(resGenres ? (resGenres as any).genres || resGenres.items || [] : []);
                setAuthors(resAuthors ? (resAuthors as any).authors || resAuthors.items || [] : []);

                // Cargar libros con filtros
                await fetchBooks();
            } catch (error) {
                console.error('Error al obtener datos:', error);
                setBooks([]);
                setGenres([]);
                setAuthors([]);
            }
        };

        fetchData();
    }, []);

    const fetchBooks = async () => {
        try {
            let resBooks: PaginatedResponse<BookCatalogo> | undefined;

            if (selectedGenres.length > 0) {
                resBooks = await apiRef.current?.books.getBooksWithGenrePaginated(selectedGenres[0], page, limit);
            } else if (selectedAuthors.length > 0) {
                resBooks = await apiRef.current?.books.getBooksByAuthorPaginated(selectedAuthors[0], page, limit);
            } else {
                resBooks = await apiRef.current?.catalogo.getAllPaginated(page, limit);
            }

            if (!resBooks || !Array.isArray(resBooks.items)) {
                console.error('Respuesta inválida de la API:', resBooks);
                setBooks([]);
                setTotalBooks(0);
                return;
            }

            setBooks(resBooks.items.sort((a, b) => a.id - b.id));
            setTotalBooks(resBooks.total);
        } catch (error) {
            console.error('Error al obtener libros:', error, { selectedGenres, selectedAuthors, page, limit });
            setBooks([]);
            setTotalBooks(0);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [page, selectedGenres, selectedAuthors]);

    const handleGenreToggle = (genreId: number) => {
        setSelectedGenres((prev) =>
            prev.includes(genreId)
                ? prev.filter((id) => id !== genreId)
                : [genreId] // Solo permitimos un género a la vez para simplificar
        );
        setPage(1); // Reiniciar a la primera página al cambiar filtros
    };

    const handleAuthorToggle = (authorId: number) => {
        setSelectedAuthors((prev) =>
            prev.includes(authorId)
                ? prev.filter((id) => id !== authorId)
                : [authorId] // Solo permitimos un autor a la vez para simplificar
        );
        setPage(1); // Reiniciar a la primera página al cambiar filtros
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSearchQuery(searchTerm);
        setPage(1); // Reiniciar a la primera página al buscar
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= Math.ceil(totalBooks / limit)) {
            setPage(newPage);
        }
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

                <section className={styles.contentArea}>
                    <div className={styles.mainGrid}>
                        {books.length > 0 ? (
                            books.map((book) => (
                                <div
                                    key={book.id}
                                    className={book.subscriber_exclusive ? styles.exclusiveWrapper : undefined}
                                >
                                    <BookCard
                                        book={{
                                            id: book.id,
                                            title: book.title,
                                            image: book.image,
                                            price: book.price,
                                            author: {
                                                id: book.author_id ?? -1,
                                                name: book.author,
                                            },
                                            subscriber_exclusive: book.subscriber_exclusive,
                                        }}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No se encontraron libros.</p>
                        )}
                    </div>

                    {books.length > 0 && (
                        <div className={styles.pagination}>
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                                className={styles.pageButton}
                            >
                                Anterior
                            </button>
                            <span>
                                Página {page} de {Math.ceil(totalBooks / limit)}
                            </span>
                            <button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page >= Math.ceil(totalBooks / limit)}
                                className={styles.pageButton}
                            >
                                Siguiente
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}