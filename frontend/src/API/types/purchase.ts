export interface Purchase {
  id: number;
  id_user: number;
  username: string;
  purchaseItems: PurchaseItemDTO[];
  purchaseDate: Date;
  total:number;
}

export interface PurchaseItemDTO {
  id_book: number;
  title: string;
  author: string;
  image: string;
  price: number;
  virtual: boolean;
  amount: number;
  subscriptionDiscount: number;
}

export interface PurchaseItem {
  cartItemId: number; 
  amount: number;
  virtual: boolean;
  discount: number;
}