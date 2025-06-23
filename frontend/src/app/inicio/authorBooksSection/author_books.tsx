import { Author } from "@/API/types/author";
import Styles from './styles.module.css';
import { useEffect, useRef, useState } from "react";
import { BaseApi } from "@/API/baseApi";
import AuthorBookScroller from "./authorBookScroller";

export default function AuthorBooks(): React.JSX.Element {
    const [author, setAuthor] = useState<Author[]>([]);

    const apiRef = useRef(new BaseApi());

    useEffect(() => {
        async function getCarouselItems() {
            const authors = await apiRef.current.authors.getAll();
            setAuthor(authors);
        }
        getCarouselItems()
    }, []);

    return (
        <div className={Styles.genre_books}>
            <div className={Styles.title}>
                <h2>Novedades por Autor</h2>
                <hr></hr>
            </div>
            <div className={Styles.content}>
                {
                    author.length <= 0 ? <div></div> :
                        author.map((author) => {
                            return (
                                <AuthorBookScroller key={author.id} authorId={author.id} name={author.name} />
                            );
                        })
                }
            </div>
        </div>
    )
}