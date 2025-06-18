import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import AddBookDialog from "@/components/pages/agregarLibro";
import styles from '../../styles/panelAdmin.module.css';


type Book = {
  id: number;
  title: string;
  author_id: number;
  description: string;
  anio: number;
  isbn: string;
  image: string;
  stock: number;
  subscriber_exclusive: boolean;
  price: number;
}
type BookDTO = {
  id: number;
  title: string;
  author_id: number;
  author: string;
  description: string;
  anio: number;
  isbn: string;
  image: string;
  stock: number;
  subscriber_exclusive: boolean;
  price: number;
}

export default function BooksPanel(): React.JSX.Element {
    const [activeTab, setActiveTab] = useState<'users' | 'books'>('users');
      const [bookOpenIds, setBookOpenIds] = useState<number[]>([]);
      const [books, setBooks] = useState<BookDTO[]>([]);
      const [search, setSearch] = useState('');
    
      // Estado para manejar la edición de libros
      const [booksEditState, setBooksEditState] = useState<{
        [key: number]: {
          editMode: boolean;
          formData: BookDTO;
        }
      }>({});
    
      // Función para iniciar la edición de un libro
      const startEdit = (book: BookDTO) => {
        setBooksEditState(prev => ({
          ...prev,
          [book.id]: {
            editMode: true,
            formData: { ...book }
          }
        }));
      };
    
      // Maneja cambios en inputs de edición
      const handleBookChange = (
        bookId: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const target = e.target as HTMLInputElement; // <-- casting para que TS sepa que tiene checked
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
    
      // Guarda los cambios haciendo fetch PUT y actualizando el estado
      const saveChanges = async (bookId: number) => {
        const bookState = booksEditState[bookId];
        if (!bookState) return;
        const bookData: Book = {
          id: bookState.formData.id,
          title: bookState.formData.title,
          author_id: bookState.formData.author_id,
          description: bookState.formData.description,
          anio: bookState.formData.anio,
          isbn: bookState.formData.isbn,
          image: bookState.formData.image,
          stock: bookState.formData.stock,
          subscriber_exclusive: bookState.formData.subscriber_exclusive,
          price: bookState.formData.price
        }
        try {
          const res = await fetch(`http://localhost:3001/books/${bookId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookData),
          });
          if (!res.ok) throw new Error("Error al guardar cambios");
    
          // Actualizo localmente el estado de libros
          setBooks(prevBooks => prevBooks.map(b => b.id === bookId ? bookState.formData : b));
    
          // Salgo del modo edición
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
    
      // Cancela la edición
      const cancelEdit = (bookId: number) => {
        setBooksEditState(prev => ({
          ...prev,
          [bookId]: { ...prev[bookId], editMode: false }
        }));
      };
    
    
      // Fetch libros
      const fetchBooks = async () => {
        try {
          const res = await fetch('http://localhost:3001/books');
          const data = await res.json();
          setBooks(data);
        } catch (error) {
          console.error('Error al obtener libros', error);
        }
      };
    
      useEffect(() => {
        fetchBooks();
      }, []);
    
      const toggleBookOpen = (id: number) => {
        setBookOpenIds((prev) =>
          prev.includes(id) ? prev.filter(bid => bid !== id) : [...prev, id]
        );
      };
    
      const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );

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

            {filteredBooks.map((book: BookDTO) => {
              const editState = booksEditState[book.id] || {
                editMode: false,
                formData: book
              };

              return (
                <div key={book.id} className={styles.bookCard}>
                  <div
                    className={styles.bookHeader}
                    onClick={() => toggleBookOpen(book.id)}
                  >
                    <span className={styles.bookName}>{book.title}</span>
                    {bookOpenIds.includes(book.id) ? <ChevronUp /> : <ChevronDown />}
                  </div>

                  {bookOpenIds.includes(book.id) && (
                    <div className={styles.bookDetails}>
                      {editState.editMode ? (
                        <>
                          <label>
                            Título: 
                            <Input
                              name="title"
                              value={editState.formData.title}
                              onChange={(e) => handleBookChange(book.id, e)}
                            />
                          </label>
                          <label>
                            Autor:
                            <Input
                              name="author_name"
                              value={editState.formData.author}
                              onChange={(e) => handleBookChange(book.id, e)}
                            />
                          </label>
                          <label>
                            Precio:
                            <Input
                              type="number"
                              name="price"
                              value={editState.formData.price}
                              onChange={(e) => handleBookChange(book.id, e)}
                            />
                          </label>
                          <label>
                            Año:
                            <Input
                              type="number"
                              name="anio"
                              value={editState.formData.anio}
                              onChange={(e) => handleBookChange(book.id, e)}
                            />
                          </label>
                          <label>
                            Exclusivo suscriptores:
                            <select
                              name="subscriber_exclusive"
                              value={editState.formData.subscriber_exclusive ? "true" : "false"}
                              onChange={(e) => {
                                const value = e.target.value === "true";
                                setBooksEditState(prev => {
                                  const bookState = prev[book.id];
                                  if (!bookState) return prev;
                                  return {
                                    ...prev,
                                    [book.id]: {
                                      ...bookState,
                                      formData: {
                                        ...bookState.formData,
                                        subscriber_exclusive: value,
                                      }
                                    }
                                  }
                                });
                              }}
                            >
                              <option value="true">Sí</option>
                              <option value="false">No</option>
                            </select>
                          </label>
                          <label>
                            Descripción:
                            <textarea
                              name="description"
                              value={editState.formData.description}
                              onChange={(e) => handleBookChange(book.id, e)}
                              rows={3}
                            />
                          </label>
                          <div className={styles.editButtons}>
                            <Button className={styles.botonEditar} onClick={() => saveChanges(book.id)}>Guardar</Button>
                            <Button className={styles.botonEditar}  onClick={() => cancelEdit(book.id)}>Cancelar</Button>
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
    )
}