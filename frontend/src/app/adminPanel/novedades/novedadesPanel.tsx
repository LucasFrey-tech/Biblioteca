import { BookRecommendationDTO } from "@/API/types/bookRecomendation.dto";
import { CarouselItemDTO } from "@/API/types/carousel.dto";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import BookSelector from "./bookSelector";
import RecomendedBookSelector from "./recomendedBookSelector";


export default function NovedadesPanel(): React.JSX.Element {
    const [CarouselItems, setCarouselItems] = useState<CarouselItemDTO[]>([
            { id: 1, idBook: 1, image: "Libro 1" },
            { id: 2, idBook: 2, image: "Libro 2" },
        ]);
    const [booksRecomendations, setBooksRecomendations] = useState<BookRecommendationDTO[]>([
            { idBook: 1, title: "Libro 1" },
            { idBook: 2, title: "Libro 2" },
            { idBook: 3, title: "Libro 3" },
            { idBook: 4, title: "Libro 4" },
            { idBook: 5, title: "Libro 5" },
            { idBook: 6, title: "Libro 6" },
            { idBook: 7, title: "Libro 7" },
            { idBook: 8, title: "Libro 8" },
        ]);

    useEffect(() => {
    }, []);


    function handleCarouselBookSelection(id:number, book: CarouselItemDTO): void {
        setCarouselItems(
            CarouselItems.map(ci => {
                if (ci.id === id) {
                    return { ...ci, idBook: book.idBook };
                }
                return ci;
            })
        )
    }
    function handleRecomendationBookSelection(id:number, book: BookRecommendationDTO): void {
        setBooksRecomendations(
            booksRecomendations.map(br => {
                if (br.idBook === id) {
                    return { ...br, idBook: book.idBook };
                }
                return br;
            })
        )
    }

    return (
        <div className="novedades-panel">
            <h2>Novedades</h2>
            {
                !CarouselItems || CarouselItems.length > 0 ?
                    <h3>Actualmente no hay novedades para mostrar...</h3> :
                    CarouselItems.map((ci,i) => (
                        console.log(CarouselItems),
                        <div key={ci.id} className="carousel-item">
                            <BookSelector/>
                            <img src={ci.image} />
                        </div>
                    ))
            }
            <Button
                size="sm"
                variant="outline"
                onClick={() => { }}
                className="mt-2"
            >
                + Agregar Novedad
            </Button>
            <h2>Recomendaciones</h2>
            <RecomendedBookSelector index={1}/>
            <RecomendedBookSelector index={2}/>
            <RecomendedBookSelector index={3}/>
            <RecomendedBookSelector index={4}/>
            <RecomendedBookSelector index={5}/>
            <RecomendedBookSelector index={6}/>
            <RecomendedBookSelector index={7}/>
            <RecomendedBookSelector index={8}/>
        </div>
    );
}