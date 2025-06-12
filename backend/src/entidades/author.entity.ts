import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('authors')
export class Author {
  @ApiProperty({ example: 1, description: 'ID Único del Autor'})
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: 'Roberto Kafka'})
  @Column({ length: 100 })
  name: string;

}