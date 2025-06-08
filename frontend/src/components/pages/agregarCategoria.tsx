import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Swal from 'sweetalert2';

interface Genre {
  id: number;
  name: string;
}

interface Props {
  onAdd: (genre: Genre) => void;
  onClose: () => void;
}

export function AddGenreDialog({ onAdd, onClose }: Props) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/genres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        const newGenre: Genre = await res.json();
        onAdd(newGenre);
        setName('');
        onClose();
      } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al cargar categoría',
            timer: 2000,
            showConfirmButton: false,
        });
      }
    } catch {
      alert('Error al agregar categoría');
    }
    setLoading(false);
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


