import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { User } from "../../../entidades/user.entity";
import { Book } from "src/entidades/book.entity";
import { Review } from "../../../entidades/review.entity";
import { ReviewI } from "./dto/review.dto";
import { CreateReviewDto } from "./dto/createReview.dto";

/**
 * Servcio que maneja la lógica de negocio para las reseñas.
 */
@Injectable()
export class BookReviewsService {
  private readonly logger = new Logger(BookReviewsService.name);

  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  /**
   * Crea una nueva reseña en el sistema.
   * 
   * @param {CreateReviewDto} reviewData - Objeto de transferencia de datos con la informacion de la reseña a crear.
   * @returns {Promise<ReviewI>} - Una promesa que resuelve a un objeto con los detalles de la reseña creada
   * @throws {NotFoundException} Si el usuario especificado no existe.
   */
  async create(reviewData: CreateReviewDto): Promise<ReviewI> {
    const user = await this.userRepository.findOne({ where: { id: reviewData.id_user } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const newReview = this.reviewRepository.create({
      rating: reviewData.rating,
      comment: reviewData.comment,
      reviewDate: new Date(),
      user,
      book: { id: reviewData.id_book },
    });

    const savedReview = await this.reviewRepository.save(newReview);

    // Cargar username asociado al user
    const fullReview = await this.reviewRepository.findOne({
      where: { id: savedReview.id },
      relations: ['user'],
    });

    const username = fullReview?.user?.username || '';

    this.logger.log('Critica Creada');

    return new ReviewI(
      savedReview.id,
      savedReview.user.id,
      savedReview.book.id,
      username,
      savedReview.comment,
      savedReview.rating,
      savedReview.reviewDate.toLocaleString('es-AR'),
    );
  }

  /**
   * Obtiene todas las reseñas disponibles
   * 
   * @returns {Promise<Review[]>} - Una promesa que resuelve con un arreglo de DTOs de reseñas.
   */
  async findAll(): Promise<Review[]> {
    this.logger.log('Lista de Criticas Obtenida');
    return this.reviewRepository.find({ relations: ['user'] });
  }

  /**
   * Busca una reseña específica por su ID.
   * 
   * @param {number} id - El id de la resña a buscar.
   * @returns {Promise<Review>} - Promesa que resuelve con la reseña espacífica encontrada.
   * @throws {NotFoundException} Si no encuenta ninguna reseña con el ID especificado.
   */
  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!review) {
      this.logger.log('Critica No Encontrada');
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    this.logger.log('Critica Obtenida');
    return review;
  }

  /**
   * Busca una reseña por ID de un libro específico.
   * 
   * @param {number} bookId - ID del libro a buscar.
   * @returns {Promise<ReviewI[]>} - Promesa que resuelve con un DTO de las reseñas dentro del libro especificado.
   */
  async findReviewsByBookId(bookId: number): Promise<ReviewI[]> {
    const reviews = await this.reviewRepository.find({
      where: { book: { id: bookId } },
      relations: ['user'],
    });

    const result = reviews.map((r) => {
      return new ReviewI(
        r.id,
        r.user.id,
        r.book.id,
        r.user ? r.user.username : '',
        r.comment,
        r.rating,
        r.reviewDate.toLocaleString('es-AR'),
      );
    });

    this.logger.log('Lista de Criticas por ID Libro Obtenida');
    return result;
  }

  /**
   * Actualiza una reseña en el sistema.
   * 
   * @param {number} id - ID de la reseña a actualizar.
   * @param {ReviewI} reviewData - DTO con los nuevos datos para la reseña.
   * @returns {Promise<Review | null>} Promesa que resuelve con la entidad Review actualizada.
   */
  async update(id: number, reviewData: ReviewI) {
    await this.reviewRepository.update(id, reviewData);
    this.logger.log('Critica Actualizada');
    return this.reviewRepository.findOne({ where: { id: id } });
  }

  /**
   * Elimina del sistema una reseña específica.
   * 
   * @param {number} id - ID de la reseña a eliminar
   * @throws {NotFoundException} Si la reseña específica no se encuentra en el sistema
   */
  async remove(id: number): Promise<void> {
    const result = await this.reviewRepository.delete(id);
    this.logger.log('Critica Eliminada');
    if (result.affected === 0) {
      this.logger.log('Critica No Encontrada');
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
  }
}
