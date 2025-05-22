import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CatalogueBooksService } from './catalogue_books.service';
import { Book } from '../../../entidades/book.entity';

@Controller('catalogue_books')
export class CatalogueBooksController {

}