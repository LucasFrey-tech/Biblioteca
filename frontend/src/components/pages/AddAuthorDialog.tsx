import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Swal from 'sweetalert2';

import { BaseApi } from '@/API/baseApi';
import { Author } from '@/API/types/author';

interface Props {
  onAdd: (author: Author) => void;
  onClose: () => void;
}

export function AddAuthorDialog({ onAdd, onClose }: Props) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  // Inicializamos correctamente apiRef
  const apiRef = useRef(new BaseApi());

  const handleSubmit = async () => {
    if (!name.trim()) return;
    setLoading(true);

    try {
      const newAuthor = await apiRef.current.authors.create({ name });
      onAdd(newAuthor);
      setName('');

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Autor agregado correctamente',
        timer: 2000,
        showConfirmButton: false,
      });

      onClose();
    } catch (error) {
      console.error("Error al agregar autor", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al cargar autor',
        timer: 2000,
        showConfirmButton: false,
      });
    }

    setLoading(false);
  };

  return (
    <div>
      <h3 className="mb-2 font-semibold text-lg">Agregar nuevo autor</h3>
      <Input
        placeholder="Nombre del autor"
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