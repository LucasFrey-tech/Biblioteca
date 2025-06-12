export class PurchaseDTO {
  constructor(
    id: number,
    title: string,
    author: string,
    image: string,
    price: number,
    virtual: boolean,
    amount: number,
    purchaseDate: Date,
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.image = image;
    this.price = price;
    this.virtual = virtual;
    this.amount = amount;
    this.purchaseDate = purchaseDate;
  }
  id: number;
  title: string;
  author: string;
  image: string;
  price: number;
  virtual: boolean;
  amount: number;
  purchaseDate: Date;
}