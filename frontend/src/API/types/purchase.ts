export interface Purchase {
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

export interface PurchaseItem {
  cartItemId: number; //
  amount: number;
  virtual: boolean;
}