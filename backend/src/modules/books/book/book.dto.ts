import * as fs from 'fs';
import mime from 'mime';
import * as path from 'path';
import { Book } from 'src/entidades/book.entity';
import { Genre } from 'src/entidades/genre.entity';

export class BookDTO {
  constructor(
    id: number,
    title: string,
    author: string,
    author_id: number,
    description: string,
    genre: string[],
    anio: number,
    isbn: string,
    image: string,
    stock: number,
    subscriber_exclusive: boolean,
    price: number,
  ) { this.id = id, this.title = title, this.author = author, this.author_id = author_id, this.description = description, this.genre = genre, this.anio = anio, this.isbn = isbn, this.image = image, this.stock = stock, this.subscriber_exclusive = subscriber_exclusive, this.price = price }
  id: number;
  title: string;
  author: string;
  author_id: number;
  description: string;
  genre: string[];
  anio: number;
  isbn: string;
  image: string;
  stock: number;
  subscriber_exclusive: boolean;
  price: number;

  static BookDTO2Book(bookDTO: BookDTO): Book {
    return {
      id: bookDTO.id,
      title: bookDTO.title,
      author_id: bookDTO.author_id,
      description: bookDTO.description,
      anio: bookDTO.anio,
      isbn: bookDTO.isbn,
      image: bookDTO.image, 
      stock: bookDTO.stock,
      subscriber_exclusive: bookDTO.subscriber_exclusive,
      price: bookDTO.price,
    };
  }

  static Book2BookDTO(book: Book,author:string, genres:string[]): BookDTO {
    return {
      id: book.id,
      title: book.title,
      author: author,
      author_id: book.author_id,
      description: book.description,
      genre: genres,
      anio: book.anio,
      isbn: book.isbn,
      image: book.image,
      stock: book.stock,
      subscriber_exclusive: book.subscriber_exclusive, 
      price: book.price,
    };
  }

  static getImageFileFromPath(filePath:string):Express.Multer.File {
    const stats = fs.statSync(filePath);
    let imageFile = {
          fieldname: 'image',
          originalname: path.basename(filePath),
          encoding: '7bit',
          mimetype: mime.lookup(filePath) || 'application/octet-stream', 
          size: stats.size,
          destination: path.dirname(filePath),
          filename: path.basename(filePath),
          path: filePath,
          buffer: fs.readFileSync(filePath),
          stream: fs.createReadStream(filePath),
        } as Express.Multer.File;
    return imageFile;
  }
};