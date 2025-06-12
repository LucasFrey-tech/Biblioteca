import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VirtualBookContent } from 'src/entidades/virtual_book_content.entity';
import { BookContentService } from './book_content.service';
import { BookContentController } from './book_content.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VirtualBookContent])],
  controllers: [BookContentController],
  providers: [BookContentService],
})
export class BookContentModule {}