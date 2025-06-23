import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Swal from 'sweetalert2';

import { BaseApi } from '@/API/baseApi';
import { Genre } from '@/API/types/genre';


interface Props {
  onAdd: (genre: Genre) => void;
  onClose: () => void;
}

export function AddGenreDialog({ onAdd, onClose }: Props) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const apiRef = useRef(new BaseApi());

  const handleSubmit = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      const newGenre = await apiRef.current.genre.create({ name });
      onAdd(newGenre);
      setName('');
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Categoría agregada correctamente',
        timer: 2000,
        showConfirmButton: false,
      });
      onClose();
      setLoading(false);
    } catch (error) {
      console.error("Error al agregar la categoria", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al cargar categoría',
        timer: 2000,
        showConfirmButton: false,
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="mb-2 font-semibold text-lg">Agregar nueva categoría</h3>
      <Input
        placeholder="Nombre de la categoría"
        value={name}
        onChange={e => setName(e.target.value)}
        disabled={loading}
      />
      <div className="mt-3 flex justify-end gap-2">
        <Button onClick={onClose} disabled={loading} variant="secondary">Cancelar</Button>
        <Button onClick={handleSubmit} disabled={loading || !name.trim()}>Guardar</Button>
      </div>
    </div>
  );
}