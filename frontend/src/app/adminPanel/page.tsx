'use client';

import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from '../../styles/panelAdmin.module.css';
import Swal from 'sweetalert2';
import { Button } from "@/components/ui/button";
import AddBookDialog from "@/components/pages/agregarLibro";
import DragAndDrop from "@/components/pages/dropImage";
import { BaseApi } from "@/API/baseApi";  
import { Label } from "@radix-ui/react-label";
import {BookFileUpdate } from "@/API/types/bookFile";
import { User } from "@/API/types/user";
import { useRouter } from 'next/navigation'; 
import { jwtDecode } from "jwt-decode";


export default function PanelAdmin() {
  const [activeTab, setActiveTab] = useState<'users' | 'books'>('users');
  const [userOpenIds, setUserOpenIds] = useState<number[]>([]);
  const [bookOpenIds, setBookOpenIds] = useState<number[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<BookFileUpdate[]>([]);
  // const [bookGenres, setBookGenres] = useState<BookGenre[]>([]);
  // const [genres, setGenres] = useState<BookGenre[]>([]);
  const [search, setSearch] = useState('');
  const apiRef = useRef<BaseApi | null>(null);
  const router = useRouter();
  
   apiRef.current = new BaseApi(); //ahora funciona sin token

    
  // Estado para manejar la edición de libros
  const [booksEditState, setBooksEditState] = useState<{
    [key: number]: {
      editMode: boolean;
      formData: BookFileUpdate;
    }
  }>({});

  // Función para iniciar la edición de un libro
  const startEdit = (book: BookFileUpdate) => {
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
    console.log('Saving changes for book:', bookState.formData.image);
    if (!bookState) return;
    const bookData: BookFileUpdate = {
      id: bookState.formData.id,
      title: bookState.formData.title,
      author_id: bookState.formData.author_id,
      description: bookState.formData.description,
      anio: bookState.formData.anio,
      genre: bookState.formData.genre,
      author: bookState.formData.author,
      isbn: bookState.formData.isbn,
      image: bookState.formData.image? bookState.formData.image : books.find(b => b.id === bookId)?.image || '',
      stock: bookState.formData.stock,
      subscriber_exclusive: bookState.formData.subscriber_exclusive,
      price: bookState.formData.price
    }
    try {
      apiRef.current?.books.updateBookFile(bookId, bookData);
      // Actualizo localmente el estado de libros
      setBooks(prevBooks => prevBooks.map(b => b.id === bookId ? bookState.formData : b));
      // setGenres(prevBooks => prevBooks.map(b => b.id === bookId ? bookState.formData : b));
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
      const resUser = await apiRef.current?.users.getAll();
      if (!resUser) throw new Error('No se pudieron obtener los usuarios');
      setUsers(resUser);
    } catch (error) {
      console.error('Error al obtener usuarios', error);
    }
  };

  // Fetch libros
  const fetchBooks = async () => {
    try {
      const resBooks = await apiRef.current?.books.getAll();
      if (!resBooks) throw new Error('No se pudieron obtener los libros');
      setBooks(resBooks);
      console.log(resBooks);
    } catch (error) {
      console.error('Error al obtener libros', error);
    }
  };
  
  // Fetch Generos
  const fetchGenres = async () => {
    try {
      const resBookGenres = await apiRef.current?.bookGenre.findAll();
      if (!resBookGenres) throw new Error('No se pudieron obtener los géneros');
      //  setBookGenres(resBookGenres);
      console.log(resBookGenres);
    } catch (error) {
      console.error('Error al obtener los generos', error);
    }
  };

useEffect(() => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    router.push('/login');
    return;
  }

  apiRef.current = new BaseApi(token);

  const verifyAdminAndLoadData = async () => {
    try {
      const decodedToken = jwtDecode<{sub: number, admin: boolean}>(token); 
      const userId = decodedToken.sub; 
      const allUsers = await apiRef.current?.users.getAll();
      const currentUser = allUsers?.find(user => user.id === userId);

      if (!currentUser) {
        Swal.fire({
          title: 'Usuario no encontrado',
          text: 'Por favor, inicia sesión nuevamente.',
          icon: 'error',
        }).then(() => router.push('/login'));
        return; 
      }
      // 4. Verificar si es admin
      if (decodedToken.admin !== true) {
        Swal.fire({
          title: 'Acceso denegado',
          text: 'Solo los administradores pueden acceder.',
          icon: 'error',
        }).then(() => router.push('/inicio'));
        return; // ¡Detiene la ejecución si no es admin!
      }
      await Promise.all([
        fetchUsers(),
        fetchBooks(),
        fetchGenres(),
      ]);
    } catch (error) {
      console.error('Error al verificar admin:', error);
      router.push('/login'); // Si hay error, redirige al login
    }
  };
  verifyAdminAndLoadData(); // ¡Ejecuta la función!
}, [router]); // Añade `router` como dependencia

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

    const handleImage = (bookId: number,field: string, value: File) => {
      console.log('Handling image for book:', bookId, 'Field:', field, 'Value:', value);
        setBooksEditState(prev => {
      const bookState = prev[bookId];
      if (!bookState) return prev;
      return {
        ...prev,
        [bookId]: {
          ...bookState,
          formData: {
            ...bookState.formData,
            [field]: value
          }
        }
      };
    });
  };

  const updateUser = async (id: number, updates: Partial<User>) => {
    try {
      const res = await apiRef.current?.users.update(id, updates);

      if (!res) throw new Error('Error en la actualización');
      await fetchUsers();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  const filteredBooks = books.filter(book =>
  book.title?.toLowerCase().includes(search.toLowerCase())
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
                                updateUser(user.id, { admin: true });
                                 Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Este usuario ahora es administrador",
                                showConfirmButton: false,
                                timer: 2000
                              });
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
                                updateUser(user.id, { admin: false });
                                Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Se quito el rol administrador a este usuario",
                                showConfirmButton: false,
                                timer: 2000
                              });
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
                                updateUser(user.id, { disabled: true });
                                 Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Usuario Bloqueado",
                                showConfirmButton: false,
                                timer: 1500
                              });
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
                                updateUser(user.id, { disabled: false });
                                Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Usuario desbloqueado",
                                showConfirmButton: false,
                                timer: 1500
                              });
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
              <AddBookDialog />
            </div>

            {filteredBooks.map((book: BookFileUpdate) => {
              console.log('Book:', book);
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
                          <Label>
                            Título: 
                            <Input
                              name="title"
                              value={editState.formData.title}
                              onChange={(e) => handleBookChange(book.id, e)}
                            />
                          </Label>
                          <Label>
                            Descripción:
                            <textarea
                              name="description"
                              value={editState.formData.description}
                              onChange={(e) => handleBookChange(book.id, e)}
                              rows={3}
                            />
                          </Label>
                          <Label>
                            Año:
                            <Input
                              type="number"
                              name="anio"
                              value={editState.formData.anio}
                              onChange={(e) => handleBookChange(book.id, e)}
                            />
                          </Label>
                          <Label>
                            ISBN:
                            <Input
                              name="isbn"
                              value={editState.formData.isbn}
                              onChange={(e) => handleBookChange(book.id, e)}
                            />
                          </Label>
                        <Label>Imagen</Label>
                            <DragAndDrop onFileDrop={file => {
                                        handleImage(book.id,'image', file);  
                                    }} 
                              />     
                          <Label>
                            Stock:
                            <Input
                              type="number"
                              name="stock"
                              value={editState.formData.stock}
                              onChange={(e) => handleBookChange(book.id, e)}      
                              />
                              </Label>
                            <Label>
                            Exclusivo suscriptores:
                            <select
                              name="subscriber_exclusive"
                              value={editState.formData.subscriber_exclusive ? "true" : "false"}
                              onChange={(e) => {
                                const value = Boolean(e.target.value === "true");
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
                          </Label>   
                              
                          <Label>
                            Precio:
                            <Input
                              type="number"
                              name="price"
                              value={editState.formData.price}
                              onChange={(e) => handleBookChange(book.id, e)}
                            />
                          </Label>       
                          <Label>
                            Autor:
                            <Input
                              name="author_name"
                              value={editState.formData.author}
                              onChange={(e) => handleBookChange(book.id, e)}
                            />
                          </Label>
          
                          
                          <div className={styles.editButtons}>
                            <Button className={styles.botonEditar} onClick={() => saveChanges(book.id)}>Guardar</Button>
                            <Button className={styles.botonEditar}  onClick={() => cancelEdit(book.id)}>Cancelar</Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p><strong>Descripción:</strong> {book.description}</p>        
                          <p><strong>Año:</strong> {book.anio}</p>
                          <p><strong>ISBN:</strong>{book.isbn}</p>
                          <p><strong>Stock:</strong>{book.stock}</p>
                          <p><strong>Exclusivo suscriptores:</strong> {book.subscriber_exclusive ? 'Sí' : 'No'}</p>
                          <p><strong>Precio:</strong> ${book.price}</p>
                          <p><strong>Autor:</strong> {book.author}</p>
                          <p><strong>Géneros:</strong> {book.genre?.join(', ') || 'Ninguno'}</p>
                      
                          <Button onClick={() => startEdit(book)}>Editar✏️ </Button>
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




