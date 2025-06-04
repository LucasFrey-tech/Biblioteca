import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookDTO } from './book.dto';
import { Book } from '../../../entidades/book.entity';
import { Author } from 'src/entidades/author.entity';
import { Genre } from 'src/entidades/genre.entity';
import { BookGenre } from 'src/entidades/book_genres.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,

    @InjectRepository(Author)
    private authorRepository: Repository<Author>,

    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,

    @InjectRepository(BookGenre)
    private bookGenreRepository: Repository<BookGenre>,
  ) { }

  async findAll(): Promise<BookDTO[]> {
    const books = await this.booksRepository.find();
    const authors = await this.authorRepository.find();
    const genres = await this.genreRepository.find();
    const booksGenres = await this.bookGenreRepository.find();

    const result = books.map((b) => {
      const idAuthor = b.author_id;
      const author = authors.find((element) => element.id === idAuthor);


      const filteredBookGenres = booksGenres.filter((bg) => { return bg.idBook == b.id });

      const filteredGenres = genres.filter((g) => filteredBookGenres.some((fb) => fb.idBook == g.id));

      const bookGenres = filteredGenres.map((fbg) => fbg.name);
      return new BookDTO(
        b.id,
        b.title,
        author ? author.name : "",
        b.author_id,
        b.description,
        bookGenres,
        b.anio,
        b.isbn,
        b.image,
        b.stock,
        b.subscriber_exclusive,
        b.price,
      );
    });

    return result;
  }

  async findOne(id: number): Promise<BookDTO | null> {
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) return null;

    const author = await this.authorRepository.findOne({ where: { id: book.author_id } });

    const bookGenresRelations = await this.bookGenreRepository.find({
      where: { idBook: book.id },
    });

    const genreIds = bookGenresRelations.map((rel) => rel.idGenre);

    let genres: string[] = [];
    if (genreIds.length > 0) {
      const genreEntities = await this.genreRepository.findByIds(genreIds);
      genres = genreEntities.map((g) => g.name);
    }

    return new BookDTO(
      book.id,
      book.title,
      author ? author.name : "",
      book.author_id,
      book.description,
      genres,
      book.anio,
      book.isbn,
      book.image,
      book.stock,
      book.subscriber_exclusive,
      book.price
    );
  }

  create(book: Partial<Book>) {
    return this.booksRepository.save(book);
  }

  async update(id: number, updateData: Partial<Book>) {
    await this.booksRepository.update(id, updateData);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.booksRepository.delete(id);
  }
}

//form multipart!!
/**
 * upload archivos en NextJS y NestJS y unirlos
 */