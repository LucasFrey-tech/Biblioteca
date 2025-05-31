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

  findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  findOne(id: number) {
    return this.booksRepository.findOne({ where: { id } });
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