'use client';
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from '../../styles/panelAdmin.module.css';
import Swal from 'sweetalert2';

type User = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  admin: boolean;
  disabled: boolean;
};

export default function PanelAdmin() {
  const [activeTab, setActiveTab] = useState<'users' | 'books'>('users');
  const [userOpenIds, setUserOpenIds] = useState<number[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3001/users');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Error al obtener usuarios', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleUserOpen = (id: number) => {
    setUserOpenIds((prev) =>
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
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

            {filteredUsers.map(user => (
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
                    {/* Sección Administrador */}
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

                    {/* Sección Bloquear */}
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
      </div>
    </div>
  );
}



