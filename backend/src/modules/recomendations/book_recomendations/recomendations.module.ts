import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/entidades/book.entity';
import { RecomendationsController } from './recomendations.controller';
import { RecomendationsService } from './recomendations.service';
import { BookRecommendation } from 'src/entidades/book_recommendations.entity';

/**
 * Módulo de NestJS que agrupa los componentes relacionados a recomendación de libros:
 * - Controlador
 * - Servicio
 * - Repositorios TypeORM
 */
@Module({
  imports: [TypeOrmModule.forFeature([BookRecommendation, Book])],
  controllers: [RecomendationsController],
  providers: [RecomendationsService],
  exports: [RecomendationsService],
})
export class RecomendationsModule {}