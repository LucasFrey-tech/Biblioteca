import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookRecommendation } from "../../../../src/entidades/book_recommendations.entity";
import { Repository } from "typeorm";
import { RecommendationDTO } from "./recomendations.dto";
import { CreateRecommendationDTO } from "./create_recomendations.dto";

/**
 * Servicio que maneja la lógica de negocio para las recomendaciones de libros.
 */
@Injectable()
export class RecomendationsService {
    constructor(
        @InjectRepository(BookRecommendation)
        private recomendationsRepository: Repository<BookRecommendation>,
    ) { }

    /**
     * Obtiene todas las recomendaciones de libros disponibles.
     * 
     * @returns {Promise<RecommendationDTO[]>} Una promesa que resuelve con un arreglo de DTOs de recomendaciones.
     * Las recomendaciones están ordenadas por ID y limitadas a 8 elementos.
     * 
     */
    async findAll(): Promise<RecommendationDTO[]> {
        // TODO: Implementar logger para registrar la consulta
        const bookRecomendation = await this.recomendationsRepository.find({ relations: ['book', 'book.author'] });
        const formatedBookRecomendation = bookRecomendation
            .map(x => new RecommendationDTO(x))
            .sort((a, b) => a.id - b.id)
            .slice(0, 8);
        return formatedBookRecomendation;
    }

    /**
     * Busca una recomendación específica por su ID.
     * 
     * @param {number} id - El ID de la recomendación a buscar.
     * @returns {Promise<RecommendationDTO>} Una promesa que resuelve con el DTO de la recomendación encontrada.
     * @throws {NotFoundException} Si no se encuentra ninguna recomendación con el ID especificado.
     *
     */
    async findOne(id: number): Promise<RecommendationDTO> {
        // TODO: Implementar logger para registrar la búsqueda
        const bookRecomendation = await this.recomendationsRepository.findOne({
            where: { id }
        });

        if (!bookRecomendation) {
            throw new NotFoundException(`Recomendation with ID ${id} not found`);
        }

        return new RecommendationDTO(bookRecomendation);
    }

    /**
     * Crea una nueva recomendación de libro.
     * 
     * @param {CreateRecommendationDTO} body - DTO con los datos necesarios para crear la recomendación.
     * Debe incluir el ID del libro a recomendar.
     * @returns {Promise<RecommendationDTO>} Una promesa que resuelve con el DTO de la recomendación creada.
     * @throws {NotFoundException} Si no se puede recuperar la recomendación después de crearla.
     *
     */
    async create(body: CreateRecommendationDTO): Promise<RecommendationDTO> {
        // TODO: Implementar logger para registrar la creación
        const newBookRecomendation = this.recomendationsRepository.create({ book: { id: body.idBook } });
        const bookRecomendationEntity = await this.recomendationsRepository.save(newBookRecomendation);

        const loaded = await this.recomendationsRepository.findOne({
            where: { id: bookRecomendationEntity.id },
            relations: ['book'],
        });

        if (!loaded) {
            throw new NotFoundException(`Recomendation with ID ${bookRecomendationEntity.id} not found`);
        }

        return new RecommendationDTO(loaded)
    }

    /**
     * Actualiza una recomendación existente.
     * 
     * @param {number} id - El ID de la recomendación a actualizar.
     * @param {CreateRecommendationDTO} body - DTO con los nuevos datos para la recomendación.
     * @returns {Promise<RecommendationDTO>} Una promesa que resuelve con el DTO de la recomendación actualizada.
     * @throws {NotFoundException} Si no se encuentra ninguna recomendación con el ID especificado.
     *
     */
    async update(id: number, body: CreateRecommendationDTO): Promise<RecommendationDTO> {
        // TODO: Implementar logger para registrar la actualización
        await this.recomendationsRepository.update(id, {book: { id: body.idBook } });
        const updatedBookRecomendation = await this.recomendationsRepository.findOne({
            where: { id },
            relations: ['book'],
        });
        if (!updatedBookRecomendation) {
            throw new NotFoundException(`Recomendation with ID ${id} not found`);
        }
        return new RecommendationDTO(updatedBookRecomendation);
    }

    /**
     * Elimina una recomendación existente de la base de datos.
     * 
     * @param {number} id - El ID de la recomendación a eliminar.
     * @returns {Promise<void>} Una promesa que resuelve cuando la eliminación es exitosa.
     * @throws {NotFoundException} Si no se encuentra ninguna recomendación con el ID especificado.
     *
     */
    async remove(id: number): Promise<void> {
        // TODO: Implementar logger para registrar la actualización
        const result = await this.recomendationsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Recomendation with ID ${id} not found`);
        }
    }
}