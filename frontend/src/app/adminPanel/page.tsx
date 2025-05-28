'use client';

import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ChevronDown, ChevronUp, Edit2 } from 'lucide-react'; // Usamos Edit2 para el lápiz
import styles from '../../styles/panelAdmin.module.css';
import Swal from 'sweetalert2';

export default function PanelAdmin() {
  const [activeTab, setActiveTab] = useState<'users' | 'books'>('users');
  const [userOpen, setUserOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);

  // Estado edición libro por campo
  const [editField, setEditField] = useState<null | 'title' | 'author' | 'year' | 'price'>(null);

  // Estados para valores libro editables
  const [bookData, setBookData] = useState({
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    year: 1967,
    price: 25.99,
  });

  // Estado idiomas (permite múltiples)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages(prev => {
      if (prev.includes(lang)) {
        return prev.filter(l => l !== lang);
      } else {
        return [...prev, lang];
      }
    });
  };

  const user = {
    id: 1,
    name: 'Juan Pérez',
  };

  return (
    <div className={styles.pageContainer}>
      {/* Botones pestañas */}
      <div className="flex flex-row justify-center items-center gap-4 p-[1%] text-center">
        <Button
          className={`px-4 py-2 text-sm md:px-16 md:py-6 md:text-lg ${
            activeTab === 'users' ? 'bg-blue-600 text-white' : ''
          }`}
          onClick={() => setActiveTab('users')}
        >
          Usuarios
        </Button>
        <Button
          className={`px-4 py-2 text-sm md:px-16 md:py-6 md:text-lg ${
            activeTab === 'books' ? 'bg-blue-600 text-white' : ''
          }`}
          onClick={() => setActiveTab('books')}
        >
          Libros
        </Button>
      </div>

      {/* Contenido */}
      <div className={`${styles.contenido} flex flex-col items-center justify-center p-4`}>
        <Input placeholder='Username' className="mb-4 w-full max-w-md" />

        {/* Usuario */}
        {activeTab === 'users' && (
          <div className="w-full max-w-md border-[3px] border-gray-400 bg-white p-4 rounded-md">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setUserOpen(!userOpen)}
            >
              <span className="font-medium text-lg">{user.name}</span>
              {userOpen ? <ChevronUp /> : <ChevronDown />}
            </div>

            {userOpen && (
              <div className="mt-3 p-3 border rounded bg-gray-100 space-y-4">
                {/* Administrador */}
                <div className="flex justify-between items-center">
                  <p className="font-medium">Administrador</p>
                  <div className="flex gap-2">
                    <button
                      className="text-green-600 text-xl hover:scale-110 transition"
                      onClick={() => {
                        Swal.fire({
                          title: "Quieres hacer administrador a este usuario?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Si, hacer"
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire({
                              title: "El usuario es administrador!",
                              icon: "success"
                            });
                          }
                        });
                      }}
                    >✅</button>
                    <button
                      className="text-red-600 text-xl hover:scale-110 transition"
                      onClick={() => {
                        Swal.fire({
                          title: "Quieres quitar el rol administrador a este usuario?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Quitar administrador"
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire({
                              title: "Se han removido rol de administrador a este usuario",
                              icon: "success"
                            });
                          }
                        });
                      }}
                    >❌</button>
                  </div>
                </div>

                {/* Bloquear */}
                <div className="flex justify-between items-center">
                  <p className="font-medium">Bloquear</p>
                  <div className="flex gap-2">
                    <button
                      className="text-green-600 text-xl hover:scale-110 transition"
                      onClick={() => {
                        Swal.fire({
                          title: "Quieres bloquear a este usuario?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Si, bloquear"
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire({
                              title: "El usuario ha sido bloqueado",
                              icon: "success"
                            });
                          }
                        });
                      }}
                    >✅</button>
                    <button
                      className="text-red-600 text-xl hover:scale-110 transition"
                      onClick={() => {
                        Swal.fire({
                          title: "Quieres desbloquear a este usuario?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Si, desbloquear"
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire({
                              title: "Se ha desbloqueado al usuario",
                              icon: "success"
                            });
                          }
                        });
                      }}
                    >❌</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Libro */}
        {activeTab === 'books' && (
          <div className="w-full max-w-md border-[3px] border-gray-400 bg-white p-4 rounded-md">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setBookOpen(!bookOpen)}
            >
              <span className="font-medium text-lg">{bookData.title}</span>
              {bookOpen ? <ChevronUp /> : <ChevronDown />}
            </div>

            {bookOpen && (
              <div className="mt-3 p-3 border rounded bg-gray-100 space-y-4">
                {/* Campo título */}
                <div className="flex justify-between items-center">
                  <label className="font-medium flex items-center gap-2">
                    Título:
                    {editField === 'title' ? (
                      <input
                        type="text"
                        value={bookData.title}
                        onChange={(e) =>
                          setBookData((prev) => ({ ...prev, title: e.target.value }))
                        }
                        onBlur={() => setEditField(null)}
                        autoFocus
                        className="border border-gray-400 rounded px-1 py-0.5"
                      />
                    ) : (
                      <span>{bookData.title}</span>
                    )}
                  </label>
                  <button
                    className="text-gray-600 hover:text-gray-900 transition"
                    onClick={() => setEditField('title')}
                    aria-label="Editar título"
                  >
                    <Edit2 size={18} />
                  </button>
                </div>

                {/* Campo autor */}
                <div className="flex justify-between items-center">
                  <label className="font-medium flex items-center gap-2">
                    Autor:
                    {editField === 'author' ? (
                      <input
                        type="text"
                        value={bookData.author}
                        onChange={(e) =>
                          setBookData((prev) => ({ ...prev, author: e.target.value }))
                        }
                        onBlur={() => setEditField(null)}
                        autoFocus
                        className="border border-gray-400 rounded px-1 py-0.5"
                      />
                    ) : (
                      <span>{bookData.author}</span>
                    )}
                  </label>
                  <button
                    className="text-gray-600 hover:text-gray-900 transition"
                    onClick={() => setEditField('author')}
                    aria-label="Editar autor"
                  >
                    <Edit2 size={18} />
                  </button>
                </div>

                {/* Campo año */}
                <div className="flex justify-between items-center">
                  <label className="font-medium flex items-center gap-2">
                    Año publicación:
                    {editField === 'year' ? (
                      <input
                        type="number"
                        value={bookData.year}
                        onChange={(e) =>
                          setBookData((prev) => ({ ...prev, year: Number(e.target.value) }))
                        }
                        onBlur={() => setEditField(null)}
                        autoFocus
                        className="border border-gray-400 rounded px-1 py-0.5 w-24"
                      />
                    ) : (
                      <span>{bookData.year}</span>
                    )}
                  </label>
                  <button
                    className="text-gray-600 hover:text-gray-900 transition"
                    onClick={() => setEditField('year')}
                    aria-label="Editar año"
                  >
                    <Edit2 size={18} />
                  </button>
                </div>

                {/* Campo precio */}
                <div className="flex justify-between items-center">
                  <label className="font-medium flex items-center gap-2">
                    Precio:
                    {editField === 'price' ? (
                      <input
                        type="number"
                        step="0.01"
                        value={bookData.price}
                        onChange={(e) =>
                          setBookData((prev) => ({ ...prev, price: Number(e.target.value) }))
                        }
                        onBlur={() => setEditField(null)}
                        autoFocus
                        className="border border-gray-400 rounded px-1 py-0.5 w-24"
                      />
                    ) : (
                      <span>${bookData.price.toFixed(2)}</span>
                    )}
                  </label>
                  <button
                    className="text-gray-600 hover:text-gray-900 transition"
                    onClick={() => setEditField('price')}
                    aria-label="Editar precio"
                  >
                    <Edit2 size={18} />
                  </button>
                </div>

                {/* Idiomas con checkbox múltiples */}
                <div>
                  <p className="font-medium mb-2">Idiomas:</p>
                  <div className="flex gap-4">
                    {['Español', 'Inglés', 'Portugués'].map((lang) => (
                      <div key={lang} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={lang}
                          checked={selectedLanguages.includes(lang)}
                          onChange={() => toggleLanguage(lang)}
                        />
                        <label htmlFor={lang} className="text-sm font-medium leading-none">
                          {lang}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}







