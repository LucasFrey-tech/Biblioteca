'use client';

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import styles from '../../styles/panelAdmin.module.css';
import Swal from "sweetalert2";
import { ChevronDown, ChevronUp } from "lucide-react";

import { BaseApi } from "@/API/baseApi";
import { User } from "@/API/types/user";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext
} from "@/components/ui/pagination";

const PAGE_SIZE = 1;

export default function UsersPanel(): React.JSX.Element {
  const [userOpenIds, setUserOpenIds] = useState<number[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [apiRef, setApiRef] = useState<BaseApi | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    setApiRef(new BaseApi(token));
  }, []);

  const fetchUsers = React.useCallback(async () => {
    if (!apiRef) return;

    try {
      const userData = await apiRef.users.getAll();
      setUsers(userData);
    } catch (error) {
      console.error('Error al obtener usuarios', error);
    }
  }, [apiRef]);

  useEffect(() => {
    if (apiRef) {
      fetchUsers();
    }
  }, [apiRef, fetchUsers]);

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
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Usuario actualizado",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <Input
        placeholder='Buscar usuario'
        className={styles.inputSearch}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {paginatedUsers.map((user: User) => (
        <div key={user.id} className={styles.userCard}>
          <div className={styles.userHeader} onClick={() => toggleUserOpen(user.id)}>
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
                            title: "Se quitó el rol administrador a este usuario",
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

      {/* Paginación con estilo Shad y botón activo en gris */}
      {totalPages > 1 && (
        <Pagination className="pt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => goToPage(currentPage - 1)}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => goToPage(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
