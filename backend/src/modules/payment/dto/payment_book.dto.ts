export class PaymentBookDto {
    constructor(
        id: number,
        title: string,
        image: string,
        price: number,
        virtual: boolean,
        amount: number,
    ) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.price = price;
        this.virtual = virtual;
        this.amount = amount;
    }
    id: number;
    title: string;
    image: string;
    price: number;
    virtual: boolean;
    amount: number;
}