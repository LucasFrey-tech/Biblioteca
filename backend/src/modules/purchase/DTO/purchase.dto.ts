export class PurchaseDTO {
  constructor(
    id: number,
    id_user: number,
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
    this.id_book = id_book,
    this.title = title;
    this.author = author;
    this.image = image;
    this.price = price;
    this.virtual = virtual;
    this.amount = amount;
    this.purchaseDate = purchaseDate;
  }
  id: number;
  id_user: number;
  id_book: number;
  title: string;
  author: string;
  image: string;
  price: number;
  virtual: boolean;
  amount: number;
  purchaseDate: Date;
}