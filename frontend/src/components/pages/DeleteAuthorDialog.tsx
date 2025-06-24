import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import Swal from 'sweetalert2';

import { BaseApi } from '@/API/baseApi';
import { Author } from '@/API/types/author';

interface Props {
  onDelete: (id: number) => void;
  onClose: () => void;
}

export function DeleteAuthorDialog({ onDelete, onClose }: Props) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const apiRef = useRef(new BaseApi(localStorage.getItem("token") || ""));

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const allAuthors = await apiRef.current.authors.getAll();
        setAuthors(allAuthors);
      } catch (error) {
        console.error("Error al cargar autores", error);
      }
    };

    fetchAuthors();
  }, []);

  const handleDelete = async () => {
    if (!selectedAuthorId) return;
    setLoading(true);

    try {
      await apiRef.current.authors.delete(Number(selectedAuthorId));
      onDelete(Number(selectedAuthorId));

      Swal.fire({
        icon: 'success',
        title: 'Autor eliminado correctamente',
        timer: 2000,
        showConfirmButton: false,
      });

      onClose();
    } catch (error) {
      console.error("Error al eliminar autor", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el autor',
        timer: 2000,
        showConfirmButton: false,
      });
    }

    setLoading(false);
  };

  return (
    <div>
      <h3 className="mb-2 font-semibold text-lg">Eliminar autor</h3>

      <Select value={selectedAuthorId} onValueChange={setSelectedAuthorId} disabled={loading}>
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar autor a eliminar" />
        </SelectTrigger>
        <SelectContent>
          {authors.map(author => (
            <SelectItem key={author.id} value={String(author.id)}>
              {author.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="mt-3 flex justify-end gap-2">
        <Button onClick={onClose} disabled={loading} variant="secondary">Cancelar</Button>
        <Button onClick={handleDelete} disabled={loading || !selectedAuthorId} variant="destructive">
          Eliminar
        </Button>
      </div>
    </div>
  );
}
