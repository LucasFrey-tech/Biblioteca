export interface Purchase {
  id: number;
  title: string;
  author: string;
  image: string;
  price: number;
  virtual: boolean;
  amount: number;
  purchaseDate: Date;
}

export interface PurchaseItem {
  cartItemId: number; //
  amount: number;
  virtual: boolean;
}