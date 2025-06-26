export interface CarouselItemDTO {
    id: number;
    idBook: number;
    image: File | string;
}

export interface CarouselCreateDTO {
    idBook: number;
    image: File;
}