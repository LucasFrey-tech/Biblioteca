'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AddBookReview from '@/components/pages/agregarReview';
import styles from '../../../styles/profile.module.css';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';
import { User } from '@/API/types/user';
import { Purchase } from '@/API/types/purchase';
import { BaseApi } from '@/API/baseApi';
import { profileSchema, ProfileType } from '@/validations/profileSchema';

export default function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [purchases, setPurchases] = useState<Purchase[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  const apiRef = useRef<BaseApi | null>(null);

  const form = useForm<ProfileType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      tel: undefined,
      pass: undefined, // Changed from '' to undefined
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      apiRef.current = new BaseApi(token);
    } else {
      console.error('Falla validación token');
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'No se encontró un token válido. Por favor, inicia sesión nuevamente.',
      });
    }
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      if (!id) {
        console.error('No se proporcionó un Id de usuario');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se proporcionó un ID de usuario',
        });
        return;
      }
      if (!apiRef.current) {
        console.error('API aún no inicializada');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'API no inicializada',
        });
        return;
      }
      try {
        const response = await apiRef.current.users.getOne(Number(id));
        if (!response) {
          throw new Error('Error al obtener el perfil del usuario');
        }
        setUser(response);
        form.reset({
          firstname: response.firstname,
          lastname: response.lastname,
          username: response.username,
          email: response.email,
          tel: response.tel,
          pass: undefined, // Changed from '' to undefined
        });
      } catch (error) {
        console.error('Hubo un error al cargar el perfil: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al cargar el perfil',
        });
      }
    };
    getProfile();
  }, [id, form]);

  useEffect(() => {
    if (!user?.id) return;

    const maxPage = Math.ceil(totalItems / itemsPerPage);
    if (currentPage > maxPage && maxPage > 0) {
      setCurrentPage(maxPage);
      return;
    }

    const fetchPurchaseHistory = async () => {
      try {
        const res = await apiRef.current?.purchase.getUserPurchaseHistoryPaginated(
          user.id,
          currentPage,
          itemsPerPage
        );
        if (!res) return;
        setPurchases(res.items);
        setTotalItems(res.total);
      } catch (error) {
        console.error('Error listado de compras: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar el historial de compras',
        });
      }
    };

    fetchPurchaseHistory();
  }, [user, currentPage, totalItems]);

  const onSubmit = form.handleSubmit(async (values: ProfileType) => {
    if (!apiRef.current || !user) {
      console.error('API no inicializada o usuario no disponible');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'API no inicializada o usuario no disponible',
      });
      return;
    }
    try {
      const response = await apiRef.current.users.update(user.id, {
        firstname: values.firstname,
        lastname: values.lastname,
        username: values.username,
        email: values.email,
        tel: values.tel,
        ...(values.pass && { pass: values.pass }), // Only include pass if provided
      });

      if (!response) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al actualizar datos',
        });
        return;
      }

      setUser(response);
      setEditMode(false);
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Perfil actualizado con éxito',
      });
    } catch (error) {
      console.error('Error al guardar producto: ', error);
      Swal.fire({
        icon: 'error',
        title: 'Error de red',
        text: 'Error de red al guardar el producto',
      });
    }
  });

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

          {editMode ? (
            <Form {...form}>
              <form onSubmit={onSubmit} className={styles.form}>
                <div className={styles.row}>
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem className={styles.field}>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Ingresa tu nombre" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem className={styles.field}>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Ingresa tu apellido" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className={styles.row}>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className={styles.field}>
                        <FormLabel>Nombre de Usuario</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Ingresa tu nombre de usuario" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className={styles.field}>
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} placeholder="Ingresa tu email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className={styles.row}>
                  <FormField
                    control={form.control}
                    name="pass"
                    render={({ field }) => (
                      <FormItem className={styles.field}>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                            placeholder="Ingresa nueva contraseña (opcional)"
                            value={field.value || ''}
                            onChange={(e) => field.onChange(e.target.value || undefined)} // Convert empty string to undefined
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tel"
                    render={({ field }) => (
                      <FormItem className={styles.field}>
                        <FormLabel>Número de teléfono</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            {...field}
                            placeholder="Ingresa tu número de teléfono"
                            value={field.value || ''}
                            onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className={styles.buttonRow}>
                  <Button type="submit" className={styles.saveChanges}>
                    Guardar
                  </Button>
                  <Button
                    type="button"
                    className={styles.cancel}
                    onClick={() => setEditMode(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </Form>
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
                  <span id="profile-password" aria-label="Contraseña">
                    ******
                  </span>
                </div>
                <div className={styles.field}>
                  <label htmlFor="profile-tel">Número de teléfono</label>
                  <span id="profile-tel">{user.tel || 'No especificado'}</span>
                </div>
              </div>
              <div className={styles.buttonRow}>
                <Button
                  type="button"
                  className={styles.edit}
                  onClick={() => setEditMode(true)}
                >
                  Editar
                </Button>
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
                      const totalN = total - total * descuento;
                      return (
                        <tr key={`${purchase.id}-${item.id_book}-${index}`}>
                          <td>{item.title}</td>
                          <td>{item.virtual ? 'Virtual' : 'Físico'}</td>
                          <td>{item.author}</td>
                          <td>{cantidad}</td>
                          <td>
                            {totalN.toLocaleString('es-AR', {
                              style: 'currency',
                              currency: 'ARS',
                            })}
                          </td>
                          <td>{formatDate(new Date(purchase.purchaseDate))}</td>
                          <td>
                            <AddBookReview
                              id_user={purchase.id_user}
                              id_book={item.id_book}
                            />
                          </td>
                        </tr>
                      );
                    })
                  )
                ) : (
                  <tr>
                    <td colSpan={8} className={styles.noPurchases}>
                      No hay compras realizadas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className={styles.pagination}>
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Anterior
              </Button>
              <span>
                Página {currentPage} de {Math.ceil(totalItems / itemsPerPage)}
              </span>
              <Button
                disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}