import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VirtualBookContent } from 'src/entidades/virtual_book_content.entity';
import { BookContentDTO } from './book_content.dto';
import { log } from 'console';

@Injectable()
export class BookContentService {
  private readonly logger = new Logger(BookContentService.name);
  constructor(
    @InjectRepository(VirtualBookContent)
    private bookContentRepository: Repository<VirtualBookContent>,
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
    await this.bookContentRepository.update(id, {
      book: { id: bookContentDto.idBook },
      content: bookContentDto.content,
    });
    this.logger.log('Contenido Actualizado');
  }

  delete(id: number) {
    this.logger.log('Contenido Borrado');
    return this.bookContentRepository.delete(id);
  }

}