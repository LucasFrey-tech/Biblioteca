import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentBookDto } from './dto/payment_book.dto';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post()
    async processPayment(@Body() paymentData: PaymentBookDto) {
        return this.paymentService.processPayment(paymentData);
    }
}