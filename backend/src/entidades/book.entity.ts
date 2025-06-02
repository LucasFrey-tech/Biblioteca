import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  author_id!: number;

  @Column('text')
  description!: string;

  @Column()
  anio!: number;

  @Column({ unique: true })
  isbn!: string;

  @Column({ default: '' })
  image!: string;

  @Column()
  stock!: number;

  @Column({ default: false })
  subscriber_exclusive!: boolean;

  @Column('float')
  price!: number;
}