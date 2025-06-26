import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import Swal from 'sweetalert2';

import { BaseApi } from '@/API/baseApi';
import { Genre } from '@/API/types/genre';

interface Props {
  onDelete: (id: number) => void;
  onClose: () => void;
}

export function DeleteGenreDialog({ onDelete, onClose }: Props) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const apiRef = useRef(new BaseApi(localStorage.getItem("token") || ""));

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const allGenres = await apiRef.current.genre.getAll();
        setGenres(allGenres);
      } catch (error) {
        console.error("Error al cargar categorías", error);
      }
    };

    fetchGenres();
  }, []);

  const handleDelete = async () => {
    if (!selectedGenreId) return;
    setLoading(true);

    try {
      await apiRef.current.genre.delete(Number(selectedGenreId));
      onDelete(Number(selectedGenreId));

      Swal.fire({
        icon: 'success',
        title: 'Categoría eliminada correctamente',
        timer: 2000,
        showConfirmButton: false,
      });

      onClose();
    } catch (error) {
      console.error("Error al eliminar la categoría", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar la categoría',
        timer: 2000,
        showConfirmButton: false,
      });
    }

    setLoading(false);
  };

  return (
    <div>
      <h3 className="mb-2 font-semibold text-lg">Eliminar categoría</h3>

      <Select value={selectedGenreId} onValueChange={setSelectedGenreId} disabled={loading}>
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar categoría a eliminar" />
        </SelectTrigger>
        <SelectContent>
          {genres.map(genre => (
            <SelectItem key={genre.id} value={String(genre.id)}>
              {genre.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="mt-3 flex justify-end gap-2">
        <Button onClick={onClose} disabled={loading} variant="secondary">Cancelar</Button>
        <Button onClick={handleDelete} disabled={loading || !selectedGenreId} variant="destructive">
          Eliminar
        </Button>
      </div>
    </div>
  );
}
