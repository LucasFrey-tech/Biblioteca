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

  async get(id:number):Promise<BookContentDTO|null>{
    const bookContent = await this.bookContentRepository.findOne({ where: {idBook: id} })
    if(!bookContent) {
      this.logger.log('Contenido No Encontrado');
      return null
    } 
      
    this.logger.log('Contenido Encontrado');
    return {
      idBook: bookContent?.idBook,
      content: bookContent?.content
    }
  }

  create(bookContent: Partial<BookContentDTO>): Promise<BookContentDTO> {
    const newGenre = this.bookContentRepository.create(bookContent);
    this.logger.log('Contenido Creado');
    return this.bookContentRepository.save(newGenre);
  }

  update(id:number, bookContent: BookContentDTO){
    this.logger.log('Contenido Actualizado');
    this.bookContentRepository.update(id,bookContent)
  }

  delete(id: number) {
    this.logger.log('Contenido Borrado');
    return this.bookContentRepository.delete(id);
  }

}