import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  name: string;

}