import styles from './styles.module.css';
import BooksRecomendationSector from "./bookRecomendation/booksRecomendationSector";
import CarouselSector from "./carousel/carouselSector";

export default function NovedadesPanel(): React.JSX.Element {
    return (
        <div className={styles.bookCard}>
            <CarouselSector />
            <BooksRecomendationSector />
        </div>
    );
}
