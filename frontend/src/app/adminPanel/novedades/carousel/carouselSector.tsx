'use client';

import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DragAndDrop from "@/components/pages/dropImage";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from '../../../../styles/panelAdmin.module.css';
import { BaseApi } from "@/API/baseApi";
import { CarouselItemDTO } from '@/API/types/carousel.dto';
import BookSelector from '../bookSelector';
import AddCarouselDialog from "@/components/pages/AddCarousel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { carouselSchema, CarouselType } from "@/validations/carouselSchema";

export default function CarouselPanel(): React.JSX.Element {
    const [carouselItems, setCarouselItems] = useState<CarouselItemDTO[]>([]);
    const [itemOpenIds, setItemOpenIds] = useState<number[]>([]);
    const [search, setSearch] = useState('');
    const [editItemId, setEditItemId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const apiRef = useRef(new BaseApi());

    const form = useForm<CarouselType>({
        resolver: zodResolver(carouselSchema),
        defaultValues: {
            idBook: 0,
            image: undefined,
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const itemsData = await apiRef.current.carousel.getAll();
                setCarouselItems(itemsData);
            } catch (error) {
                console.error("Error al obtener datos:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar los items del carrusel',
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const startEdit = (item: CarouselItemDTO) => {
        setEditItemId(item.id);
        form.reset({
            idBook: item.idBook,
            image: item.image,
        });
    };

    const cancelEdit = () => {
        setEditItemId(null);
        form.reset();
    };

    const eliminarItem = async (itemId: number) => {
        if (!itemId) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se ha especificado el item a borrar',
            });
            return;
        }

        const confirmResult = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, borrar item',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        });

        if (confirmResult.isConfirmed) {
            try {
                await apiRef.current.carousel.delete(itemId);
                Swal.fire({
                    icon: 'success',
                    title: 'Item borrado',
                    timer: 1500,
                    showConfirmButton: false,
                });
                setCarouselItems(prev => prev.filter(item => item.id !== itemId));
            } catch (error) {
                console.error('Error al borrar item:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo borrar el item',
                });
            }
        }
    };

    const saveChanges = async (itemId: number) => {
        if (!form.formState.isValid) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, corrige los errores en el formulario',
            });
            return;
        }

        try {
            const values = form.getValues();
            const updateData: Partial<CarouselItemDTO> = {
                idBook: values.idBook,
                image: values.image instanceof File ? values.image : values.image || undefined,
            };

            const updatedItem = await apiRef.current.carousel.update(itemId, updateData);

            setCarouselItems(prev => prev.map(item =>
                item.id === itemId ? updatedItem : item
            ));

            setEditItemId(null);
            form.reset();
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Cambios guardados',
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error('Error al guardar cambios:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo guardar el item',
            });
        }
    };

    const toggleItemOpen = (id: number) => {
        setItemOpenIds(prev =>
            prev.includes(id) ? prev.filter(iid => iid !== id) : [...prev, id]
        );
    };

    const handleNewCarouselItem = (newItem: CarouselItemDTO) => {
        setCarouselItems(prev => [newItem, ...prev]);
    };

    const getImageUrl = (item: CarouselItemDTO, tempImage: File | string | undefined) => {
        if (tempImage instanceof File) {
            return URL.createObjectURL(tempImage);
        }
        if (typeof tempImage === 'string' && tempImage) {
            return tempImage;
        }
        return '/libros/placeholder.png';
    };

    return (
        <>
            <Input
                placeholder="Buscar item (por ID)"
                className={styles.inputSearch}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="p-4">
                <AddCarouselDialog onCarouselItemCreated={handleNewCarouselItem} />
            </div>

            {loading ? (
                <div className="text-center py-8">Cargando...</div>
            ) : (
                carouselItems
                    .filter(item => item?.id?.toString()?.toLowerCase()?.includes(search.toLowerCase()))
                    .sort((a, b) => (b?.id || 0) - (a?.id || 0))
                    .map((item) => {
                        const isEditing = editItemId === item.id;
                        const imageUrl = getImageUrl(item, isEditing ? form.getValues('image') : item.image);

                        return (
                            <div key={item.id} className={styles.bookCard}>
                                <div className={styles.bookHeader} onClick={() => toggleItemOpen(item.id)}>
                                    <span className={styles.bookName}>Item #{item.id}</span>
                                    {itemOpenIds.includes(item.id) ? <ChevronUp /> : <ChevronDown />}
                                </div>

                                {itemOpenIds.includes(item.id) && (
                                    <div className={styles.bookDetails}>
                                        {isEditing ? (
                                            <Form {...form}>
                                                <form id={`carousel-form-${item.id}`} onSubmit={(e) => { e.preventDefault(); saveChanges(item.id); }}>
                                                    <FormField
                                                        control={form.control}
                                                        name="idBook"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Libro asociado:</FormLabel>
                                                                <FormControl>
                                                                    <BookSelector
                                                                        id={item.id}
                                                                        idBook={field.value}
                                                                        onBookIdChange={(id, idBook) => field.onChange(idBook)}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="image"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Imagen:</FormLabel>
                                                                <FormControl>
                                                                    <div className="flex flex-col gap-2"> {/* Replaced Fragment with div */}
                                                                        <Image
                                                                            src={imageUrl}
                                                                            alt="Imagen del carrusel"
                                                                            width={300}
                                                                            height={150}
                                                                            unoptimized
                                                                            onLoad={() => {
                                                                                if (field.value instanceof File) {
                                                                                    URL.revokeObjectURL(imageUrl);
                                                                                }
                                                                            }}
                                                                        />
                                                                        <DragAndDrop
                                                                            onFileDrop={(file) => field.onChange(file)}
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <div className={styles.editButtons}>
                                                        <Button
                                                            type="submit"
                                                            className={styles.botonEditar}
                                                            disabled={form.formState.isSubmitting}
                                                        >
                                                            Guardar
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            className={styles.botonEditar}
                                                            onClick={() => cancelEdit()}
                                                            disabled={form.formState.isSubmitting}
                                                        >
                                                            Cancelar
                                                        </Button>
                                                    </div>
                                                </form>
                                            </Form>
                                        ) : (
                                            <>
                                                <p><strong>ID Libro:</strong> {item.idBook}</p>
                                                <div className="flex gap-2">
                                                    <Button
                                                        onClick={() => startEdit(item)}
                                                        className="flex-1 bg-blue-600 text-white"
                                                    >
                                                        Editar ✏️
                                                    </Button>
                                                    <Button
                                                        onClick={() => eliminarItem(item.id)}
                                                        className="flex-1 bg-red-600 text-white"
                                                    >
                                                        Borrar
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })
            )}
        </>
    );
}