export class BookContentDTO{
    constructor(idBook:number,content:string){
        this.idBook = idBook;
        this.content = content;
    }
    idBook:number;
    content:string;   
}