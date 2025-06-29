import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Carousel } from "../../../entidades/carousel.entity";
import { CarouselDTO } from "./dto/carousel.dto";
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
        private readonly carouselRepository: Repository<Carousel>,
    ) { }

    /**
     * Obtiene todos los carousel disponible
     * 
     * @returns {Promise<CarouselDTO[]} - Una promesa que resuelve con un arreglo de DTOs de carousel.
     */
    async findAll(): Promise<CarouselDTO[]> {
        return this.carouselRepository.find({});
    }

    async findOne(id: number): Promise<CarouselDTO | null> {
        const carousel = await this.carouselRepository.findOne({ where: { id } });
    
        if (!carousel) {
          throw new NotFoundException(`Carousel with ID ${id} not found`)
        }
    
        this.logger.log('Carousel Recibido');
        return carousel;
    }

    /**
     * Crea un nuevo carousel en el sistema.
     * 
     * @param {CarouselDTO} body - Objeto de transferencia de datos con la información del carousel a crear. 
     * @returns {Promise<CarouselDTO>} - Promesa que resuelve con la entidad del carousel recién creada.
     */
    async create(body: Partial<CarouselDTO>): Promise<CarouselDTO> {
        const author = this.carouselRepository.create(body);
        return this.carouselRepository.save(author);
    }

    /**
     * Actualiza un carousel en el sistema.
     * 
     * @param {number} id - ID del carousel a actualizar
     * @param {Partial<CarouselDTO>} updateData - DTO con los nuevos datos para el carousel.
     * @returns {Promise<CarouselEntity[]>} - Promesa que resuelve con un arreglo del elemento actualizado
     */
    async update(id: number, updateData: CarouselDTO) {
        
        const carousel = await this.carouselRepository.findOne({ where: {id} });

        if(!carousel) return null;

        carousel.idBook = updateData.idBook;
        carousel.image = updateData.image
        
        await this.carouselRepository.save(carousel);
        
        this.logger.log('Carrito Actualizado');
        return this.carouselRepository.find({ where: { id: updateData.id } });
    }

    /**
     * Elimina un carousel específico de la base de datos.
     *  
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