export class LibraryBookDTO {
  constructor(
    id: number,
    title: string,
    author_id: number,
    description: string,
    isbn: string,
    image: string,
  ) {
    this.id = id;
    this.title = title;
    this.author_id = author_id;
    this.description = description;
    this.isbn = isbn;
    this.image = image;
  }
  
  id: number;
  title: string;
  author_id: number;
  description: string;
  isbn: string;
  image: string;
}