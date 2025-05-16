'use client'

import { db } from '@/lib/db';
import { Book } from '@prisma/client'; 
import Image from 'next/image';


type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
};


export default async function CatalogPage() {
  // Obtener libros de la base de datos
  const books: Book[] = await db.book.findMany({
    orderBy: {
      title: 'asc',
    },
  });

  // Obtener categorías únicas para los filtros
  const categories = await db.book.findMany({
    distinct: ['category'],
    select: {
      category: true,
    },
  });

  // Obtener idiomas únicos para los filtros
  const languages = await db.book.findMany({
    distinct: ['language'],
    select: {
      language: true,
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Libros</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtros */}
        <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Categoría</h2>
            <select className="w-full p-2 border rounded">
              <option value="">Todas las categorías</option>
              {categories.map((cat) => (
                <option key={cat.category} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Precio</h2>
            <div className="flex gap-2 mb-2">
              <input 
                type="number" 
                placeholder="Desde" 
                className="w-1/2 p-2 border rounded"
              />
              <input 
                type="number" 
                placeholder="Hasta" 
                className="w-1/2 p-2 border rounded"
              />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Autor</h2>
            <input 
              type="text" 
              placeholder="Buscar autor..." 
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Idioma</h2>
            <select className="w-full p-2 border rounded">
              <option value="">Todos los idiomas</option>
              {languages.map((lang) => (
                <option key={lang.language} value={lang.language}>
                  {lang.language}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista de libros */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 relative">
                  <Image
                    src={book.imageUrl || '/default-book-cover.jpg'}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-indigo-600">${book.price.toLocaleString()}</span>
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                      {book.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}