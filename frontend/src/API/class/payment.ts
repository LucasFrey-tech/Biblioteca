import { Crud } from '../service';
import { Payment } from '../types/payment';

export class PaymentAPI extends Crud<Payment> {
    private endPoint: string;
    constructor(token?: string) {
        super(token);
        this.endPoint = 'payment';
    }

    async processPayment(paymentData: Payment): Promise<any> {
        return this.create(paymentData);
    }

    getAll(): Promise<Payment[]> {
        throw new Error('Method not implemented.');
    }
    getOne(id: number): Promise<Payment> {
        throw new Error('Method not implemented.');
    }
    create(data: Partial<Payment>): Promise<Payment> {
        throw new Error('Method not implemented.');
    }
    update(): Promise<Payment> {
        throw new Error('Method not implemented.');
    }
    delete(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}