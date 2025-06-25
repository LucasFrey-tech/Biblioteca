import { IsBoolean, IsDate, IsInt, IsNumber, IsString } from "class-validator";

/**
 * Data Transfer Object (DOT) para Purchase.
 * Se usa para validar y transformar datos entre el cliente y el servidor.
 */
export class PurchaseDTO {
  /**
   * ID de la compra
   * @type {number}
   */
  @IsInt()
  id: number;
  
  /**
   * ID del usuario
   * @type {number}
   */
  @IsInt()
  id_user: number;
  
  /**
   * Alias del usuario
   * @type {string}
   */
  @IsString()
  username: string;

 /**
  * ID del libro
  * @type {number}
  */
  @IsInt()
  id_book: number;
  
  /**
   * Título del libro
   * @type {string}
   */
  @IsString()
  title: string;
  
  /**
   * Autor del libro
   * @type {string}
   */
  @IsString()
  author: string;
  
  /**
   * Imagen del libro
   * @type {string}
   */
  @IsString()
  image: string;
  
  /**
   * Precio de la compra
   * @type {number}
   */
  @IsNumber()
  price: number;
  
  /**
   * Formato del libro
   * @type {boolean}
   */
  @IsBoolean()
  virtual: boolean;
  
  /**
   * Cantidad de libros comprados
   * @type {number}
   */
  @IsInt()
  amount: number;
  
  /**
   * Fecha de compra
   * @type {Date}
   */
  @IsDate()
  purchaseDate: Date;

  /**
   * Constructor del DTO.
   */
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