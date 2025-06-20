'use client';

import Swal from "sweetalert2";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AddBookDialog from "@/components/pages/agregarLibro"
import DragAndDrop from "@/components/pages/dropImage";
import Image from "next/image";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import styles from '../../styles/panelAdmin.module.css';

import { BaseApi } from "@/API/baseApi";
import { BookFileUpdate } from '@/API/types/bookFile';
import { Author } from '@/API/types/author';
import { Genre } from "@/API/types/genre";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";

export default function BooksPanel(): React.JSX.Element {
  const [books, setBooks] = useState<BookFileUpdate[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [bookOpenIds, setBookOpenIds] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const apiRef = useRef(new BaseApi());

  const [booksEditState, setBooksEditState] = useState<{

    [key: number]: {
      editMode: boolean;
      formData: BookFileUpdate;
    }
  }>({});

  const [form, setForm] = useState({
    title: '',
    description: '',
    anio: '',
    isbn: '',
    image: null as File | null,
    stock: '',
    subscriber_exclusive: 'false',
    price: '',
    authorId: '',
    genres: '',
  });

  // const startEdit = (book: BookFileUpdate) => {
  //   console.log('HOLAAAAAAAAAAAAAAAAAAAAAAAAAAA: ', book.genre);
  //   const genreIds = genres
  //     .filter((g) => (book.genre as Genre[]).includes(g.id))
  //     .map((g) => g.id);

  //   setBooksEditState(prev => ({
  //     ...prev,
  //     [book.id]: {
  //       editMode: true,
  //       formData: { ...book, genre: genreIds}
  //     }
  //   }));
  // };

  const startEdit = (book: BookFileUpdate) => {
        setBooksEditState(prev => ({
      ...prev,
      [book.id]: {
        editMode: true,
        formData: { ...book}
      }
    }));
  }

  const handleBookChange = (
    bookId: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setBooksEditState(prev => {
      const bookState = prev[bookId];
      if (!bookState) return prev;
      return {
        ...prev,
        [bookId]: {
          ...bookState,
          formData: {
            ...bookState.formData,
            [name]: type === "checkbox" ? checked : (type === "number" ? Number(value) : value),
          }
        }
      };
    });
  };

  const saveChanges = async (bookId: number) => {
    const bookState = booksEditState[bookId];
    if (!bookState) return;

    const genreIds = (bookState.formData.genre as Genre[]).map(g => g.id);

    try {
      const updatedBook = await apiRef.current.books.updateBookFile(bookId, bookState.formData, genreIds);
      setBooks(prevBooks => prevBooks.map(b => b.id === bookId ? updatedBook : b));
      setBooksEditState(prev => ({
        ...prev,
        [bookId]: { ...prev[bookId], editMode: false }
      }));
      Swal.fire("Éxito", "Libro actualizado correctamente", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo guardar el libro", "error");
    }
  };

  const cancelEdit = (bookId: number) => {
    setBooksEditState(prev => ({
      ...prev,
      [bookId]: { ...prev[bookId], editMode: false }
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorsData = await apiRef.current.authors.getAll();
        setAuthors(authorsData);

        const genresData = await apiRef.current.genre.getAll();
        setGenres(genresData);

        const booksData = await apiRef.current.books.getAll();
        setBooks(booksData);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, []);

  const toggleBookOpen = (id: number) => {
    setBookOpenIds((prev) =>
      prev.includes(id) ? prev.filter(bid => bid !== id) : [...prev, id]
    );
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleImage = (field: string, value: File) => {
    setForm({ ...form, [field]: value });
  };

  

  return (
    <>
      <Input
        placeholder="Buscar libro"
        className={styles.inputSearch}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={styles.agregarLibro}>
        <AddBookDialog />
      </div>

      {filteredBooks.map((book) => {
        const editState = booksEditState[book.id] || {
          editMode: false,
          formData: { ...book, genre: genres.filter(g => book.genre.includes(g)) }
        };

        return (
          <div key={book.id} className={styles.bookCard}>
            <div className={styles.bookHeader} onClick={() => toggleBookOpen(book.id)}>
              <span className={styles.bookName}>{book.title}</span>
              {bookOpenIds.includes(book.id) ? <ChevronUp /> : <ChevronDown />}
            </div>

            {bookOpenIds.includes(book.id) && (
              <div className={styles.bookDetails}>
                {editState.editMode ? (
                  <>
                    <label>Título:
                      <Input name="title" value={editState.formData.title} onChange={(e) => handleBookChange(book.id, e)} />
                    </label>
                    <label>Descripción:
                      <textarea name="description" value={editState.formData.description} onChange={(e) => handleBookChange(book.id, e)} rows={3} />
                    </label>
                    <label>Año:
                      <Input type="number" name="anio" value={editState.formData.anio} onChange={(e) => handleBookChange(book.id, e)} />
                    </label>
                    <label>ISBN:
                      <Input name="isbn" value={editState.formData.isbn} onChange={(e) => handleBookChange(book.id, e)} />
                    </label>
                    <label>Stock:
                      <Input type="number" name="stock" value={editState.formData.stock} onChange={(e) => handleBookChange(book.id, e)} />
                    </label>
                    <label>Exclusivo suscriptores:
                      <select name="subscriber_exclusive" value={editState.formData.subscriber_exclusive ? "true" : "false"} onChange={(e) => {
                        const value = e.target.value === "true";
                        setBooksEditState(prev => ({
                          ...prev,
                          [book.id]: {
                            ...prev[book.id],
                            formData: { ...prev[book.id].formData, subscriber_exclusive: value }
                          }
                        }));
                      }}>
                        <option value="true">Sí</option>
                        <option value="false">No</option>
                      </select>
                    </label>
                    <label>Precio:
                      <Input type="number" name="price" value={editState.formData.price} onChange={(e) => handleBookChange(book.id, e)} />
                    </label>

                    <Label>Autor</Label>
                    <Select
                      onValueChange={value => {
                        setBooksEditState(prev => ({
                          ...prev,
                          [book.id]: {
                            ...prev[book.id],
                            formData: {
                              ...prev[book.id].formData,
                              author_id: Number(value)
                            }
                          }
                        }));
                      }}
                      value={String(editState.formData.author_id)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar autor" />
                      </SelectTrigger>
                      <SelectContent>
                        {authors.map(author => (
                          <SelectItem key={author.id} value={String(author.id)}>
                            {author.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>


                    <Label>Categorías</Label>
                    <div className="flex flex-col space-y-1 max-h-40 overflow-y-auto border rounded p-2">
                      {genres.map((genre) => {
                          console.log("Rendering checkbox for genre.id:", genre.id);
                          console.log("Current selected genres:", editState.formData.genre);
                          console.log("Is checked:", editState.formData.genre.includes(genre));

                          return (
                            <label key={genre.id} style={{ display: 'block', marginBottom: '4px' }}>
                              <input
                                type="checkbox"
                                value={genre.id}
                                checked={editState.formData.genre.some((g: Genre) => g.id === genre.id)}
                                onChange={(e) => {
                                  const checked = e.target.checked;

                                  setBooksEditState((prev) => {
                                    const bookState = prev[book.id];
                                    if (!bookState) return prev;

                                    const currentGenres = bookState.formData.genre as Genre[];
                                    const newGenres = checked
                                      ? [...currentGenres, genre]
                                      : currentGenres.filter((g) => g.id !== genre.id);

                                    return {
                                      ...prev,
                                      [book.id]: {
                                        ...bookState,
                                        formData: {
                                          ...bookState.formData,
                                          genre: newGenres,
                                        },
                                      },
                                    };
                                  });
                                }}
                              />
                              {genre.name}
                            </label>
                          );
                        })}
                    </div>

                    <label>Imagen:</label>
                    <Image
                      src={typeof editState.formData.image === "string" ? editState.formData.image : '/placeholder.png'}
                      alt="Imagen del libro"
                      width={100}
                      height={150}
                    />
                    <DragAndDrop onFileDrop={file => {
                      handleImage('image', file);
                    }} />

                    <div className={styles.editButtons}>
                      <Button className={styles.botonEditar} onClick={() => saveChanges(book.id)}>Guardar</Button>
                      <Button className={styles.botonEditar} onClick={() => cancelEdit(book.id)}>Cancelar</Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p><strong>Autor:</strong> {book.author}</p>
                    <p><strong>Precio:</strong> ${book.price}</p>
                    <p><strong>Año:</strong> {book.anio}</p>
                    <p><strong>Descripción:</strong> {book.description}</p>
                    <p><strong>Exclusivo suscriptores:</strong> {book.subscriber_exclusive ? 'Sí' : 'No'}</p>
                    <Button onClick={() => startEdit(book)}>Editar✏️ </Button>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}