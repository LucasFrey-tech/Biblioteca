'use client';

import { useEffect, useState, FormEvent, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

import { BaseApi } from '@/API/baseApi';
import { BookLibreria } from '@/API/types/libreria';
import { Author } from '@/API/types/author';
import { Genre } from '@/API/types/genre';

import LibraryCard from '@/components/pages/LibraryCard';
import styles from '../../styles/catalogo.module.css';


export default function Libreira() {
    const [books, setBooks] = useState<BookLibreria[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<number[]>([]);
    const [showMoreGenres, setShowMoreGenres] = useState(false);
    const [showMoreAuthors, setShowMoreAuthors] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(2);

    useEffect(() => {
        const id = localStorage.getItem('userId');
        if (id) {
            setUserId(Number(id));
        } else {
            setError('ID del usuario no proporcionado o inválido.');
            setLoading(false)
        }
    }, []);
    
    const apiRef = useRef<BaseApi | null>(null);


    useEffect(() => {

        if (userId === null) return;

        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                apiRef.current = new BaseApi(token);
            }

            try {
                const resBooks = await apiRef.current?.libreria.findAllByUser(userId);
                const resAuthors = await apiRef.current?.authors.getAll();
                const resGenres = await apiRef.current?.genre.getAll();

                if (!resBooks) {
                    throw new Error(`HTTP error! status: ${resBooks}`);
                }
                console.log("AHHHHHHHHH1 ", userId);

                setBooks(resBooks.sort((a, b) => a.id - b.id));

                console.log("AHHHHHHHHH ", resBooks);

                setAuthors(resAuthors || []);
                setGenres(resGenres || []);

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

    const filteredBooks = books.filter((book) => {
        const lowerTitle = book.title.toLowerCase();
        const matchesSearch = lowerTitle.includes(searchQuery.toLowerCase());

        const matchesGenres = selectedGenres.length === 0 || book.genre.some((genreName) => {
            const genre = genres.find((g) => g.name === genreName);
            return genre && selectedGenres.includes(genre.id)
        })

        const matchesAuthors = selectedAuthors.length === 0 || selectedAuthors.includes(book.author_id);

        return matchesSearch && matchesGenres && matchesAuthors;
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSearchQuery(searchTerm);
    };

    if (loading) return <p>Cargando libreria...</p>;

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
                            <LibraryCard
                                key={book.id}
                                book={{
                                    id: book.id,
                                    title: book.title,
                                    image: book.image,
                                    author: authors.find(a => a.id === book.author_id)?.name
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