import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/entidades/author.entity';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';

/**
 * Módulo de NestJS que agrupa los componentes relacionados a Author:
 * - Controlador
 * - Servicio
 * - Repositorios TypeORM
 */
@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorController],
  providers: [AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {}
