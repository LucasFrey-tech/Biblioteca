import { BookCartDTO } from "./book_cart.dto";

export class CartDTO {
    constructor(
        id:number,
        idUser:number,
        usuario:string,
        idBook:number,
        book: BookCartDTO ,
        amount:number,
    ) {this.id=id, this.idUser=idUser, this.usuario=usuario, this.idBook = idBook, this.book=book, this.amount=amount}
    id:number;
    idUser:number;
    usuario:string;
    idBook:number;
    book: BookCartDTO;
    amount:number;
}