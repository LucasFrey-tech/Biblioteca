import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BookDTO } from './dto/book.dto';
import { Book } from '../../../entidades/book.entity';
import { SettingsService } from '../../../settings/settings.service';
import { CreateBookDTO } from './dto/createBook.dto';
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
   * @returns {Promise<BookDTO[]>} Una promesa que resuelve con la lista de todos los libros activos
   */
  async findAll(): Promise<BookDTO[]> {
    const books = await this.booksRepository.find({
      where: { is_active: true },
      relations: ['genres', 'author'],
    });

    const result = books.map((book) => {
      return BookDTO.BookEntity2BookDTO(book);
    });

    this.logger.log('Lista de libros Recibidos (sin paginación)');
    return result;
  }

  /**
   * Obtiene todos los libros disponibles con paginación.
   * 
   * @param {number} page - Página solicitada (basada en 1)
   * @param {number} limit - Cantidad de libros por página
   * @returns {Promise<{ books: BookDTO[], total: number }>} Lista de libros paginados y total de registros
   */
  async findAllPaginated(page: number = 1, limit: number = 10): Promise<{ books: BookDTO[], total: number }> {
    const skip = (page - 1) * limit;
    const [books, total] = await this.booksRepository.findAndCount({
      where: { is_active: true },
      relations: ['genres', 'author'],
      skip,
      take: limit,
    });

    const result = books.map((book) => {
      return BookDTO.BookEntity2BookDTO(book);
    });

    this.logger.log('Lista de libros Recibidos (paginada)');
    return { books: result, total };
  }

  /**
   * Obtiene libros filtrados por un género específico con paginación.
   * 
   * @param {number} genreId - El id del género a buscar
   * @param {number} page - Página solicitada (basada en 1)
   * @param {number} limit - Cantidad de libros por página
   * @returns {Promise<{ books: BookDTO[], total: number }>} Lista de libros paginados y total de registros
   */
  async findAllWithGenre(genreId: number, page: number = 1, limit: number = 10): Promise<BookDTO[]> {
    const skip = (page - 1) * limit;
    const [books, total] = await this.booksRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.genres', 'genres')
      .leftJoinAndSelect('book.author', 'author')
      .where('book.is_active = :isActive', { isActive: true })
      .andWhere('genres.id = :genreId', { genreId })
      .skip(skip)
      .take(limit)
      .getManyAndCount();
      
    const result = books.map((book) => {
      return BookDTO.BookEntity2BookDTO(book);
    });

    this.logger.log('Lista de libros Recibidos');
    return result;
  }

  /**
   * Obtiene libros filtrados por un autor específico con paginación.
   * 
   * @param {number} authorId - El id del autor a buscar
   * @param {number} page - Página solicitada (basada en 1)
   * @param {number} limit - Cantidad de libros por página
   * @returns {Promise<{ books: BookDTO[], total: number }>} Lista de libros paginados y total de registros
   */
  async findAllByAuthor(authorId: number, page: number = 1, limit: number = 10): Promise<BookDTO[]> {
    const skip = (page - 1) * limit;
    const [books, total] = await this.booksRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.genres', 'genres')
      .leftJoinAndSelect('book.author', 'author')
      .where('book.is_active = :isActive', { isActive: true })
      .andWhere('author.id = :authorId', { authorId })
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const result = books.map((book) => {
      return BookDTO.BookEntity2BookDTO(book);
    });

    this.logger.log('Lista de libros Recibidos');
    return result;
  }

  /**
   * Busca un libro específico por su ID.
   * 
   * @param {number} id - El id del libro a buscar.
   * @returns {Promise<BookDTO | null>} Una promesa que resuelve con el DTO del libro encontrado.
   * @throws {NotFoundException} Si no encuentra ningún libro con el ID especificado.
   */
  async findOne(id: number): Promise<BookDTO | null> {
    const book = await this.booksRepository.findOne({
      where: { id, is_active: true },
      relations: ['genres', 'author']
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`)
    }

    this.logger.log('Libro Recibido');
    return BookDTO.BookEntity2BookDTO(book);
  }

  /**
   * Crea un nuevo libro en el sistema con sus géneros asociados.
   * 
   * @param {CreateBookDTO} bookDTO - Objeto de transferencia de datos con la información del libro a crear.
   * Debe incluir los IDs de géneros y el ID del autor.
   * @returns {Promise<Book>} Promesa que resuelve con la entidad del libro recién creado.
   * @throws {Error} Cuando alguno de los géneros proporcionados no existe en la base de datos.
   */
  async create(bookDTO: CreateBookDTO): Promise<Book> {
    this.logger.log('Libro Creado');

    const genres = await this.genreRepository.find({
      where: { id: In(bookDTO.genre) },
    });

    if (genres.length !== bookDTO.genre.length) {
      throw new Error('Algunos géneros no existen en la base de datos');
    }

    const book = this.booksRepository.create({
      ...bookDTO,
      genres,
      author: { id: bookDTO.author_id }
    });

    const bookEntity = await this.booksRepository.save(book);
    return bookEntity;
  }

  /**
   * Actualiza un libro en el sistema.
   * 
   * @param {number} id - ID del libro a actualizar
   * @param {CreateBookDTO} bookDTO - DTO con los nuevos datos para el libro.
   * Debe incluir los IDs de géneros y el ID del autor.
   * @returns {Promise<Book>} Promesa que resuelve con la entidad del libro actualizado.
   * @throws {Error} Cuando alguno de los géneros proporcionados no existe en la base de datos.
   */
  async update(id: number, bookDTO: CreateBookDTO) {
    const book = await this.booksRepository.findOne({ where: { id }, relations: ['genres'] });
    if (!book) return null;

    const genres = await this.genreRepository.find();

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

    await this.booksRepository.save(book);

    this.logger.log('Libro Actualizado');
    return this.findOne(id);
  }

  /**
   * Elimina un libro específico de la base de datos (soft delete).
   * 
   * @param {number} id - ID del libro a eliminar
   * @returns {Promise<boolean>} Promesa que resuelve con:
   * - `true` si el libro existía y fue eliminado correctamente
   * - `false` si el libro no existía
   */
  async delete(id: number): Promise<boolean> {
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) return false;

    book.is_active = false;
    await this.booksRepository.save(book);
    return true;
  }

  /**
   * Elimina un libro específico de la base de datos (hard delete).
   * 
   * @param {number} id - ID del libro a eliminar
   * @returns {Promise<boolean>} Promesa que resuelve con:
   * - `true` si el libro existía y fue eliminado correctamente
   * - `false` si el libro no existía
   */
  async deleteSQL(id: number): Promise<boolean> {
    const book = await this.booksRepository.findOne({ where: { id } });
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