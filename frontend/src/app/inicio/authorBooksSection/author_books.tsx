import { Author } from "@/API/types/author";
import Styles from './styles.module.css';
import { useEffect, useRef, useState } from "react";
import { BaseApi } from "@/API/baseApi";
import AuthorBookScroller from "./authorBookScroller";

export default function AuthorBooks(): React.JSX.Element {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [booksAmmount] = useState<number>(20)
    
    const apiRef = useRef(new BaseApi());
    
    useEffect(() => {
        const fetchData = async () => {
            apiRef.current = new BaseApi();

            const token = localStorage.getItem('token');
            if (token) {
                apiRef.current = new BaseApi(token);
            }

            try {
                const resAuthors = await apiRef.current?.authors.getAllPaginated(1, 100);
                setAuthors(resAuthors ? (resAuthors as any).authors || resAuthors.items || [] : []);
            } catch (error) {
                console.error('Error al obtener datos:', error);
                setAuthors([]);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={Styles.genre_books}>
            <div className={Styles.title}>
                <h2>Novedades por Autor</h2>
                <hr></hr>
            </div>
            <div className={Styles.content}>
                {
                    authors.length <= 0 ? <div></div> :
                        authors.map((author) => {
                            return (
                                <AuthorBookScroller key={author.id} authorId={author.id} name={author.name} booksAmount={booksAmmount} />
                            );
                        })
                }
            </div>
        </div>
    )
}