import Styles from './styles.module.css';
import { useEffect, useRef, useState } from "react";
import { BaseApi } from "@/API/baseApi";
import { Genre } from "@/API/types/genre";
import BooksGenreScroller from "./bookGenreScroller";

export default function GenresBooks(): React.JSX.Element {
    const [genres, setGenres] = useState<Genre[]>([]);
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
                const resGenres = await apiRef.current?.genre.getAllPaginated(1, 100);
                setGenres(resGenres ? (resGenres as any).genres || resGenres.items || [] : []);
            } catch (error) {
                console.error('Error al obtener generos:', error);
                setGenres([]);
            }
        };

        fetchData();
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
                                <BooksGenreScroller key={genre.id} genreId={genre.id} name={genre.name} booksAmount={booksAmmount}/>
                            );
                        })
                }
            </div>
        </div>
    )
}