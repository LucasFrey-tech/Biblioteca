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

export default function CarouselPanel(): React.JSX.Element {
    const [carouselItems, setCarouselItems] = useState<CarouselItemDTO[]>([]);
    const [itemOpenIds, setItemOpenIds] = useState<number[]>([]);
    const [search, setSearch] = useState('');
    const apiRef = useRef(new BaseApi());
    const [tempImages, setTempImages] = useState<{ [key: number]: File | null }>({});
    const [editState, setEditState] = useState<{
        [key: number]: {
            editMode: boolean;
            formData: CarouselItemDTO;
			tempImages?: File;
        };
    }>({});
    const [loading, setLoading] = useState(true);

    const startEdit = (item: CarouselItemDTO) => {
        setEditState(prev => ({
            ...prev,
			tempImages: undefined,
            [item.id]: {
                editMode: true,
                formData: { ...item }
            }
        }));
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

    const handleItemChange = (itemId: number, field: string, value: string | number) => {
        setEditState(prev => {
            const itemState = prev[itemId];
            if (!itemState) return prev;
            return {
                ...prev,
                [itemId]: {
                    ...itemState,
                    formData: {
                        ...itemState.formData,
                        [field]: value
                    }
                }
            };
        });
    };

    const saveChanges = async (itemId: number) => {
        const itemState = editState[itemId];
        if (!itemState) {
            Swal.fire("Error", "No hay estado de edición", "error");
            return;
        }
		
		const imageToSend = tempImages[itemId] ?? itemState.formData.image;
        try {
            // Preparar los datos exactamente como los espera tu API
            const updateData: Partial<CarouselItemDTO> = {
                idBook: itemState.formData.idBook
            };

            // Solo incluir la imagen si hay una nueva
            if (tempImages[itemId]) {
                updateData.image = tempImages[itemId] as File;
            } else {
                // Mantener referencia a la imagen existente
                updateData.image = itemState.formData.image;
            }

            // Debug: Verificar datos antes de enviar
            console.log('Datos a enviar:', {
                idBook: updateData.idBook,
                image: updateData.image instanceof File ? 'Nueva imagen' : 'Imagen existente'
            });

            // Enviar directamente el objeto como lo hace tu API
            const updatedItem = await apiRef.current.carousel.update(itemId, 
				{
					...editState,
					image: imageToSend
				}
			);

            // Actualizar estado
            setCarouselItems(prev => prev.map(item =>
                item.id === itemId ? updatedItem : item
            ));

            setEditState(prev => ({
                ...prev,
                [itemId]: { ...prev[itemId], editMode: false, tempImages: undefined }
            }));

            setTempImages(prev => {
                const newTemp = { ...prev };
                delete newTemp[itemId];
                return newTemp;
            });

            Swal.fire("Éxito", "Cambios guardados", "success");
        } catch (error) {
            console.error('Error detallado:', error);
            Swal.fire("Error", "No se pudo guardar", "error");
        }
    };

    const cancelEdit = (itemId: number) => {
        setEditState(prev => ({
            ...prev,
            [itemId]: { ...prev[itemId], editMode: false }
        }));
        setTempImages(prev => {
            const copy = { ...prev };
            delete copy[itemId];
            return copy;
        });
    };

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

    const toggleItemOpen = (id: number) => {
        setItemOpenIds(prev =>
            prev.includes(id) ? prev.filter(iid => iid !== id) : [...prev, id]
        );
    };

    const handleNewCarouselItem = (newItem: CarouselItemDTO) => {
        setCarouselItems(prev => [newItem, ...prev]);
    };

    const getImageUrl = (item: CarouselItemDTO, tempImage: File | null | undefined) => {
        if (tempImage) {
            return URL.createObjectURL(tempImage);
        }
        if (typeof item.image === 'string' && item.image) {
            return item.image;
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
                        const itemState = editState[item.id] || {
                            editMode: false,
                            formData: { ...item }
                        };
                        const tempImage = tempImages[item.id];
                        const imageUrl = getImageUrl(item, tempImage || undefined);

                        return (
                            <div key={item.id} className={styles.bookCard}>
                                <div className={styles.bookHeader} onClick={() => toggleItemOpen(item.id)}>
                                    <span className={styles.bookName}>Item #{item.id}</span>
                                    {itemOpenIds.includes(item.id) ? <ChevronUp /> : <ChevronDown />}
                                </div>

                                {itemOpenIds.includes(item.id) && (
                                    <div className={styles.bookDetails}>
                                        {itemState.editMode ? (
                                            <>
                                                <Label>Libro asociado:</Label>
                                                <BookSelector
                                                    id={item.id}
                                                    idBook={itemState.formData.idBook}
                                                    onBookIdChange={(id, idBook) => handleItemChange(id, 'idBook', idBook)}
                                                />

                                                <Label>Imagen:</Label>
                                                <Image
                                                    src={imageUrl}
                                                    alt="Imagen del carrusel"
                                                    width={300}
                                                    height={150}
                                                    unoptimized
                                                    onLoad={() => {
                                                        if (tempImage) {
                                                            URL.revokeObjectURL(imageUrl);
                                                        }
                                                    }}
                                                />

                                                <DragAndDrop onFileDrop={file => {
                                                    setTempImages(prev => ({ ...prev, [item.id]: file }));
                                                }} />

                                                <div className={styles.editButtons}>
                                                    <Button
                                                        className={styles.botonEditar}
                                                        onClick={() => saveChanges(item.id)}
                                                    >
                                                        Guardar
                                                    </Button>
                                                    <Button
                                                        className={styles.botonEditar}
                                                        onClick={() => cancelEdit(item.id)}
                                                    >
                                                        Cancelar
                                                    </Button>
                                                </div>
                                            </>
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