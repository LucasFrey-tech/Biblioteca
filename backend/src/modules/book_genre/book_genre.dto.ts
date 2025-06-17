export class BookGenreDto {
    constructor(
        id_book: number,
        name: string,
    ) {
        this.id_book = id_book,
        this.name = name
    }
    id_book: number;
    name: string;
}