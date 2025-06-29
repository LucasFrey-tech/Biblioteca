import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VirtualBookContent } from '../../../entidades/virtual_book_content.entity';
import { BookContentDTO } from './dto/book_content.dto';
import { SettingsService } from '../../../settings/settings.service';

@Injectable()
export class BookContentService {
  private readonly logger = new Logger(BookContentService.name);
  constructor(
    private readonly settingsService: SettingsService,
        
    @InjectRepository(VirtualBookContent)
    private readonly bookContentRepository: Repository<VirtualBookContent>,
  ) { }

  async get(id: number): Promise<BookContentDTO | null> {
    const bookContent = await this.bookContentRepository.findOne({
      where: { book: { id } },
      relations: ['book'],
    });

    if (!bookContent) {
      this.logger.log('Contenido No Encontrado');
      return null;
    }

    this.logger.log('Contenido Encontrado');
    return {
      idBook: bookContent.book.id,
      content: bookContent.content,
    };
  }

  async create(bookContentDto: Partial<BookContentDTO>): Promise<BookContentDTO> {
    const entity = this.bookContentRepository.create({
      book: { id: bookContentDto.idBook },
      content: bookContentDto.content,
    });

    const saved = await this.bookContentRepository.save(entity);
    this.logger.log('Contenido Creado');

    return {
      idBook: saved.book.id,
      content: saved.content,
    };
  }

  async update(id: number, bookContentDto: BookContentDTO) {
    this.logger.log('Contenido Actualizado');
    return this.bookContentRepository.update(id, {content: bookContentDto.content})
  }

  delete(id: number) {
    this.logger.log('Contenido Borrado');
    return this.bookContentRepository.delete(id);
  }

  bookContentUrl = (fileName:string):string=>{
    return this.settingsService.getHostUrl()+this.settingsService.getBooksImagesPrefix()+"/"+fileName;
  }
}