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

export default function AddBookDialog() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    anio: '',
    isbn: '',
    image: '',
    stock: '',
    subscriber_exclusive: 'false',
    price: '',
    authorId: '',
  });

  useEffect(() => {
    fetch('http://localhost:3001/authors')
      .then(res => res.json())
      .then(data => setAuthors(data));
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:3001/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        author: Number(form.authorId),
        subscriber_exclusive: form.subscriber_exclusive === 'true',
        anio: Number(form.anio),
        stock: Number(form.stock),
        price: Number(form.price),
      }),
    });

    if (response.ok) {
      alert('Libro agregado correctamente');
      // Actualizar la lista
    }
  };
  interface Author {
  id: number;
  name: string;
}

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-lg">Agregar libro</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Agregar nuevo libro</AlertDialogTitle>
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
          <Input value={form.image} onChange={e => handleChange('image', e.target.value)} />

          <Label>Stock</Label>
          <Input type="number" value={form.stock} onChange={e => handleChange('stock', e.target.value)} />

          <Label>Exclusivo suscriptores</Label>
          <Select onValueChange={value => handleChange('subscriber_exclusive', value)} defaultValue="false">
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
          <Select onValueChange={value => handleChange('authorId', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar autor" />
            </SelectTrigger>
            <SelectContent>
              {authors.map((author) => (
                <SelectItem key={author.id} value={String(author.id)}>
                  {author.name} 
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
          <div className="flex gap-4 justify-center">
          <AlertDialogFooter>
          <Button className="bg-black text-white px-4 py-2 rounded" onClick={handleSubmit}>Guardar</Button>
          </AlertDialogFooter>
          <AlertDialogFooter>
          <AlertDialogCancel className="bg-black text-white px-4 py-2 rounded">Salir</AlertDialogCancel>
          </AlertDialogFooter>
          </div>    

      </AlertDialogContent>
    </AlertDialog>
  );
}
