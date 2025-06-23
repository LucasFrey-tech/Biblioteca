import { IsBoolean, IsDate, IsInt, IsNumber, IsString } from "class-validator";

export class PurchaseDTO {
  @IsInt()
  id: number;
  
  @IsInt()
  id_user: number;
  
  @IsString()
  username: string;

  @IsInt()
  id_book: number;
  
  @IsString()
  title: string;
  
  @IsString()
  author: string;
  
  @IsString()
  image: string;
  
  @IsNumber()
  price: number;
  
  @IsBoolean()
  virtual: boolean;
  
  @IsInt()
  amount: number;
  
  @IsDate()
  purchaseDate: Date;

  constructor(
    id: number,
    id_user: number,
    username: string,
    id_book: number,
    title: string,
    author: string,
    image: string,
    price: number,
    virtual: boolean,
    amount: number,
    purchaseDate: Date,
  ) {
    this.id = id;
    this.id_user = id_user,
    this.username = username,
    this.id_book = id_book,
    this.title = title;
    this.author = author;
    this.image = image;
    this.price = price;
    this.virtual = virtual;
    this.amount = amount;
    this.purchaseDate = purchaseDate;
  }
}