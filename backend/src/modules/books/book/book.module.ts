import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SettingsService } from 'src/settings/settings.service';
import { BooksService } from './book.service';
import { BooksController } from './book.controller';
import { Book } from '../../../entidades/book.entity';
import { Genre } from '../../../entidades/genre.entity';
import { Author } from '../../../entidades/author.entity';

const myapp_config = require('../../../../private/app.config.json');
const one_mb_kb = 1048576

/**
 * Módulo de NestJS que agrupa los componentes relacionados a libros:
 * - Controlador
 * - Servicio
 * - Repositorios TypeORM
 * - Soporte para subir imágenes con Multer
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Genre, Author])
    , MulterModule.register({
      storage: diskStorage({
        destination: myapp_config.static_resources.books_images.path,
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      limits: {
        fileSize: myapp_config.static_resources.books_images.fileSizeMb * one_mb_kb, 
      },
    }),
  ],
  controllers: [BooksController],
  providers: [BooksService, SettingsService],
  exports: [BooksService],
})
export class BooksModule { }