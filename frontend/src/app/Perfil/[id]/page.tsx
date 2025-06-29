'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import AddBookReview from '@/components/pages/agregarReview';
import styles from '../../../styles/profile.module.css'

import { User } from '@/API/types/user';
import { Purchase } from '@/API/types/purchase';

import { BaseApi } from '@/API/baseApi';

export default function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
  const [editedProduct, setEditedProduct] = useState<{ [key: number]: Partial<User> & { pass?: string } }>({});
  const [purchases, setPurchases] = useState<Purchase[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5; // o 10, lo que prefieras

  const apiRef = useRef<BaseApi | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      apiRef.current = new BaseApi(token);
    } else {
      console.error("Falla validacion token");
    }
  }, []);

  const editActivate = (u: User) => {
    setEditMode(prev => ({ ...prev, [u.id]: true }));
    setEditedProduct(prev => ({
      ...prev,
      [u.id]: {
        email: u.email,
        username: u.username,
        firstname: u.firstname,
        lastname: u.lastname,
        tel: u.tel,
      },
    }));
  };

  const saveChanges = async (id: number) => {
    if (!apiRef.current) {
      console.error("API no inicializada");
      return;
    }
    const datos = editedProduct[id];
    try {
      const response = await apiRef.current.users.update(id, datos);

      if (!response) {
        alert(`Error al actualizar datos`);
        return;
      }

      setUser(response);
      setEditMode(prev => ({ ...prev, [id]: false }));
    } catch (error) {
      console.error('Error al guardar producto: ', error);
      alert('Error de red al guardar el producto');
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      if (!id) {
        console.error('No se proporcionó un Id de usuario');
        return;
      }
      if (!apiRef.current) {
        console.error('API aún no inicializada');
        return;
      }
      try {
        const response = await apiRef.current.users.getOne(Number(id));
        if (!response) {
          throw new Error('Error al obtener el perfil del usuario');
        }
        setUser(response);
      } catch (error) {
        console.error('Hubo un error al cargar el perfil: ', error);
      }
    };
    getProfile();
  }, [id]);

  useEffect(() => {
  if (!user?.id) return;

  const maxPage = Math.ceil(totalItems / itemsPerPage);
  if (currentPage > maxPage && maxPage > 0) {
    setCurrentPage(maxPage);
    return;
  }
  
  const fetchPurchaseHistory = async () => {
    try {
      const res = await apiRef.current?.purchase.getUserPurchaseHistoryPaginated(user.id, currentPage, itemsPerPage);
      if (!res) return;
      setPurchases(res.items);
      setTotalItems(res.total);
    } catch (error) {
      console.error('Error listado de compras: ', error);
    }
  };

  fetchPurchaseHistory();
}, [user, currentPage, totalItems]);


  if (!user) return <p>Cargando Perfil...</p>;

  const formatDate = (fecha: Date): string => {
    if (!fecha) return '';
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${dia}/${mes}/${anio}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <h2>Información del Perfil</h2>

        <div className={styles.info}>
          <div className={styles.usernameCentered}>
            <span className={styles.name}>{user.username}</span>
          </div>

          {editMode[user.id] ? (
            <form>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor='fname'>Nombre</label><br />
                  <input
                    type='text'
                    id='fname'
                    value={editedProduct[user.id]?.firstname}
                    onChange={(e) => setEditedProduct((prev) => ({ ...prev, [user.id]: { ...prev[user.id], firstname: e.target.value } }))}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor='lname'>Apellido</label><br />
                  <input
                    type='text'
                    id='lname'
                    value={editedProduct[user.id]?.lastname}
                    onChange={(e) => setEditedProduct((prev) => ({ ...prev, [user.id]: { ...prev[user.id], lastname: e.target.value } }))}
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor='uname'>Nombre de Usuario</label><br />
                  <input
                    type='text'
                    id='uname'
                    value={editedProduct[user.id]?.username}
                    onChange={(e) => setEditedProduct((prev) => ({ ...prev, [user.id]: { ...prev[user.id], username: e.target.value } }))}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor='email'>Correo Electrónico</label><br />
                  <input
                    type='email'
                    id='email'
                    value={editedProduct[user.id]?.email}
                    onChange={(e) => setEditedProduct((prev) => ({ ...prev, [user.id]: { ...prev[user.id], email: e.target.value } }))}
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor='pass'>Contraseña</label><br />
                  <input
                    type='password'
                    id='pass'
                    value={editedProduct[user.id]?.pass ?? ''}
                    onChange={(e) => setEditedProduct((prev) => ({ ...prev, [user.id]: { ...prev[user.id], pass: e.target.value } }))}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor='tel'>Número de teléfono</label><br />
                  <input
                    type='tel'
                    id='tel'
                    value={editedProduct[user.id]?.tel ?? ''}
                    onChange={(e) => setEditedProduct((prev) => ({ ...prev, [user.id]: { ...prev[user.id], tel: Number(e.target.value) } }))}
                  />
                </div>
              </div>

              <div className={styles.buttonRow}>
                <button type="button" className={styles.saveChanges} onClick={() => saveChanges(user.id)}>Guardar</button>
                <button type="button" className={styles.cancel} onClick={() => setEditMode(prev => ({ ...prev, [user.id]: false }))}>Cancelar</button>
              </div>
            </form>
          ) : (
            <div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="profile-firstname">Nombre</label>
                  <span id="profile-firstname">{user.firstname}</span>
                </div>
                <div className={styles.field}>
                  <label htmlFor="profile-lastname">Apellido</label>
                  <span id="profile-lastname">{user.lastname}</span>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="profile-username">Nombre de Usuario</label>
                  <span id="profile-username">{user.username}</span>
                </div>
                <div className={styles.field}>
                  <label htmlFor="profile-email">Correo Electrónico</label>
                  <span id="profile-email">{user.email}</span>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="profile-password">Contraseña</label>
                  <span id="profile-password" aria-label="Contraseña">******</span>
                </div>
                <div className={styles.field}>
                  <label htmlFor="profile-tel">Número de teléfono</label>
                  <span id="profile-tel">{user.tel}</span>
                </div>
              </div>

              <div className={styles.buttonRow}>
                <button type="button" className={styles.edit} onClick={() => editActivate(user)}>Editar</button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.history}>
          <h2>Historial de Compras</h2>

          <div className={styles.purchaseTableWrapper}>
            <table className={styles.purchases}>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Tipo</th>
                  <th>Autor</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Fecha</th>
                  <th>Review</th>
                </tr>
              </thead>
              <tbody>
                {purchases && purchases.length > 0 ? (
                  purchases.flatMap((purchase) =>
                    purchase.purchaseItems.map((item, index) => {
                      const precioU = item.price;
                      const cantidad = item.amount;
                      const descuento = item.subscriptionDiscount / 100;
                      const total = precioU * cantidad;
                      const totalN = total - (total * descuento);
                      
                      return (
                        <tr key={`${purchase.id}-${item.id_book}-${index}`}>
                          <td>{item.title}</td>
                          <td>{item.virtual ? "Virtual" : "Fisico"}</td>
                          <td>{item.author}</td>
                          <td>{cantidad}</td>
                          <td>{totalN.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</td>
                          <td>{formatDate(new Date(purchase.purchaseDate))}</td>
                          <td>
                            <AddBookReview id_user={purchase.id_user} id_book={item.id_book} />
                          </td>
                        </tr>
                      );
                    })
                  )
                ) : (
                  <tr>
                    <td colSpan={8} className={styles.noPurchases}>No hay compras realizadas</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className={styles.pagination}>
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Anterior</button>
                <span>Página {currentPage} de {Math.ceil(totalItems / itemsPerPage)}</span>
              <button disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)} onClick={() => setCurrentPage(p => p + 1)}>Siguiente</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
