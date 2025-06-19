'use client';

import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import Swal from 'sweetalert2';

import { AddAuthorDialog } from './AddAuthorDialog';
import { AddGenreDialog } from './agregarCategoria'; 
import DragAndDrop from './dropImage';
import { BaseApi } from '@/API/baseApi';
import { BookFile } from '@/API/types/bookFile';
import { number } from 'zod';
// import { BookGenres } from '@/API/class/book_genre';


interface Author {
  id: number;
  name: string;
}
interface Genre {
  id: number;
  name: string;
}

export default function AddBookDialog() {
  const [open, setOpen] = useState(false);

  const [authors, setAuthors] = useState<Author[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const API = new BaseApi(localStorage.getItem('token') || '');

  const [form, setForm] = useState({
    title: '',
    description: '',
    anio: '',
    isbn: '',
    image: null as File | null,  
    stock: '',
    subscriber_exclusive: 'false',
    price: '',
    authorId: '',
    genres: '', // String con géneros separados por coma
  });

  useEffect(() => {
    fetch('http://localhost:3001/authors')
      .then(res => res.json())
      .then(data => setAuthors(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/genres')
      .then(res => res.json())
      .then(data => setGenres(data));
  }, []);

  const handleChange = (field: string , value: string) => {
    setForm({ ...form, [field]: value });
  };
  const handleImage = (field: string, value: File) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    const formGenresString = form.genres.split(',').map(g => g.trim()).filter(g => g !== '');
    const formGenresNumber = formGenresString.map(g => Number(g))
    const newBook: Partial<BookFile>= {
      title: form.title,
      description: form.description,
      anio: Number(form.anio),
      isbn: form.isbn,
      image: form.image ?? undefined, 
      stock: Number(form.stock),
      subscriber_exclusive: form.subscriber_exclusive === 'true',
      price: Number(form.price),
      author_id: Number(form.authorId),
    };
    console.log('Form data:', newBook);
    // const response = API.books.create(newBook);
     API.books.createBookFile(newBook,formGenresNumber);
      
    
    if (true) {
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Libro agregado correctamente',
        timer: 2000,
        showConfirmButton: false,
      });
      setOpen(false);
      setForm({
        title: '',
        description: '',
        anio: '',
        isbn: '',
        image: null,
        stock: '',
        subscriber_exclusive: 'false',
        price: '',
        authorId: '',
        genres: '',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar el libro',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  // Estados para abrir modales pequeños de autor y género
  const [openAddAuthor, setOpenAddAuthor] = useState(false);
  const [openAddGenre, setOpenAddGenre] = useState(false);

  // Función que agrega un autor nuevo a la lista y selecciona ese autor en el form
  const handleNewAuthor = (author: Author) => {
    setAuthors(prev => [...prev, author]);
    setForm(prev => ({ ...prev, authorId: String(author.id) }));
    setOpenAddAuthor(false);
    Swal.fire({
      icon: 'success',
      title: 'Autor agregado',
      timer: 1500,
      showConfirmButton: false,
    });
  };
  // Función que agrega una categoría nueva a la lista y la agrega al form
  const handleNewGenre = (genre: Genre) => {
    setGenres(prev => [...prev, genre]);
    setForm(prevForm => {
      const currentGenres = prevForm.genres ? prevForm.genres.split(',') : [];
      const updatedGenres = [...currentGenres, genre.name];
      return {
        ...prevForm,
        genres: updatedGenres.join(',')
      };
    });
    setOpenAddGenre(false);
    Swal.fire({
      icon: 'success',
      title: 'Categoría agregada',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <>
      {/* Modal grande para agregar libro */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button className="text-lg">Agregar libro</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-h-[80vh] overflow-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-center">Agregar nuevo libro</AlertDialogTitle>
          </AlertDialogHeader>

          <div className="space-y-2">
            <Label>Título</Label>
            <Input value={form.title} onChange={e => handleChange('title', e.target.value)} />

            <Label>Descripción</Label>
            <Textarea value={form.description} onChange={e => handleChange('description', e.target.value)} />

            <Label>Año</Label>
            <Input type="number" value={form.anio} onChange={e => handleChange('anio', e.target.value)} />

            <Label>ISBN</Label>
            <Input value={form.isbn} onChange={e => handleChange('isbn', e.target.value)} />

            <Label>Imagen</Label>
            <DragAndDrop onFileDrop={file => {
                handleImage('image', file);  
            }} />

            <Label>Stock</Label>
            <Input type="number" value={form.stock} onChange={e => handleChange('stock', e.target.value)} />

            <Label>Exclusivo suscriptores</Label>
            <Select onValueChange={value => handleChange('subscriber_exclusive', value)} value={form.subscriber_exclusive}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Sí</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>

            <Label>Precio</Label>
            <Input type="number" value={form.price} onChange={e => handleChange('price', e.target.value)} />

            <Label>Autor</Label>
            <Select onValueChange={value => handleChange('authorId', value)} value={form.authorId}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar autor" />
              </SelectTrigger>
              <SelectContent>
                {authors.map(author => (
                  <SelectItem key={author.id} value={String(author.id)}>
                    {author.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setOpenAddAuthor(true)}
              className="mt-2"
            >
              + Agregar autor
            </Button>

            <Label>Categorías</Label>
            <div className="flex flex-col space-y-1 max-h-40 overflow-y-auto border rounded p-2">
              {genres.map(genre => (
                <label key={genre.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.genres.split(',').includes(genre.id.toString())}
                    onChange={(e) => {
                      const selectedGenres = form.genres ? form.genres.split(',') : [];
                      const isChecked = e.target.checked;

                      let updatedGenres = [];
                      if (isChecked) {
                        updatedGenres = [...selectedGenres, genre.id.toString()];
                      } else {
                        updatedGenres = selectedGenres.filter(g => g !== genre.id.toString());
                      }

                      handleChange('genres', updatedGenres.join(','));
                    }}
                  />
                  <span>{genre.name}</span>
                </label>
                
              ))}
              
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setOpenAddGenre(true)}
              className="mt-2"
            >
              + Agregar categoría
            </Button>
            
          </div>
              
          <AlertDialogFooter className="flex justify-end gap-2 mt-4">
            <Button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded">
              Guardar
            </Button>
            <AlertDialogCancel className="bg-black text-white px-4 py-2 rounded">
              Salir
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal pequeño para agregar autor */}
      <AlertDialog open={openAddAuthor} onOpenChange={setOpenAddAuthor}>
        <AlertDialogContent>
          <AddAuthorDialog onAdd={handleNewAuthor} onClose={() => setOpenAddAuthor(false)} />
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal pequeño para agregar categoría */}
      <AlertDialog open={openAddGenre} onOpenChange={setOpenAddGenre}>
        <AlertDialogContent>
          <AddGenreDialog onAdd={handleNewGenre} onClose={() => setOpenAddGenre(false)} />
        </AlertDialogContent>
        
      </AlertDialog>
      
    </>
  );
}






