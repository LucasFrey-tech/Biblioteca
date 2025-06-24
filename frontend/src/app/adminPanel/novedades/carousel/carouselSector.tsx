import { BaseApi } from "@/API/baseApi";
import { CarouselItemDTO } from "@/API/types/carousel.dto";
import React, { useEffect, useRef, useState } from "react";
import styles from './styles.module.css';
import { ChevronDown, ChevronUp } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import BookSelector from "../bookSelector";
import DragAndDrop from "@/components/pages/dropImage";

export default function CarouselSector(): React.JSX.Element {
    const [carouselItems, setCarouselItems] = useState<CarouselItemDTO[]>([]);
    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    const apiRef = useRef(new BaseApi());

    useEffect(() => {
        async function getCarouselItems() {
            const carouselItems = await apiRef.current.carousel.getAll();
            console.log(carouselItems)
            setCarouselItems(carouselItems);
            setLoading(false)
        }
        getCarouselItems()
    }, []);

    const onBookIdChange = (id: number, idBook: number) => {
        setCarouselItems(prev =>
            prev.map(br =>
                br.id === id ? { ...br, idBook: idBook } : br
            )
        );
        apiRef.current.bookRecomendations.update(id, { id: id, idBook: idBook, title: "" });
    }

    const handleImage = (id: number, field: string, value: File) => {
        setCarouselItems(prev =>
            prev.map(br =>
                br.id === id ? { ...br, image: value } : br
            )
        );
    };


    return (
        <div className={styles.bookCard}>
            <div className={styles.bookHeader} onClick={() => setOpen(!open)}>
                <span className={styles.bookName}>{"Novedades"}</span>
                {open ? <ChevronUp /> : <ChevronDown />}
            </div>
            {
                open ?
                    loading ?
                        <div>
                            loading...
                        </div>
                        :
                        <>{
                            carouselItems.map((br, idx) => (
                                <div key={br.id} id={`${idx}`}>
                                    <Label>{"Carousel item " + (br.id) + ":"}</Label>
                                    <BookSelector id={br.id} idBook={br.idBook} onBookIdChange={onBookIdChange} />
                                    <DragAndDrop onFileDrop={file => {
                                        handleImage(br.id,'image', file);
                                    }} />
                                </div>
                            ))
                        }</>
                    :
                    <></>
            }

        </div>
    )
}