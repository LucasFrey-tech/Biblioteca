import Styles from './styles.module.css';
import { useEffect, useRef, useState } from "react";
import { BaseApi } from "@/API/baseApi";
import { Genre } from "@/API/types/genre";
import BooksGenreScroller from "./bookGenreScroller";

export default function GenresBooks(): React.JSX.Element {
    const [genres, setGenres] = useState<Genre[]>([]);

    const apiRef = useRef(new BaseApi());

    useEffect(() => {
        async function getCarouselItems() {
            const genres = await apiRef.current.genre.getAll();
            setGenres(genres);
        }
        getCarouselItems()
    }, []);

    return (
        <div className={Styles.genre_books}>
            <div className={Styles.title}>
                <h2>Novedades por Genero</h2>
                <hr></hr>
            </div>
            <div className={Styles.content}>
                {
                    genres.length <= 0 ? <div></div> :
                        genres.map((genre) => {
                            return (
                                <BooksGenreScroller key={genre.id} genreId={genre.id} name={genre.name}/>
                            );
                        })
                }
            </div>
        </div>
    )
}