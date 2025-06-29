import { useEffect, useRef, useState } from "react";
import { BaseApi } from "@/API/baseApi";
import Styles from './styles.module.css';
import AuthorBookScroller from "./authorBookScroller";
import { Author } from "@/API/types/author";

export default function AuthorBooks(): React.JSX.Element {
    const [authors, setAuthors] = useState<Author[]>([]);
    const apiRef = useRef(new BaseApi());

    useEffect(() => {
        async function fetchAuthors() {
            try {
                const res = await apiRef.current.authors.getAllPaginated(1, 100);
                setAuthors(res.items);
            } catch (error) {
                console.error("Error al obtener autores:", error);
                setAuthors([]);
            }
        }
        fetchAuthors();
    }, []);

    return (
        <div className={Styles.genre_books}>
            <div className={Styles.title}>
                <h2>Novedades por Autor</h2>
                <hr />
            </div>
            <div className={Styles.content}>
                {authors.length === 0 ? (
                    <div>No hay autores para mostrar.</div>
                ) : (
                    authors.map(author => (
                        <AuthorBookScroller
                            key={author.id}
                            authorId={author.id}
                            name={author.name}
                            booksAmount={20} // Ajustá cantidad si querés
                        />
                    ))
                )}
            </div>
        </div>
    );
}
