import { IsArray, IsBoolean, IsDate, IsInt, IsNumber, IsString } from "class-validator";

/**
 * Data Transfer Object (DTO) para Purchase.
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
   * Array de ítems de la compra
   * @type {PurchaseItemDTO[]}
   */
  @IsArray()
  purchaseItems: PurchaseItemDTO[];

  /**
   * Fecha de compra
   * @type {Date}
   */
  @IsDate()
  purchaseDate: Date;

  /**
   * Total de la compra
   * @type {number}
   */
  @IsNumber()
  total: number;

  /**
   * Constructor del DTO.
   */
  constructor(
    id: number,
    id_user: number,
    username: string,
    purchaseItems: PurchaseItemDTO[],
    purchaseDate: Date,
    total: number
  ) {
    this.id = id;
    this.id_user = id_user;
    this.username = username;
    this.purchaseItems = purchaseItems;
    this.purchaseDate = purchaseDate;
    this.total = total;
  }
}

export class PurchaseItemDTO {
  @IsNumber()
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
  
  @IsNumber()
  amount: number;

  @IsNumber()
  subscriptionDiscount: number;

  constructor(
    id_book: number,
    title: string,
    author: string,
    image: string,
    price: number,
    virtual: boolean,
    amount: number,
    subscriptionDiscount: number
  ) {
    this.id_book = id_book;
    this.title = title;
    this.author = author;
    this.image = image;
    this.price = price;
    this.virtual = virtual;
    this.amount = amount;
    this.subscriptionDiscount = subscriptionDiscount;
  }
}

/**
 * DTO para respuesta paginada de compras
 */
export class PaginatedPurchaseDTO {
  /**
   * Lista de compras
   * @type {PurchaseDTO[]}
   */
  @IsArray()
  items: PurchaseDTO[];

  /**
   * Total de compras
   * @type {number}
   */
  @IsInt()
  total: number;

  constructor(items: PurchaseDTO[], total: number) {
    this.items = items;
    this.total = total;
  }
}