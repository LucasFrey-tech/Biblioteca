'use client'

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChaptersSideBar } from "./chaptersSidebar";
import { BookContentDTO } from "@/API/types/bookContent.dto";
import ReturnButton from "@/components/ui/ReturnButton/buttonReturn";
import Styles from "./styles.module.css";
import { BaseApi } from "@/API/baseApi";
import router from "next/router";
import { jwtDecode } from "jwt-decode";

export default function ReadBook(){
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bookContent, setBookContent] = useState<BookContentDTO>({
        id: 1,
        idBook: 1,
        content: ""
    });
    
    const apiRef = useRef<BaseApi | null>(null);
    
    useEffect(() => {  
        // Verifica que el id del libro este en los parametros
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
                const token = localStorage.getItem('token');
                // Verifica que el usuario este logueado.
                if (!token) {
                    router.push('/login');
                    return;
                }
                apiRef.current = new BaseApi(token);
                const decodedToken = jwtDecode<{ sub: number}>(token); 

                // Verifica que el usuario tenga el libro.
                const resBooks = await apiRef.current?.libreria.findAllByUser(decodedToken.sub);
                if (!resBooks || !resBooks.some(book => book.id === bookId)) {
                    setError('No tienes acceso a este libro.');
                    setLoading(false);
                    return;
                }
                
                const dataBook = await apiRef.current?.bookContent.getOne(bookId);

                setBookContent(prevBookContent => dataBook ? dataBook : prevBookContent);
            } catch (error) {
                console.error('Error al cargar los datos', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params]);

    function getChaptersFromContent(content: string){
        if (!content) return [];
        const matches = [...content.matchAll(/<h1[^>]*>(.*?)<\/h1>/gi)];
        return matches.map(match => match[1].trim());
    }

    return(
        <div>
            {loading?
                <div>loading...</div>:
                error?
                    <div>{error}</div>:
                    <div className={Styles.container}>
                        {ReturnButton("http://localhost:3000/libreria","Regresar a Libreria")}
                        {
                            loading?<></>:
                            <div>
                            <ChaptersSideBar chapters={getChaptersFromContent(bookContent.content)} />
                                <div className={Styles.content}>
                                    <div dangerouslySetInnerHTML={{__html: bookContent?.content}}/>
                                </div>
                            </div>
                        }
                        {ReturnButton("http://localhost:3000/libreria","Regresar a Libreria")}
                    </div>
            }
        </div>
    )
}