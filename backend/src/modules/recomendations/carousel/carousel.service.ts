import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Carousel } from "src/entidades/carousel.entity";
import { CarouselDTO } from "./carousel.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SettingsService } from "src/settings.service";


@Injectable()
export class CarouselService {
    private readonly logger = new Logger(CarouselDTO.name);
    constructor(
        private readonly settingsService: SettingsService,

        @InjectRepository(Carousel)
        private carouselRepository: Repository<Carousel>,
    ) { }

    findAll(): Promise<CarouselDTO[]> {
        return this.carouselRepository.find({});
    }

    async create(body: CarouselDTO): Promise<CarouselDTO> {
        const author = this.carouselRepository.create(body);
        return this.carouselRepository.save(author);
    }

    async update(id: number, updateData: Partial<CarouselDTO>) {
        await this.carouselRepository.update(id, updateData);
        this.logger.log('Carrito Actualizado');
        return this.carouselRepository.find({ where: { id: updateData.id } });
    }

    async remove(id: number): Promise<void> {
        const result = await this.carouselRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Carousel item with ID ${id} not found`);
        }
    }

    bookImageUrl = (imageName: string): string => {
        return this.settingsService.getHostUrl() + this.settingsService.getBooksImagesPrefix() + "/" + imageName;
    }
}