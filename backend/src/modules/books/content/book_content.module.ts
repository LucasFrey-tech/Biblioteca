import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VirtualBookContent } from 'src/entidades/virtual_book_content.entity';
import { BookContentService } from './book_content.service';
import { BookContentController } from './book_content.controller';
import { SettingsService } from 'src/settings.service';

@Module({
  imports: [TypeOrmModule.forFeature([VirtualBookContent])],
  controllers: [BookContentController],
  providers: [BookContentService, SettingsService],
})
export class BookContentModule {}