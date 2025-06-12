import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VirtualBookContent } from 'src/entidades/virtual_book_content.entity';
import { BookContentDTO } from './book_content.dto';

@Injectable()
export class BookContentService {
  constructor(
    @InjectRepository(VirtualBookContent)
    private bookContentRepository: Repository<VirtualBookContent>,
  ) { }

  async get(id:number):Promise<BookContentDTO|null>{
    const bookContent = await this.bookContentRepository.findOne({ where: {idBook: id} })
    if(!bookContent) return null
    return {
      idBook: bookContent?.idBook,
      content: bookContent?.content
    }
  }

  create(bookContent: Partial<BookContentDTO>): Promise<BookContentDTO> {
      const newGenre = this.bookContentRepository.create(bookContent);
      return this.bookContentRepository.save(newGenre);
  }

  update(id:number, bookContent: BookContentDTO){
    this.bookContentRepository.update(id,bookContent)
  }

  delete(id: number) {
    return this.bookContentRepository.delete(id);
  }

}