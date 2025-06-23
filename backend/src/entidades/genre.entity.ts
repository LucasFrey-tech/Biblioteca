import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('genres')
export class Genre {
  @ApiProperty({example: 1, description: 'ID Único del Genero'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Aventura', description: 'Nombre del Genero'})
  @Column()
  name: string;

}