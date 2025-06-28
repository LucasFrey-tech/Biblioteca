import { CarouselDTO } from "../../../src/modules/recomendations/carousel/dto/carousel.dto"


export const mockDtoCarouselItem1: CarouselDTO = {
    id: 1,
    idBook: 1,
    image: "http://localhost:3001/books_images/1984.png"
}
export const mockDtoCarouselItem2: CarouselDTO = {
    id: 2,
    idBook: 2,
    image: "http://localhost:3001/books_images/rebelion_en_la_granja.png"
}
export const mockDtoCarouselItem3: CarouselDTO = {
    id: 3,
    idBook: 3,
    image: "http://localhost:3001/books_images/el_codigo_davinci.png"
}
export const mockDtoCarouselItem4: CarouselDTO = {
    id: 4,
    idBook: 4,
    image: "http://localhost:3001/books_images/ab_dioses_y_monstruos.png"
}

export const mockDtoCarouselItems = [mockDtoCarouselItem1,mockDtoCarouselItem2,mockDtoCarouselItem3,mockDtoCarouselItem4]