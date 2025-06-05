export class BookCartDTO {
  constructor(
    id: number,
    title: string,
    author: string,
    image: string,
    price: number,
    subscriber_exclusive: boolean,
    amount?: number,
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.image = image;
    this.price = price;
    this.subscriber_exclusive = subscriber_exclusive;
    this.amount = amount;
  }
  id: number;
  title: string;
  author: string;
  image: string;
  price: number;
  subscriber_exclusive: boolean;
  amount?: number;
}