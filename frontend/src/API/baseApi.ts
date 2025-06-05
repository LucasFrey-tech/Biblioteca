import { Books } from "./class/book";
import { Login } from "./class/login";
import { Users } from "./class/user";




export class BaseApi {
    public readonly log: Login;
    public readonly users: Users;
    public readonly books: Books;
    //public readonly authors:;
    
    constructor(private token?:string){
        this.log = new Login();
        this.users = new Users(token);
        this.books = new Books(token);
        //this.authors = new author();
    }


}