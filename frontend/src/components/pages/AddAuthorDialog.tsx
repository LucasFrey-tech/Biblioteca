import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Swal from 'sweetalert2';

interface Author {
  id: number;
  name: string;
}

interface Props {
  onAdd: (author: Author) => void;
  onClose: () => void;
}

export function AddAuthorDialog({ onAdd, onClose }: Props) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/authors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        const newAuthor: Author = await res.json();
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
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar autor',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch {
      alert('Error al agregar autor');
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
