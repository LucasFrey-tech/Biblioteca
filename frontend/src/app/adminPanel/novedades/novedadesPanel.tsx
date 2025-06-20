import BooksRecomendationSector from "./bookRecomendation/booksRecomendationSector";
import CarouselSector from "./carousel/carouselSector";


export default function NovedadesPanel(): React.JSX.Element {
    return (
        <div className="novedades-panel">
            <CarouselSector/>
            <BooksRecomendationSector/>
        </div>
    );
}