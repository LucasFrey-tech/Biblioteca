import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchasesController } from './purchase.controller';
import { PurchasesService } from './purchase.service';
import { Purchase } from '../../entidades/purchase.entity';
import { ShoppingCartBook } from '../../entidades/shopping_cart_book.entity';
import { Book } from '../../entidades/book.entity';
import { User } from '../../entidades/user.entity';
import { Author } from '../../entidades/author.entity';
import { UserSubscriptionDiscount } from 'src/entidades/user_subscription_discount.entity';

/**
 * Módulo de NestJS que agrupa los componentes relacionados a compras:
 * - Controlador
 * - Servicio
 * - Repositorios TypeORM
 * - Soporte para subir imágenes con Multer
 */
@Module({
  imports: [TypeOrmModule.forFeature([Purchase, ShoppingCartBook, Book, User, Author, UserSubscriptionDiscount])],
  controllers: [PurchasesController],
  providers: [PurchasesService],
  exports: [PurchasesService],
})
export class PurchasesModule {}