import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Carousel } from "../../../entidades/carousel.entity";
import { CarouselDTO } from "./carousel.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SettingsService } from "../../../settings/settings.service";


/**
 * Servicio que maneja la lógica de negocio para el carousel.
 */
@Injectable()
export class CarouselService {
    private readonly logger = new Logger(CarouselDTO.name);
    constructor(
        private readonly settingsService: SettingsService,

        @InjectRepository(Carousel)
        private carouselRepository: Repository<Carousel>,
    ) { }

    /**
     * Obtiene todos los carousel disponible
     * 
     * @async
     * @returns {Promise<CarouselDTO[]} Una promesa que resuelve con un arreglo de DTOs de carousel.
     */
    async findAll(): Promise<CarouselDTO[]> {
        return this.carouselRepository.find({});
    }

    /**
     * Crea un nuevo carousel en el sistema.
     * 
     * @async
     * @param {CarouselDTO} body - Objeto de transferencia de datos con la información del carousel a crear. 
     * @returns {Promise<CarouselDTO>} - Promesa que resuelve con la entidad del carousel recién creada.
     */
    async create(body: CarouselDTO): Promise<CarouselDTO> {
        const author = this.carouselRepository.create(body);
        return this.carouselRepository.save(author);
    }

    /**
     * Actualiza un carousel en el sistema.
     * 
     * @async
     * @param {number} id - ID del carousel a actualizar
     * @param {Partial<CarouselDTO>} updateData - DTO con los nuevos datos para el carousel.
     * @returns {Promise<CarouselEntity[]>} Promesa que resuelve con un arreglo del elemento actualizado
     */
    async update(id: number, updateData: Partial<CarouselDTO>) {
        await this.carouselRepository.update(id, updateData);
        this.logger.log('Carrito Actualizado');
        return this.carouselRepository.find({ where: { id: updateData.id } });
    }

    /**
     * Elimina un carousel específico de la base de datos.
     * 
     * @async 
     * @param {number} id - ID del carousel a eliminar
     */
    async remove(id: number): Promise<void> {
        const result = await this.carouselRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Carousel item with ID ${id} not found`);
        }
    }

    /**
     * Genera la URL para acceder a la imagen del carousel
     * 
     * @param {string} imageName - Nombre del archivo de la imagen (sin ruta). 
     * @returns {string} URL completa formada por:
     * - Host base del servicio
     * - Prefijo/ruta de imágenes de libros
     * - Nombre del archivo de imagen
     */
    bookImageUrl = (imageName: string): string => {
        return this.settingsService.getHostUrl() + this.settingsService.getBooksImagesPrefix() + "/" + imageName;
    }
}