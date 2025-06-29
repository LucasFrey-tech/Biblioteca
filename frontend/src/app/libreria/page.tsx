'use client';
import { useEffect, useState, FormEvent, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

import { BaseApi } from '@/API/baseApi';
import { BookLibreria } from '@/API/types/libreria';
import { Author } from '@/API/types/author';
import { Genre } from '@/API/types/genre';

import LibraryCard from '@/components/pages/LibraryCard';
import styles from '../../styles/catalogo.module.css';

export default function Libreria() {
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
  const [userId, setUserId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const limit = 6;

  const apiRef = useRef<BaseApi | null>(null);

  // userId desde localStorage
  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) {
      setUserId(Number(id));
    } else {
      console.error('ID del usuario no proporcionado o inválido.');
      setLoading(false);
    }
  }, []);

  // Cargar datos de la API
  useEffect(() => {
    if (userId === null) return;

    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token no encontrado.');
        setLoading(false);
        return;
      }

      try {
        apiRef.current = new BaseApi(token);

        const resBooks = await apiRef.current?.libreria.getAllPaginated(userId, currentPage, limit);
        const resAuthors = await apiRef.current?.authors.getAll();
        const resGenres = await apiRef.current?.genre.getAll();

        // Validar respuesta de libros
        if (resBooks && Array.isArray(resBooks.items)) {
          const sortedBooks = resBooks.items
            .map((book) => ({
              ...book,
              genre: Array.isArray(book.genre) ? book.genre : [],
            }))
            .sort((a, b) => a.id - b.id);
          setBooks(sortedBooks);
          setTotalBooks(resBooks.total);
        } else {
          console.warn('resBooks no es un arreglo válido:', resBooks);
          setBooks([]);
          setTotalBooks(0);
        }

        setAuthors(Array.isArray(resAuthors) ? resAuthors : []);
        setGenres(Array.isArray(resGenres) ? resGenres : []);

      } catch (error) {
        console.error('Error al obtener datos:', error);
        setBooks([]);
        setAuthors([]);
        setGenres([]);
        setTotalBooks(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, currentPage]);

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
    setCurrentPage(1);
  };

  const handleAuthorToggle = (authorId: number) => {
    setSelectedAuthors((prev) =>
      prev.includes(authorId)
        ? prev.filter((id) => id !== authorId)
        : [...prev, authorId]
    );
    setCurrentPage(1);
  };

  const filteredBooks = books.filter((book) => {
    const lowerTitle = book.title.toLowerCase();
    const matchesSearch = lowerTitle.includes(searchQuery.toLowerCase());
    const matchesGenres =
      selectedGenres.length === 0 ||
      book.genre.some((g) => selectedGenres.includes(g.id));
    const matchesAuthors =
      selectedAuthors.length === 0 || selectedAuthors.includes(book.author_id);
    return matchesSearch && matchesGenres && matchesAuthors;
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalBooks / limit);

  if (loading) return <p>Cargando librería...</p>;

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
          <button type="submit" className={styles.searchSubmitBtn} aria-label="Buscar">
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
                  author: authors.find((a) => a.id === book.author_id)?.name ?? 'Desconocido',
                }}
              />
            ))
          ) : (
            <p>No se encontraron libros.</p>
          )}
        </div>
      </div>
      {filteredBooks.length > 0 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            Anterior
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  );
}