import { ApiProperty } from "@nestjs/swagger";

export class SubscriptionDTO {
    @ApiProperty({example: 1, description: "ID Único de la Suscripción"})
    id:number;
    @ApiProperty({example: 2000, description: "Precio de la Suscripción"})
    price: number;
}

