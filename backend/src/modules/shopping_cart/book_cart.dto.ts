export class BookCartDTO {
  constructor(
    id: number,
    title: string,
    author: string,
    image: string,
    price: number,
    virtual:boolean,
    amount: number,
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.image = image;
    this.price = price;
    this.virtual = virtual;
    this.amount = amount;
  }
  id: number;
  title: string;
  author: string;
  image: string;
  price: number;
  virtual:boolean;
  amount: number;
}