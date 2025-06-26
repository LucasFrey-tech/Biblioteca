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
import { DeleteAuthorDialog } from './DeleteAuthorDialog';
import { DeleteGenreDialog } from './DeleteCategoria';
import DragAndDrop from './dropImage';
import { BaseApi } from '@/API/baseApi';
import { BookFile, BookFileUpdate } from '@/API/types/bookFile';
import { Genre } from '@/API/types/genre';
import { Author } from '@/API/types/author';
import DragAndDropFile from './dropFile';

export default function AddBookDialog({ onAuthorAdded, onGenreAdded, onBookCreated }: { onAuthorAdded?: (author: Author) => void, onGenreAdded?: (genre: Genre) => void, onBookCreated?: (book: BookFileUpdate) => void}) {
  const [open, setOpen] = useState(false);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [openAddAuthor, setOpenAddAuthor] = useState(false);
  const [openAddGenre, setOpenAddGenre] = useState(false);
  const [openDeleteAuthor, setOpenDeleteAuthor] = useState(false);
  const [openDeleteGenre, setOpenDeleteGenre] = useState(false);

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
    genres: '',
    content: null as File | null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorsData = await API.authors.getAll();
        setAuthors(authorsData);

        const genresData = await API.genre.getAll();
        setGenres(genresData);
      } catch (error) {
        console.error('Error al cargar los datos', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleImage = (field: string, value: File) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    const formGenresString = form.genres.split(',').map(g => g.trim()).filter(g => g !== '');
    const formGenresNumber = formGenresString.map(g => Number(g));
    const newBook: Partial<BookFile> = {
      title: form.title,
      description: form.description,
      anio: Number(form.anio),
      isbn: form.isbn,
      image: form.image ?? undefined,
      stock: Number(form.stock),
      subscriber_exclusive: form.subscriber_exclusive === 'true',
      price: Number(form.price),
      author_id: Number(form.authorId),
      content: form.content ?? undefined
    };

    try {
      const createdId = (await API.books.createBookFile(newBook, formGenresNumber)).id;
      const createdBook = await API.books.getOne(createdId);

      if (createdBook) {
        await API.bookContent.create({ idBook: createdBook.id, content: newBook.content });
      }
      
      if (onBookCreated) onBookCreated(createdBook); 
      setOpen(false);
      
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
        content: null
      });
    } catch (error) {
      console.error('Error al guardar el libro:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar el libro',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleNewAuthor = (author: Author) => {
    setAuthors(prev => [...prev, author]);
    setForm(prev => ({ ...prev, authorId: String(author.id) }));
    if (onAuthorAdded) onAuthorAdded(author);
    setOpenAddAuthor(false);
    Swal.fire({
      icon: 'success',
      title: 'Autor agregado',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleNewGenre = (genre: Genre) => {
    setGenres(prev => [...prev, genre]);
    if (onGenreAdded) onGenreAdded(genre);
    setForm(prevForm => {
      const currentGenres = prevForm.genres ? prevForm.genres.split(',') : [];
      const updatedGenres = [...currentGenres, String(genre.id)];
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

  const handleDeleteGenre = (deletedId: number) => {
    setGenres(prev => prev.filter(g => g.id !== deletedId));
    setForm(prevForm => {
      const updated = prevForm.genres
        .split(',')
        .filter(id => id !== String(deletedId))
        .join(',');
      return { ...prevForm, genres: updated };
    });
    Swal.fire({
      icon: 'success',
      title: 'Categoría eliminada',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleAuthorDeleted = (id: number) => {
    setAuthors(prev => prev.filter(author => author.id !== id));
    Swal.fire({
      icon: 'success',
      title: 'Autor eliminado',
      timer: 1500,
      showConfirmButton: false,
    });
  };

async function handleDragAndDropChange(bookId: number, file: File): Promise<void> {
          setForm(prev => ({
            ...prev,
            content: file
          }));
        }

  return (
    <>
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
            <DragAndDrop onFileDrop={file => handleImage('image', file)} />

            <label>Contenido:</label>
            <DragAndDropFile defaultFile={null} onSetCurrentFile={(x:File)=>handleDragAndDropChange(1,x)} validFormats={['.txt']} />

            <Label>Stock</Label>
            <Input type="number" value={form.stock} onChange={e => handleChange('stock', e.target.value)} />

            <Label>Exclusivo suscriptores</Label>
            <Select value={form.subscriber_exclusive} onValueChange={value => handleChange('subscriber_exclusive', value)}>
              <SelectTrigger>
                <SelectValue>{form.subscriber_exclusive === 'true' ? 'Sí' : 'No'}</SelectValue>
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

            <div className="flex gap-2 mt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setOpenAddAuthor(true)}
              >
                + Agregar autor
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setOpenDeleteAuthor(true)}
              >
                Eliminar autor
              </Button>
            </div>

            <AlertDialog open={openAddAuthor} onOpenChange={setOpenAddAuthor}>
              <AlertDialogContent>
                <AddAuthorDialog onAdd={handleNewAuthor} onClose={() => setOpenAddAuthor(false)} />
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={openDeleteAuthor} onOpenChange={setOpenDeleteAuthor}>
              <AlertDialogContent>
                <DeleteAuthorDialog onDelete={handleAuthorDeleted} onClose={() => setOpenDeleteAuthor(false)} />
              </AlertDialogContent>
            </AlertDialog>


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
                      const updatedGenres = isChecked
                        ? [...selectedGenres, genre.id.toString()]
                        : selectedGenres.filter(g => g !== genre.id.toString());
                      handleChange('genres', updatedGenres.join(','));
                    }}
                  />
                  <span>{genre.name}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <Button size="sm" variant="outline" onClick={() => setOpenAddGenre(true)}>+ Agregar categoría</Button>
              <Button size="sm" variant="destructive" onClick={() => setOpenDeleteGenre(true)}>Eliminar categoría</Button>
            </div>
          </div>

          <AlertDialogFooter className="flex justify-end gap-2 mt-4">
            <Button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded">Guardar</Button>
            <AlertDialogCancel className="bg-black text-white px-4 py-2 rounded">Salir</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={openAddAuthor} onOpenChange={setOpenAddAuthor}>
        <AlertDialogContent>
          <AddAuthorDialog onAdd={handleNewAuthor} onClose={() => setOpenAddAuthor(false)} />
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={openAddGenre} onOpenChange={setOpenAddGenre}>
        <AlertDialogContent>
          <AddGenreDialog onAdd={handleNewGenre} onClose={() => setOpenAddGenre(false)} />
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={openDeleteGenre} onOpenChange={setOpenDeleteGenre}>
        <AlertDialogContent>
          <DeleteGenreDialog onDelete={handleDeleteGenre} onClose={() => setOpenDeleteGenre(false)} />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
