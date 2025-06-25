import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BookDTO } from './book.dto';
import { Book } from '../../../entidades/book.entity';
import { SettingsService } from '../../../settings/settings.service';
import { CreateBookDTO } from './createBook.dto';
import { Genre } from '../../../entidades/genre.entity';
import { Author } from '../../../entidades/author.entity';

/**
 * Servicio que maneja la lógica de negocio para los libros.
 */
@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);
  constructor(
    private readonly settingsService: SettingsService,

    @InjectRepository(Book)
    private booksRepository: Repository<Book>,

    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) { }

  /**
   * Obtiene todos los libros disponibles.
   * 
   * @async
   * @returns {Promise<BookDTO[]>} Una promesa que resuelve con un arrelgo de DTOs de libros.
   * 
   */
  async findAll(): Promise<BookDTO[]> {
    const books = await this.booksRepository.find({ relations: ['genres', 'author'] });

    const result = books.map((book) => {
      return BookDTO.BookEntity2BookDTO(book);
    });

    this.logger.log('Lista de libros Recibidos');
    return result;
  }

  /**
   * Obtiene libros filtrados por un género específico.
   * 
   * @async
   * @param {number} genreId - El id del género a buscar.
   * @returns {Promise<BookDTO[]>} Una promesa que resuelve con el DTO de los libros con ese género encontrado.
   * 
   */
  async findAllWithGenre(genreId: number): Promise<BookDTO[]> {
    const books = await this.booksRepository.find({ relations: ['genres', 'author'] });
    const filteredBooks = books.filter(x => x.genres?.some(genre => genre.id === genreId));
    const result = filteredBooks.map((book) => {
      return BookDTO.BookEntity2BookDTO(book);
    });

    this.logger.log('Lista de libros Recibidos');
    return result;
  }


  /**
   * Obtiene libros filtrados por un autor específico.
   * 
   * @async
   * @param {number} authorId - El id del autor a buscar.
   * @returns {Promise<BookDTO[]>} Una promesa que resuelve con el DTO de los libros con ese autor encontrada.
   * 
   */
  async findAllByAuthor(authorId: number): Promise<BookDTO[]> {
    const books = await this.booksRepository.find({ relations: ['genres', 'author'] });
    const filteredBooks = books.filter(x => x.author?.id === authorId);
    const result = filteredBooks.map((book) => {
      return BookDTO.BookEntity2BookDTO(book);
    });

    this.logger.log('Lista de libros Recibidos');
    return result;
  }

  /**
   * Busca un libro específico por su ID.
   * 
   * @async
   * @param {number} id - El id del libro a buscar.
   * @returns {Promise<BookDTO | null>} Una promesa que resuelve con el DTO del libro encontrado.
   * @throws {NotFoundException} Si no encuenta ningún libro con el ID especificado.
   * 
   */
  async findOne(id: number): Promise<BookDTO | null> {
    const book = await this.booksRepository.findOne({ where: { id }, relations: ['genres', 'author'] });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`)
    }

    this.logger.log('Libro Recibido');
    return BookDTO.BookEntity2BookDTO(book);
  }

  /**
   * Crea un nuevo libro en el sistema con sus géneros asociados.
   * 
   * @async
   * @param {CreateBookDTO} bookDTO - Objeto de transferencia de datos con la información del libro a crear.
   * Debe incluir los IDs de géneros y el ID del autor.
   * @returns {Promise<Book>} Promesa que resuelve con la entidad del libro recién creado.
   * @throws {Error} Cuando alguno de los géneros proporcionados no existe en la base de datos.
   */
  async create(bookDTO: CreateBookDTO): Promise<Book> {
    this.logger.log('Libro Creado');

    // 1. Buscar las entidades de género por nombre (bookDTO.genre)
    const genres = await this.genreRepository.find({
      where: { id: In(bookDTO.genre) },
    });

    if (genres.length !== bookDTO.genre.length) {
      throw new Error('Algunos géneros no existen en la base de datos');
    }

    // 2. Crear la entidad de libro
    const book = this.booksRepository.create({
      ...bookDTO,
      genres,
      author: { id: bookDTO.author_id }
    });

    // 3. Guardar el libro
    const bookEntity = await this.booksRepository.save(book);
    return bookEntity;
  }

  /**
   * Actualiza un libro en el sistema.
   * 
   * @async
   * @param {number} id - ID del libro a actualizar
   * @param {CreateBookDTO} bookDTO - DTO con los nuevos datos para la recomendación.
   * Debe incluir los IDs de géneros y el ID del autor.
   * @returns {Promise<Book>} Promesa que resuelve con la entidad del libro actualizado.
   * @throws {Error} Cuando alguno de los géneros proporcionados no existe en la base de datos.
   */
  async update(id: number, bookDTO: CreateBookDTO) {
    // 1. Buscar el libro con relaciones
    const book = await this.booksRepository.findOne({ where: { id }, relations: ['genres'] });
    if (!book) return null;

    // 2. Buscar los géneros
    const genres = await this.genreRepository.find();


    // 3. Asignar los campos del DTO al libro
    book.title = bookDTO.title;
    book.description = bookDTO.description;
    book.anio = bookDTO.anio;
    book.isbn = bookDTO.isbn;
    if (bookDTO.image) {
      book.image = bookDTO.image;
    }
    book.stock = bookDTO.stock;
    book.subscriber_exclusive = bookDTO.subscriber_exclusive;
    book.price = bookDTO.price;
    book.author = { id: bookDTO.author_id } as Author;

    // Actualizar Generos:
    const newGenres = bookDTO.genre.filter(x => !book.genres?.some(g => g.id == x)) || [];
    const genresToRemove = book.genres?.filter(x => !bookDTO.genre.some(g => x.id == g)) || [];

    newGenres.forEach(ng => {
      const genreToAdd = genres.find(g => g.id == ng);
      if (genreToAdd) {
        book.genres?.push(genreToAdd);
      }
    })

    genresToRemove.forEach(dg => {
      const genreToRemoveIndex = book.genres?.findIndex(g => g.id == dg.id);
      if (genreToRemoveIndex !== undefined && genreToRemoveIndex > -1 && book.genres) {
        book.genres.splice(genreToRemoveIndex, 1);
      }
    })

    // 4. Guardar
    await this.booksRepository.save(book);

    this.logger.log('Libro Actualizado');
    return this.findOne(id);
  }

  /**
   * Elimina un libro específico de la base de datos.
   * 
   * @async
   * @param {number} id - ID del libro a eliminar
   * @returns {Promise<boolean>} Promesa que resuelve con:
   * - `true` si el libro existía y fue eliminado correctamente
   * - `false` si el libro no existía
   *
   */
  async delete(id: number): Promise<boolean> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['genres'],
    });

    if (!book) return false;

    await this.booksRepository.remove(book);

    return true;
  }

  /**
   * Genera la URL completa para acceder a la imagen de un libro.
   * 
   * @param {string} imageName - Nombre del archivo de imagen (sin ruta)
   * @returns {string} URL completa formada por:
   * - Host base del servicio
   * - Prefijo/ruta de imágenes de libros
   * - Nombre del archivo de imagen
   */
  bookImageUrl = (imageName: string): string => {
    return this.settingsService.getHostUrl() + this.settingsService.getBooksImagesPrefix() + "/" + imageName;
  }
}
