'use client';

import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AddBookDialog from "@/components/pages/agregarLibro";
import DragAndDrop from "@/components/pages/dropImage";
import DragAndDropFile from "@/components/pages/dropFile";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import styles from '../../styles/panelAdmin.module.css';
import { BaseApi } from "@/API/baseApi";
import { BookFileUpdate, PaginatedBooksResponse } from '@/API/types/bookFile';
import { Author } from '@/API/types/author';
import { Genre } from "@/API/types/genre";
import { bookSchema, BookType } from '@/validations/bookSchema';

export default function BooksPanel(): React.JSX.Element {
  const [books, setBooks] = useState<BookFileUpdate[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [bookOpenIds, setBookOpenIds] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const [editBookId, setEditBookId] = useState<number | null>(null);

  const apiRef = useRef(new BaseApi());
  const dataFetchedRef = useRef(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const [totalBooks, setTotalBooks] = useState(0);


  const form = useForm<BookType>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      description: '',
      anio: 0,
      isbn: '',
      stock: 0,
      price: 0,
      author_id: 0,
      genre: [],
      subscriber_exclusive: false,
      image: undefined,
      content: undefined,
    },
  });

  const fetchBooks = async () => {
    try {
      const booksData: PaginatedBooksResponse = await apiRef.current.books.getAllPaginated(currentPage, limit);
      if (!booksData || !Array.isArray(booksData.items) || typeof booksData.total !== 'number') {
        console.error('Respuesta inválida de la API:', booksData);
        throw new Error('Respuesta de la API no tiene el formato esperado: { items: BookFileUpdate[], total: number }');
      }

      const items = await Promise.all(booksData.items.map(async (bookData: BookFileUpdate) => {
        let content: File | string = '';
        try {
          const contentData = await apiRef.current.bookContent.getOne(bookData.id);
          content = typeof contentData.content === 'string' ? contentData.content : '';
        } catch (error) {
          console.warn(`No se pudo obtener contenido para el libro ID ${bookData.id}:`, error);
        }
        return {
          ...bookData,
          genre: bookData.genre || [],
          content,
        } as BookFileUpdate;
      }));

      setBooks(items.sort((a: BookFileUpdate, b: BookFileUpdate) => b.id - a.id));
      setTotalBooks(booksData.total);
    } catch (error) {
      console.error("Error al obtener libros:", error, { currentPage, limit });
      setBooks([]);
      setTotalBooks(0);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los libros. Por favor, intenta de nuevo.',
      });
    }
  };

  useEffect(() => {
  const fetchAll = async () => {
    try {
      if (!dataFetchedRef.current) {
        const authorsData = await apiRef.current.authors.getAll();
        setAuthors(authorsData);

        const genresData = await apiRef.current.genre.getAll();
        setGenres(genresData);

        dataFetchedRef.current = true;
      }

      await fetchBooks();
    } catch (error) {
      console.error("Error al obtener datos:", error);
      setBooks([]);
      setAuthors([]);
      setGenres([]);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los datos iniciales.',
      });
    }
  };

  fetchAll();
}, [currentPage]);


  const startEdit = (book: BookFileUpdate) => {
    setEditBookId(book.id);
    form.reset({
      title: book.title,
      description: book.description,
      anio: book.anio,
      isbn: book.isbn,
      stock: book.stock,
      price: book.price,
      author_id: book.author_id || authors.find(a => a.name === book.author)?.id || 0,
      genre: book.genre.map((g: Genre) => g.id),
      subscriber_exclusive: book.subscriber_exclusive,
      image: undefined,
      content: undefined,
    });
  };

  const cancelEdit = () => {
    setEditBookId(null);
    form.reset();
  };

  const onSubmit = form.handleSubmit(async (values: BookType) => {
    if (!editBookId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se ha especificado un libro para editar',
      });
      return;
    }

    try {
      const updatedBook = await apiRef.current.books.updateBookFile(
        editBookId,
        {
          title: values.title,
          description: values.description,
          anio: values.anio,
          isbn: values.isbn,
          stock: values.stock,
          price: values.price,
          author_id: values.author_id,
          subscriber_exclusive: values.subscriber_exclusive,
          image: values.image || undefined,
        },
        values.genre
      );

      if (values.content) {
        await apiRef.current.bookContent.update(editBookId, { idBook: editBookId, content: values.content });
      }

      setBooks(prevBooks =>
        prevBooks.map(b =>
          b.id === editBookId
            ? { ...b, ...updatedBook, content: values.content || b.content }
            : b
        )
      );

      setEditBookId(null);
      form.reset();
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Libro actualizado correctamente',
      });
    } catch (error) {
      console.error('Error al guardar libro:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar el libro',
      });
    }
  });

  const eliminarLibro = async (bookId: number) => {
    if (!bookId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se ha especificado el libro a borrar',
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar libro',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    if (confirmResult.isConfirmed) {
      try {
        await apiRef.current.books.delete(bookId);
        Swal.fire({
          icon: 'success',
          title: 'Libro borrado',
          timer: 1500,
          showConfirmButton: false,
        });
        await fetchBooks();
      } catch (error) {
        console.error('Error al borrar libro:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo borrar el libro',
        });
      }
    }
  };

  const toggleBookOpen = (bookId: number) => {
    setBookOpenIds((prev) =>
      prev.includes(bookId) ? prev.filter(bid => bid !== bookId) : [...prev, bookId]
    );
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(totalBooks / limit);

  return (
    <>
      <Input
        placeholder="Buscar libro"
        className={styles.inputSearch}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      <div className={styles.agregarLibro}>
        <AddBookDialog
          onAuthorAdded={(author) => setAuthors(prev => [...prev, author])}
          onGenreAdded={(genre) => setGenres(prev => [...prev, genre])}
          onBookCreated={(newBook) => {
            setBooks(prev => [newBook, ...prev].sort((a, b) => b.id - a.id));
            setCurrentPage(1);
          }}
        />
      </div>

      <div className={styles.bookList}>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className={styles.bookCard}>
              <div className={styles.bookHeader} onClick={() => toggleBookOpen(book.id)}>
                <span className={styles.bookName}>{book.title}</span>
                {bookOpenIds.includes(book.id) ? <ChevronUp /> : <ChevronDown />}
              </div>

              {bookOpenIds.includes(book.id) && (
                <div className={styles.bookDetails}>
                  {editBookId === book.id ? (
                    <Form {...form}>
                      <form onSubmit={onSubmit}>
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Título</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Ingresa el título" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Descripción</FormLabel>
                              <FormControl>
                                <Textarea {...field} placeholder="Ingresa la descripción" rows={3} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="anio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Año</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                  placeholder="Ingresa el año"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="isbn"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ISBN</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Ingresa el ISBN" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="stock"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stock</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                  placeholder="Ingresa el stock"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Precio</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step="0.01"
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                  placeholder="Ingresa el precio"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="subscriber_exclusive"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Exclusivo suscriptores</FormLabel>
                              <FormControl>
                                <Select
                                  value={field.value ? "true" : "false"}
                                  onValueChange={(value) => field.onChange(value === "true")}
                                  >
                                  <SelectTrigger className="bg-white border border-gray-300">
                                    <SelectValue placeholder="Seleccionar opción" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="true">Sí</SelectItem>
                                    <SelectItem value="false">No</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="author_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Autor</FormLabel>
                              <FormControl>
                                <Select
                                  value={String(field.value)}
                                  onValueChange={(value) => field.onChange(Number(value))}
                                >
                                  <SelectTrigger className="bg-white border border-gray-300">
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
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="genre"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Categorías</FormLabel>
                              <FormControl>
                                <div className="flex flex-col gap-1 max-h-40 overflow-y-auto border rounded p-2">
                                  {genres.map((genre) => (
                                    <label
                                      key={genre.id}
                                      className="flex items-center px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                                    >
                                      <span className="w-40 text-sm truncate">{genre.name}</span>
                                      <input
                                        type="checkbox"
                                        value={genre.id}
                                        checked={field.value.includes(genre.id)}
                                        onChange={(e) => {
                                          const checked = e.target.checked;
                                          const newGenres = checked
                                            ? [...field.value, genre.id]
                                            : field.value.filter((id) => id !== genre.id);
                                          field.onChange(newGenres);
                                        }}
                                        className="ml-auto"
                                      />
                                    </label>
                                  ))}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="image"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Imagen</FormLabel>
                              <FormControl>
                                <div className="flex flex-col gap-2"> {/* Replaced Fragment with div */}
                                  <Image
                                    src={
                                      field.value
                                        ? URL.createObjectURL(field.value)
                                        : typeof book.image === "string" && book.image.trim() !== ""
                                        ? book.image
                                        : '/libros/placeholder.png'
                                    }
                                    alt="Imagen del libro"
                                    width={100}
                                    height={150}
                                    unoptimized
                                  />
                                  <DragAndDrop
                                    onFileDrop={(file) => field.onChange(file)}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contenido</FormLabel>
                              <FormControl>
                                <div className="flex flex-col gap-2"> {/* Replaced Fragment with div */}
                                  <DragAndDropFile
                                    defaultFile={book.content}
                                    onSetCurrentFile={(file) => field.onChange(file)}
                                    validFormats={['.txt']}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className={styles.editButtons}>
                          <Button type="submit" className={styles.botonEditar}>
                            Guardar
                          </Button>
                          <Button type="button" className={styles.botonEditar} onClick={cancelEdit}>
                            Cancelar
                          </Button>
                        </div>
                      </form>
                    </Form>
                  ) : (
                    <>
                      <p><strong>Autor:</strong> {book.author}</p>
                      <p><strong>Precio:</strong> ${book.price}</p>
                      <p><strong>Año:</strong> {book.anio}</p>
                      <p><strong>Descripción:</strong> {book.description}</p>
                      <p><strong>Exclusivo suscriptores:</strong> {book.subscriber_exclusive ? 'Sí' : 'No'}</p>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => startEdit(book)}
                          className="flex-1 bg-blue-600 text-white"
                        >
                          Editar ✏️
                        </Button>
                        <Button
                          onClick={() => eliminarLibro(book.id)}
                          className="flex-1 bg-red-600 text-white"
                        >
                          Borrar
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No se encontraron libros.</p>
        )}
      </div>
      {filteredBooks.length > 0 && (
        <div className={styles.pagination}>
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            Anterior
          </Button>
          <span>Página {currentPage} de {totalPages}</span>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            Siguiente
          </Button>
        </div>
      )}
    </>
  );
}