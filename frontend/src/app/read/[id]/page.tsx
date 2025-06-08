'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChaptersSideBar } from "./chaptersSidebar";
import ReturnButton from "@/components/ui/ReturnButton/buttonReturn";
import Styles from "./styles.module.css";
import { BookContent } from "./bookContent.dto";


export default function ReadBook(){
    const params = useParams();
    const [bookContent, setBookContent] = useState<BookContent>();


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
            if (!params || !params.id) {
                setError('ID del libro no proporcionado.');
                setLoading(false);
                return;
            }
    
            const bookId = Array.isArray(params.id) ? parseInt(params.id[0]) : parseInt(params.id);
    
            if (isNaN(bookId)) {
                setError('ID del libro inválido.');
                setLoading(false);
                return;
            }
    
    
            const fetchData = async () => {
                try {
                    const resBook = await fetch(`http://localhost:3001/books/book/content/${bookId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const dataBook = await resBook.json();
    
                    setBookContent(dataBook);
                } catch (error) {
                    console.error('Error al cargar los datos', error);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchData();
        }, [params]);

    return(
        <div className={Styles.container}>
            {ReturnButton("http://localhost:3000/libreria","Regresar a Libreria")}
            {
                loading?<></>:
                <div>
                    {ChaptersSideBar(["Capitulo 1", "Capítulo 2", "Capítulo 3"])}
                    {bookContent?.content}
                </div>
            }
            {ReturnButton("http://localhost:3000/libreria","Regresar a Libreria")}
        </div>
    )
}