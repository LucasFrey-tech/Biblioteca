import { Authors } from "./class/author";
import { Books } from "./class/book";
import { Catalogo } from "./class/catalogo";
import { Genres } from "./class/genre";
import { Login } from "./class/login";
import { Users } from "./class/user";
import { Reviews } from "./class/review";
import { ShoppingCart } from "./class/shopping_cart";
import { Purchases } from "./class/purchase";
import { Libreria } from "./class/libreria";
import { BookContent } from "./class/bookContent";
import { Subscription } from "./class/subscription";
import { CarouselAPI } from "./class/carousel.api";
import { BookRecomendationsAPI } from "./class/bookRecomendations.api";
import { UserSubscriptionDiscount } from "./class/userSubscriptionDiscount";

export class BaseApi {
    public readonly log: Login;
    public readonly users: Users;
    public readonly books: Books;
    public readonly catalogo: Catalogo;
    public readonly genre: Genres;
    public readonly authors: Authors;
    public readonly review: Reviews;
    public readonly shoppingCart: ShoppingCart;
    public readonly purchase: Purchases; 
    public readonly libreria: Libreria;
    public readonly bookContent: BookContent;
    public readonly subscription: Subscription;
    public readonly carousel: CarouselAPI;
    public readonly bookRecomendations: BookRecomendationsAPI;
    public readonly userSubscriptionDiscount: UserSubscriptionDiscount;

    constructor(private token?:string){
        this.log = new Login();
        this.users = new Users(token);
        this.books = new Books(token);
        this.catalogo = new Catalogo(token);
        this.genre = new Genres();
        this.authors = new Authors();
        this.review = new Reviews(token);
        this.shoppingCart = new ShoppingCart(token);
        this.purchase = new Purchases(token);
        this.libreria = new  Libreria(token);
        this.bookContent = new  BookContent(token);
        this.subscription = new  Subscription(token);
        this.carousel = new  CarouselAPI(token);
        this.bookRecomendations = new  BookRecomendationsAPI(token);
        this.userSubscriptionDiscount = new UserSubscriptionDiscount(token);
    }
}