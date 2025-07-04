import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNumber, IsString } from "class-validator";

export class BookCartDTO {
  @ApiProperty({ example: 123, description: 'ID único del ítem en el carrito' })
  @IsInt()
  id: number;
  
  @ApiProperty({ example: 15, description: 'ID del libro asociado' })
  @IsInt()
  idBook: number;
  
  @ApiProperty({ example: 'El Hobbit', description: 'Título del libro' })
  @IsString()
  title: string;
  
  @ApiProperty({ example: 'J.R.R. Tolkien', description: 'Nombre del autor' })
  @IsString()
  author: string;
  
  @ApiProperty({ example: 'hobbit.jpg', description: 'Nombre o URL de la imagen del libro' })
  @IsString()
  image: string;
  
  @ApiProperty({ example: 499.99, description: 'Precio del libro' })
  @IsNumber()
  price: number;
  
  @ApiProperty({ example: false, description: 'Indica si el libro es versión virtual (ebook)' })
  @IsBoolean()
  virtual:boolean;
  
  @ApiProperty({ example: 2, description: 'Cantidad del libro en el carrito' })
  @IsInt()
  amount: number;

  constructor(data: {
    id: number,
    idBook: number,
    title: string,
    author: string,
    image: string,
    price: number,
    virtual: boolean,
    amount: number,
  }) {
    this.id = data.id;
    this.idBook = data.idBook;
    this.title = data.title;
    this.author = data.author;
    this.image = data.image;
    this.price = data.price;
    this.virtual = data.virtual;
    this.amount = data.amount;
  }
}