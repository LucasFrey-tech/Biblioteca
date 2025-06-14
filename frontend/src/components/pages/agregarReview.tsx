'use client';

import { useEffect, useState, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

import Swal from 'sweetalert2';

import { BaseApi } from "@/API/baseApi";
import { Review } from "@/API/types/review";

interface AddBookReviewProps {
  id_user:number;
  id_book:number;
}

export default function AddBookReview({id_user, id_book}: AddBookReviewProps): React.JSX.Element {
  const params = useParams();
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const apiRef = useRef<BaseApi | null>(null);

  const [form, setForm] = useState({
    comment: '',
    rating: 0,
  });

  useEffect(() => {
    if (!params || !params.id) {
      setError('ID del libro no proporcionado.');
      setLoading(false);
      return;
    }

    apiRef.current = new BaseApi(localStorage.getItem('token') || '');
    const bookId = Array.isArray(params.id) ? parseInt(params.id[0]) : parseInt(params.id);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.warn('No hay token en localStorage');
        } else {
          // Inicializar API
          const api = new BaseApi(token);
          apiRef.current = api;
        }

        //====================================

        //====================================



      } catch (error) {
        console.error('Error al cargar los datos', error);
        setError('Error al cargar los datos del libro.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  const handleChange = (field: string, value: string | number) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!apiRef.current) return;

    const newReview: Partial<Review> = {
      id_user: id_user,
      id_book: id_book,
      comment: form.comment,
      rating: Number(form.rating),
    };

    try {
      await apiRef.current.review.create(newReview);

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Reseña agregada correctamente',
        timer: 2000,
        showConfirmButton: false,
      });

      setOpen(false);
      setForm({
        comment: '',
        rating: 0,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar la reseña',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="text-lg">Agregar reseña</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-center">Agregar nueva reseña</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Comentario</Label>
            <Textarea
              value={form.comment}
              onChange={e => handleChange('comment', e.target.value)}
              placeholder="Escribe tu opinión sobre el libro..."
            />
          </div>

          <div className="space-y-2">
            <Label>Calificación</Label>
            <Select
              onValueChange={(value) => handleChange('rating', value)}
              value={form.rating.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una calificación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 ★</SelectItem>
                <SelectItem value="2">2 ★★</SelectItem>
                <SelectItem value="3">3 ★★★</SelectItem>
                <SelectItem value="4">4 ★★★★</SelectItem>
                <SelectItem value="5">5 ★★★★★</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <AlertDialogFooter className="flex justify-end gap-2 mt-4">
          <Button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Guardar
          </Button>
          <AlertDialogCancel className="bg-black text-white px-4 py-2 rounded">
            Salir
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}