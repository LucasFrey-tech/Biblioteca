import React, { useEffect, useRef, useState } from "react";
import BookSelector from "../bookSelector";
import { Label } from "@/components/ui/label";
import { BaseApi } from "@/API/baseApi";
import { BookRecommendationDTO } from "@/API/types/bookRecomendation.dto";

import styles from './panelAdmin.module.css';
import { ChevronDown, ChevronUp } from "lucide-react";

export default function BooksRecomendationSector(): React.JSX.Element {
    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [bookRecomendations, setBookRecomendations] = useState<BookRecommendationDTO[]>([])


    const apiRef = useRef(new BaseApi());

    useEffect(() => {
        async function getBookRecomendations() {
            const res = await apiRef.current.bookRecomendations.getAll();
            setBookRecomendations(res)
            setLoading(false)
        }
        getBookRecomendations()
    }, []);

    const onBookIdChange = (id: number, idBook: number) => {
        setBookRecomendations(prev =>
            prev.map(br =>
                br.id === id ? { id: id, idBook: idBook, title: br.title } : br
            )
        );
        apiRef.current.bookRecomendations.update(id, { id: id, idBook: idBook, title: "" });
    }

    return (
        <div className={styles.bookCard}>
            <div className={styles.bookHeader} onClick={() => setOpen(!open)}>
                <span className={styles.bookName}>{"Recomendaciones"}</span>
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
                            bookRecomendations.map((br, idx) => (
                                <div>
                                    <Label>{"Libro " + (br.id)}</Label>
                                    <BookSelector id={br.id} idBook={br.idBook} onBookIdChange={onBookIdChange} />
                                </div>
                            ))
                        }</>
                    :
                    <></>
            }

        </div>
    )
}