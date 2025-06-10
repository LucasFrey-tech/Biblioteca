import { Injectable } from '@nestjs/common';
import { PaymentBookDto } from './dto/payment_book.dto';

@Injectable()
export class PaymentService {
    async processPayment(paymentData: PaymentBookDto): Promise<any> {
        // Lógica de procesamiento de pago (integración con gateway de pagos)
        const { price, amount } = paymentData;
        const total = price * amount;

        // Simulación de procesamiento
        return {
            success: true,
            totalAmount: total,
            paymentData,
        };
    }
}