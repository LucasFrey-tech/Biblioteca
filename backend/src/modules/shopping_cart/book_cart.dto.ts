import { IsBoolean, IsInt, IsNumber, IsString } from "class-validator";

export class BookCartDTO {
  @IsInt()
  id: number;
  
  @IsInt()
  idBook: number;
  
  @IsString()
  title: string;
  
  @IsString()
  author: string;
  
  @IsString()
  image: string;
  
  @IsNumber()
  price: number;
  
  @IsBoolean()
  virtual:boolean;
  
  @IsInt()
  amount: number;

  constructor(
    id: number,
    idBook:number,
    title: string,
    author: string,
    image: string,
    price: number,
    virtual:boolean,
    amount: number,
  ) {
    this.id = id;
    this.idBook = idBook;
    this.title = title;
    this.author = author;
    this.image = image;
    this.price = price;
    this.virtual = virtual;
    this.amount = amount;
  }
}