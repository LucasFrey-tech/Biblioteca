import { Injectable, NotFoundException } from "@nestjs/common";
import { Carousel } from "src/entidades/carousel.entity";
import { CarouselDTO } from "./carousel.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SettingsService } from "src/settings.service";


@Injectable()
export class CarouselService {
    constructor(
        private readonly settingsService: SettingsService,
        
        @InjectRepository(Carousel)
        private carouselRepository: Repository<Carousel>,
    ) { }

    async create(body: CarouselDTO): Promise<CarouselDTO> {
        const author = this.carouselRepository.create(body);
        return this.carouselRepository.save(author);
    }

    findAll(): Promise<CarouselDTO[]> {
        return this.carouselRepository.find({});
    }

    async findOne(id: number): Promise<CarouselDTO> {
        const author = await this.carouselRepository.findOne({
            where: { id }
        });

        if (!author) {
            throw new NotFoundException(`Carousel item with ID ${id} not found`);
        }
        return author;
    }

    async remove(id: number): Promise<void> {
        const result = await this.carouselRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Carousel item with ID ${id} not found`);
        }
    }

    bookImageUrl = (imageName:string):string=>{
    return this.settingsService.getHostUrl()+this.settingsService.getBooksImagesPrefix()+"/"+imageName;
  }
}