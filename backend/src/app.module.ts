import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entidades/book.entity';
// import { Genre } from './entidades/genre.entity';
// import { Author } from './entidades/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


//TypeOrmModule.forFeature([Book, Genre]), BooksModule