import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import styles from '../../styles/panelAdmin.module.css';
import Swal from "sweetalert2";
import { ChevronDown, ChevronUp } from "lucide-react";

import { BaseApi } from "@/API/baseApi";
import { User } from "@/API/types/user";

export default function UsersPanel(): React.JSX.Element {
  const [userOpenIds, setUserOpenIds] = useState<number[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [apiRef, setApiRef] = useState<BaseApi | null>(null);

  // Initialize apiRef on client side
  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    setApiRef(new BaseApi(token));
  }, []);

  // Fetch usuarios
  const fetchUsers = async () => {
    if (!apiRef) return;
    
    try {
      const userData = await apiRef.users.getAll();
      setUsers(userData);
    } catch (error) {
      console.error('Error al obtener usuarios', error);
    }
  };

  useEffect(() => {
    if (apiRef) {
      fetchUsers();
    }
  }, [apiRef]);

  const toggleUserOpen = (id: number) => {
    setUserOpenIds((prev) =>
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  };

  const updateUser = async (id: number, updates: Partial<User>) => {
    if (!apiRef) return;
    
    try {
      await apiRef.users.update(id, updates);
      await fetchUsers();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  
  return (
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
  );
}