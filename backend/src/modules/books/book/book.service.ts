import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookDTO } from './book.dto';
import { Book } from '../../../entidades/book.entity';
import { Author } from 'src/entidades/author.entity';
import { Genre } from 'src/entidades/genre.entity';
import { BookGenre } from 'src/entidades/book_genres.entity';
import { SettingsService } from 'src/settings.service';

@Injectable()
export class BooksService {
  constructor(
    private readonly settingsService: SettingsService,

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
    
    console.log(books);
    const result = books.map((book) => {
      const idAuthor = book.author_id;
      const author = authors.find((element) => element.id === idAuthor);


      const filteredBookGenres = booksGenres.filter((bg) => { return bg.idBook == book.id });

      const filteredGenres = genres.filter((g) => filteredBookGenres.some((fbg) => fbg.idBook == g.id));

      const bookGenres = filteredGenres.map((fbg) => fbg.name);
      return BookDTO.Book2BookDTO(book, author ? author.name : "", bookGenres); 
    });

    return result;
  }

  async findOne(id: number): Promise<BookDTO | null> {
    const book = await this.booksRepository.findOne({ where: { id } });
    // console.log("hola 1 ",book)
    
    if (!book) return null;

    // console.log("hola 3 ",book)

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

    return BookDTO.Book2BookDTO(book, author ? author.name : "", genres);
  }

  create(bookDTO: BookDTO) {
    const book = BookDTO.BookDTO2Book(bookDTO);    
    return this.booksRepository.save(book);
  }

  async update(id: number, bookDTO: BookDTO) {
    const updateData = BookDTO.BookDTO2Book(bookDTO);
    await this.booksRepository.update(id, updateData);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.booksRepository.delete(id);
  }
  
  bookImageUrl = (imageName:string):string=>{
    return this.settingsService.getHostUrl()+this.settingsService.getBooksImagesPrefix()+"/"+imageName;
  }
}
