'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChaptersSideBar } from "./chaptersSidebar";
import { BookContent } from "./bookContent.dto";
import ReturnButton from "@/components/ui/ReturnButton/buttonReturn";
import Styles from "./styles.module.css";


export default function ReadBook(){
    const params = useParams();
    const [bookContent, setBookContent] = useState<BookContent>({
        id: 1,
        idBook: 1,
        content: ""
    });


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

    function getChaptersFromContent(content: String){
        if (!content) return [];
        const matches = [...content.matchAll(/<h1[^>]*>(.*?)<\/h1>/gi)];
        return matches.map(match => match[1].trim());
    }

    return(
        <div>
            {loading?<></>:
            <div className={Styles.container}>
                {ReturnButton("http://localhost:3000/libreria","Regresar a Libreria")}
                {
                    loading?<></>:
                    <div>
                        {ChaptersSideBar(getChaptersFromContent(bookContent.content))}
                        {bookContent?.content}
                    </div>
                }
                {ReturnButton("http://localhost:3000/libreria","Regresar a Libreria")}
            </div>
            }
        </div>
    )
}