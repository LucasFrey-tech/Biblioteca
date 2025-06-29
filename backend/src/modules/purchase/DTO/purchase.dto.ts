import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDate, IsInt, IsNumber, IsString } from "class-validator";


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

  constructor(data: {
    id_book: number,
    title: string,
    author: string,
    image: string,
    price: number,
    virtual: boolean,
    amount: number,
    subscriptionDiscount: number
  }) {
    this.id_book = data.id_book;
    this.title = data.title;
    this.author = data.author;
    this.image = data.image;
    this.price = data.price;
    this.virtual = data.virtual;
    this.amount = data.amount;
    this.subscriptionDiscount = data.subscriptionDiscount;
  }
}

/**
 * Data Transfer Object (DTO) para Purchase.
 * Se usa para validar y transformar datos entre el cliente y el servidor.
 */
export class PurchaseDTO {
  /**
   * ID de la compra
   * @type {number}
   */
  @ApiProperty({ example: 101, description: 'ID único de la compra' })
  @IsInt()
  id: number;
  
  /**
   * ID del usuario
   * @type {number}
   */
  @ApiProperty({ example: 7, description: 'ID del usuario que realizó la compra' })
  @IsInt()
  id_user: number;
  
  /**
   * Alias del usuario
   * @type {string}
   */
  @ApiProperty({ example: 'Tukson', description: 'Alias del usuario' })
  @IsString()
  username: string;

  /**
   * Array de ítems de la compra
   * @type {PurchaseItemDTO[]}
   */
  @ApiProperty({
    type: [PurchaseItemDTO],
    description: 'Lista de ítems que componen la compra',
    example: [
      {
        id: 1,
        idBook: 15,
        title: 'El Hobbit',
        amount: 2,
        price: 499.99,
      },
      {
        id: 2,
        idBook: 18,
        title: 'El Señor de los Anillos',
        amount: 1,
        price: 899.99,
      },
    ],
  })
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


/**
 * DTO para respuesta paginada de compras
 */
export class PaginatedPurchaseDTO {
  /**
   * Lista de compras
   * @type {PurchaseDTO[]}
   */
  @ApiProperty({
    description: 'Lista de compras',
    type: [PurchaseDTO],
    example: [
      {
        id: 101,
        id_user: 7,
        username: 'Tukson',
        purchaseItems: [
          {
            id: 1,
            idBook: 15,
            title: 'El Hobbit',
            amount: 2,
            price: 499.99,
            virtual: false,
          },
        ],
        purchaseDate: '2025-06-28T19:00:00.000Z',
        total: 999.98,
      },
    ],
  })
  @IsArray()
  items: PurchaseDTO[];

  /**
   * Total de compras
   * @type {number}
   */
  @ApiProperty({ example: 1, description: 'Total de compras registradas' })
  @IsInt()
  total: number;

  constructor(items: PurchaseDTO[], total: number) {
    this.items = items;
    this.total = total;
  }
}