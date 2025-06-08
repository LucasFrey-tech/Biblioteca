'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";



type BookContent = {
    id: number;
    idBook: number;
    content: string;
}


export default function ReadBook(){
    const params = useParams();
    const [bookContent, setBookContent] = useState<BookContent>();


    const [loading, setLoading] = useState(true);
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
                    const resBook = await fetch(`http://localhost:3001/books/${bookId}`, {
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
        <>
            {
                loading?<></>:
                <p>{bookContent?.content}</p>
            }
        </>
    )
}