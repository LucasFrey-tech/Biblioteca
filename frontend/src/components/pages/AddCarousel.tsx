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
import { Label } from "@/components/ui/label";
import Swal from 'sweetalert2';
import DragAndDrop from '@/components/pages/dropImage';
import { BaseApi } from '@/API/baseApi';
import { CarouselItemDTO } from "@/API/types/carousel.dto";
import BookSelector from '@/app/adminPanel/novedades/bookSelector';
import { resizeImage } from '@/lib/resizeImage';

export default function AddCarouselDialog({ onCarouselItemCreated }: {
    onCarouselItemCreated: (item: CarouselItemDTO) => void
}) {
    const [open, setOpen] = useState(false);
    const [API, setAPI] = useState<BaseApi | null>(null);
    
    const [form, setForm] = useState({
        idBook: 0,
        image: null as File | null,
    });

    const handleBookChange = (idBook: number) => {
        setForm({ ...form, idBook });
    };

    const handleImage = async (field: string, file: File) => {
        try {
            const resized = await resizeImage(file, 300, 400);
            setForm({ ...form, [field]: resized });
        } catch (error) {
            console.error("Error al redimensionar la imagen:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo procesar la imagen seleccionada',
                timer: 2000,
                showConfirmButton: false,
            });
        }
    };

    useEffect(() => {
        setAPI(new BaseApi(localStorage.getItem('token') || ''));
    }, []);

    const handleSubmit = async () => {
        if (!API) return;
        
        if (!form.idBook || !form.image) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor seleccione un libro y una imagen',
                timer: 2000,
                showConfirmButton: false,
            });
            return;
        }

        try {
            const newCarousel: Partial<CarouselItemDTO> = {
                idBook: form.idBook,
                image: form.image,
            };

            const newItem = await API.carousel.create(newCarousel);

            onCarouselItemCreated(newItem);

            setOpen(false);
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Item agregado al carrusel',
                timer: 2000,
                showConfirmButton: false,
            });

            setForm({
                idBook: 0,
                image: null,
            });
        } catch (error) {
            console.error('Error al agregar item:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo agregar el item al carrusel. Verifique los datos e intente nuevamente.',
                timer: 2000,
                showConfirmButton: false,
            });
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button className="mb-4">+ Agregar item al carrusel</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Agregar nuevo item al carrusel</AlertDialogTitle>
                </AlertDialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label>Libro *</Label>
                        <BookSelector
                            id={0}
                            idBook={form.idBook}
                            onBookIdChange={(_, idBook) => handleBookChange(idBook)}
                        />
                    </div>

                    <div>
                        <Label>Imagen *</Label>
                        <DragAndDrop onFileDrop={file => handleImage('image', file)} />
                    </div>
                </div>

                <AlertDialogFooter className="flex justify-end gap-2 mt-4">
                    <Button onClick={handleSubmit}>Guardar</Button>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}