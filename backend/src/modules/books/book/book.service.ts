import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../../../entidades/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  findAll() {
    return this.booksRepository.find({ relations: ['genres'] });
  }

  findOne(id: number) {
    return this.booksRepository.findOne({ where: { id }, relations: ['genres'] });
  }

  create(book: Partial<Book>) {
    return this.booksRepository.save(book);
  }

  async update(id: number, updateData: Partial<Book>) {
    await this.booksRepository.update(id, updateData);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.booksRepository.delete(id);
  }
}