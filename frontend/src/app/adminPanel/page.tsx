'use client';

import { Button } from '@/components/ui/button';
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

  const handleUpdateUser = async (id: number, updates: Partial<User>, successMsg: string) => {
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
      <div className={`${styles.contenido} flex flex-col items-center justify-center p-4`}>
        <div className="flex flex-row justify-center items-center gap-4 p-[1%] text-center">
          <Button
            className={`px-4 py-2 text-sm md:px-16 md:py-6 md:text-lg 
             ${activeTab === 'users' ? 'bg-blue-600 text-white' : ''
            }`}
            onClick={() => setActiveTab('users')}
          >Usuarios</Button>
          
          <Button
            className={`px-4 py-2 text-sm md:px-16 md:py-6 md:text-lg ${
              activeTab === 'books' ? 'bg-blue-600 text-white' : ''
            }`}
            onClick={() => setActiveTab('books')}
          >
            Libros
          </Button>
        </div>

        {activeTab === 'users' && (
          <>
            <Input
              placeholder='Buscar usuario'
              className="mb-4 w-full max-w-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {filteredUsers.map(user => (
              <div key={user.id} className="w-full max-w-md border-[3px] border-gray-400 bg-white p-4 rounded-md mb-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleUserOpen(user.id)}
                >
                  <span className="font-medium text-lg">{user.firstname} {user.lastname}</span>
                  {userOpenIds.includes(user.id) ? <ChevronUp /> : <ChevronDown />}
                </div>

                {userOpenIds.includes(user.id) && (
                  <div className="mt-3 p-3 border rounded bg-gray-100 space-y-4">
                    {/* Sección Administrador */}
                    <div className="flex justify-between items-center">
                      <p className="font-medium">Administrador</p>
                      <div className="flex gap-2">
                        <button
                          disabled={user.admin}
                          className={`text-green-600 text-xl hover:scale-110 transition ${user.admin && 'opacity-50 cursor-not-allowed'}`}
                          onClick={() =>
                            Swal.fire({
                              title: "¿Hacer administrador a este usuario?",
                              icon: "question",
                              showCancelButton: true,
                              confirmButtonText: "Sí",
                              cancelButtonText: "Cancelar"
                            }).then((res) => {
                              if (res.isConfirmed) {
                                handleUpdateUser(user.id, { admin: true }, 'Usuario ahora es administrador');
                              }
                            })
                          }
                        >✅</button>
                        <button
                          disabled={!user.admin}
                          className={`text-red-600 text-xl hover:scale-110 transition ${!user.admin && 'opacity-50 cursor-not-allowed'}`}
                          onClick={() =>
                            Swal.fire({
                              title: "¿Quitar administrador a este usuario?",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "Quitar",
                              cancelButtonText: "Cancelar"
                            }).then((res) => {
                              if (res.isConfirmed) {
                                handleUpdateUser(user.id, { admin: false }, 'Se quitó el rol de administrador');
                              }
                            })
                          }
                        >❌</button>
                      </div>
                    </div>

                    {/* Sección Bloquear */}
                    <div className="flex justify-between items-center">
                      <p className="font-medium">Bloquear</p>
                      <div className="flex gap-2">
                        <button
                          disabled={user.disabled}
                          className={`text-green-600 text-xl hover:scale-110 transition ${user.disabled && 'opacity-50 cursor-not-allowed'}`}
                          onClick={() =>
                            Swal.fire({
                              title: "¿Bloquear a este usuario?",
                              icon: "question",
                              showCancelButton: true,
                              confirmButtonText: "Sí",
                              cancelButtonText: "Cancelar"
                            }).then((res) => {
                              if (res.isConfirmed) {
                                handleUpdateUser(user.id, { disabled: true }, 'Usuario bloqueado');
                              }
                            })
                          }
                        >✅</button>
                        <button
                          disabled={!user.disabled}
                          className={`text-red-600 text-xl hover:scale-110 transition ${!user.disabled && 'opacity-50 cursor-not-allowed'}`}
                          onClick={() =>
                            Swal.fire({
                              title: "¿Desbloquear a este usuario?",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "Desbloquear",
                              cancelButtonText: "Cancelar"
                            }).then((res) => {
                              if (res.isConfirmed) {
                                handleUpdateUser(user.id, { disabled: false }, 'Usuario desbloqueado');
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
