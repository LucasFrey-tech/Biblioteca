import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SettingsService } from 'src/settings.service';
import { BooksService } from './book.service';
import { BooksController } from './book.controller';
import { Book } from '../../../entidades/book.entity';
import { Genre } from '../../../entidades/genre.entity';
import { Author } from '../../../entidades/author.entity';
import { DataSource } from 'typeorm';

const myapp_config = require('../../../../private/app.config.json');

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Genre, Author])
    ,MulterModule.register({
      storage: diskStorage({
        destination: myapp_config.static_resources.books_images.path,
          filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      })
    }),
  ],
  controllers: [BooksController],
  providers: [BooksService, SettingsService],
  exports: [BooksService],
})
export class BooksModule {}

