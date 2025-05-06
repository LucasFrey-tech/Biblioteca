import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { preloadBooks } from './config/preloadBooks';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const bookRepository = app.get(getRepositoryToken(Book));
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  await preloadBooks(bookRepository);
  await app.listen(3001);
}
bootstrap();
