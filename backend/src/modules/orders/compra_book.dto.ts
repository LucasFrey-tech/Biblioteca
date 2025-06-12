export class CompraBookDTO {
  constructor(
    id: number,
    title: string,
    price: number,
    virtual:boolean,
    amount: number,
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.virtual = virtual;
    this.amount = amount;
  }
  id: number;
  title: string;
  price: number;
  virtual:boolean;
  amount: number;
}