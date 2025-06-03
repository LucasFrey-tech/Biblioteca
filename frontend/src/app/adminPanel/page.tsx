'use client';
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from '../../styles/panelAdmin.module.css';
import Swal from 'sweetalert2';
import { Button } from "@/components/ui/button";

type User = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  admin: boolean;
  disabled: boolean;
};

type Book = {
  id: number;
  title: string;
  author_id: number;
  author_name: string;
  description: string;
  anio: number;
  isbn: string;
  image: string;
  stock: number;
  subscriber_exclusive: boolean;
  price: number;
}

export default function PanelAdmin() {
  const [activeTab, setActiveTab] = useState<'users' | 'books'>('users');
  const [userOpenIds, setUserOpenIds] = useState<number[]>([]);
  const [bookOpenIds, setBookOpenIds] = useState<number[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState('');

  // Estado para manejar la edición de libros
  const [booksEditState, setBooksEditState] = useState<{
    [key: number]: {
      editMode: boolean;
      formData: Book;
    }
  }>({});

  // Función para iniciar la edición de un libro
  const startEdit = (book: Book) => {
    setBooksEditState(prev => ({
      ...prev,
      [book.id]: {
        editMode: true,
        formData: { ...book }
      }
    }));
  };

  // Maneja cambios en inputs de edición
  const handleBookChange = (bookId: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
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

    try {
      const res = await fetch(`http://localhost:3001/books/${bookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookState.formData),
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

  // Fetch usuarios
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3001/users');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Error al obtener usuarios', error);
    }
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
    fetchUsers();
    fetchBooks();
  }, []);

  const toggleUserOpen = (id: number) => {
    setUserOpenIds((prev) =>
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  };

  const toggleBookOpen = (id: number) => {
    setBookOpenIds((prev) =>
      prev.includes(id) ? prev.filter(bid => bid !== id) : [...prev, id]
    );
  };

  const updateUser = async (id: number, updates: Partial<User>, successMsg: string) => {
    try {
      const res = await fetch(`http://localhost:3001/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error('Error en la actualización');
      await fetchUsers();
      Swal.fire('Éxito', successMsg, 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.titulo}>PANEL DE ADMINISTRADOR</h1>
      <div className={styles.navButtons}>
        <button
          className={`${styles.tabButton} ${activeTab === 'users' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Usuarios
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'books' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('books')}
        >
          Libros
        </button>
      </div>

      <div className={styles.contenido}>
        {activeTab === 'users' && (
          <>
            <Input
              placeholder='Buscar usuario'
              className={styles.inputSearch}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {filteredUsers.map((user: User) => (
              <div key={user.id} className={styles.userCard}>
                <div
                  className={styles.userHeader}
                  onClick={() => toggleUserOpen(user.id)}
                >
                  <span className={styles.userName}>{user.firstname} {user.lastname}</span>
                  {userOpenIds.includes(user.id) ? <ChevronUp /> : <ChevronDown />}
                </div>

                {userOpenIds.includes(user.id) && (
                  <div className={styles.userDetails}>
                    {/* Administrador */}
                    <div className={styles.userActionRow}>
                      <p className={styles.actionTitle}>Administrador</p>
                      <div className={styles.actionButtons}>
                        <button
                          disabled={user.admin}
                          className={`${styles.actionButton} ${user.admin ? styles.disabledButton : styles.enableButton}`}
                          onClick={() =>
                            Swal.fire({
                              title: "¿Hacer administrador a este usuario?",
                              icon: "question",
                              showCancelButton: true,
                              confirmButtonText: "Sí",
                              cancelButtonText: "Cancelar"
                            }).then((res) => {
                              if (res.isConfirmed) {
                                updateUser(user.id, { admin: true }, 'Usuario ahora es administrador');
                              }
                            })
                          }
                        >✅</button>
                        <button
                          disabled={!user.admin}
                          className={`${styles.actionButton} ${!user.admin ? styles.disabledButton : styles.enableButton}`}
                          onClick={() =>
                            Swal.fire({
                              title: "¿Quitar administrador a este usuario?",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "Quitar",
                              cancelButtonText: "Cancelar"
                            }).then((res) => {
                              if (res.isConfirmed) {
                                updateUser(user.id, { admin: false }, 'Se quitó el rol de administrador');
                              }
                            })
                          }
                        >❌</button>
                      </div>
                    </div>

                    {/* Bloquear */}
                    <div className={styles.userActionRow}>
                      <p className={styles.actionTitle}>Bloquear</p>
                      <div className={styles.actionButtons}>
                        <button
                          disabled={user.disabled}
                          className={`${styles.actionButton} ${user.disabled ? styles.disabledButton : styles.enableButton}`}
                          onClick={() =>
                            Swal.fire({
                              title: "¿Bloquear a este usuario?",
                              icon: "question",
                              showCancelButton: true,
                              confirmButtonText: "Sí",
                              cancelButtonText: "Cancelar"
                            }).then((res) => {
                              if (res.isConfirmed) {
                                updateUser(user.id, { disabled: true }, 'Usuario bloqueado');
                              }
                            })
                          }
                        >✅</button>
                        <button
                          disabled={!user.disabled}
                          className={`${styles.actionButton} ${!user.disabled ? styles.disabledButton : styles.enableButton}`}
                          onClick={() =>
                            Swal.fire({
                              title: "¿Desbloquear a este usuario?",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "Desbloquear",
                              cancelButtonText: "Cancelar"
                            }).then((res) => {
                              if (res.isConfirmed) {
                                updateUser(user.id, { disabled: false }, 'Usuario desbloqueado');
                              }
                            })
                          }
                        >❌</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {activeTab === "books" && (
          <>
            <Input
              placeholder="Buscar libro"
              className={styles.inputSearch}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className={styles.agregarLibro}>
              <Button>Agregar libro</Button>
            </div>

            {filteredBooks.map((book: Book) => {
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
                              value={editState.formData.author_name}
                              onChange={(e) => handleBookChange(book.id, e)}
                            />
                          </label>

                          <label>
                            Año:
                            <Input
                              name="anio"
                              type="number"
                              value={editState.formData.anio}
                              onChange={(e) => handleBookChange(book.id, e)}
                            />
                          </label>

                          <label>
                            Stock:
                            <Input
                              name="stock"
                              type="number"
                              value={editState.formData.stock}
                              onChange={(e) => handleBookChange(book.id, e)}
                            />
                          </label>

                          <label>
                            ISBN:
                            <Input
                              name="isbn"
                              value={editState.formData.isbn}
                              onChange={(e) => handleBookChange(book.id, e)}
                            />
                          </label>

                          <label>
                            Descripción:
                            <textarea
                              name="description"
                              value={editState.formData.description}
                              onChange={(e) => handleBookChange(book.id, e)}
                              className={styles.textarea}
                            />
                          </label>

                          <label>
                            Exclusivo para suscriptores:
                            <input
                              type="checkbox"
                              name="subscriber_exclusive"
                              checked={editState.formData.subscriber_exclusive}
                              onChange={(e) => handleBookChange(book.id, e)}
                            />
                          </label>

                          <label>
                            Precio:
                            <Input
                              name="price"
                              type="number"
                              step="0.01"
                              value={editState.formData.price}
                              onChange={(e) => handleBookChange(book.id, e)}
                            />
                          </label>

                          <div className={styles.editButtons}>
                            <Button onClick={() => saveChanges(book.id)}>Guardar</Button>
                            <Button variant="secondary" onClick={() => cancelEdit(book.id)}>Cancelar</Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p><strong>Autor:</strong> {book.author_name}</p>
                          <p><strong>Año:</strong> {book.anio}</p>
                          <p><strong>Stock:</strong> {book.stock}</p>
                          <p><strong>ISBN:</strong> {book.isbn}</p>
                          <p><strong>Descripción:</strong> {book.description}</p>
                          <p><strong>Exclusivo suscriptores:</strong> {book.subscriber_exclusive ? "Sí" : "No"}</p>
                          <p><strong>Precio:</strong> ${book.price.toFixed(2)}</p>

                          <Button onClick={() => startEdit(book)}>Editar</Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}




