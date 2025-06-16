import { BookCardProps } from "../bookCard/bookCardColumnInfo/book_card_column_info";
import BooksScroller from "../booksScroller/books_scroller";
import Styles from './styles.module.css';

export default function GenresBooks(): React.JSX.Element {
    const LibrosRecientementeAgregados:BookCardProps[] = [
        {title: 'Libro 1', writer: "peep", img: 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/730489-86c50d1835ba98f89f17479370966828-1024-1024.jpg' },
        {title: 'Libro 2', writer: "peep", img: 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/730489-86c50d1835ba98f89f17479370966828-1024-1024.jpg' },
        {title: 'Libro 3', writer: "peep", img: 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/730489-86c50d1835ba98f89f17479370966828-1024-1024.jpg' },
        {title: 'Libro 4', writer: "peep", img: 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/730489-86c50d1835ba98f89f17479370966828-1024-1024.jpg' },
      ];

    return (
        <div className={Styles.genre_books}>
            <div className={Styles.title}>
                <h2>Novedades por Genero</h2>
                <hr></hr>
            </div>
            <div className={Styles.content}>
                <div className={Styles.content_item}>
                    <BooksScroller title='Libros de Accion' books={LibrosRecientementeAgregados}/>
                </div>
                <div className={Styles.content_item}>
                    <BooksScroller title='Libros de Accion' books={LibrosRecientementeAgregados}/>
                </div>
                <div className={Styles.content_item}>
                    <BooksScroller title='Libros de Accion' books={LibrosRecientementeAgregados}/>
                </div>
            </div>
        </div>
    )
}