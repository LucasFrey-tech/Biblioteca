import { ApiProperty } from "@nestjs/swagger";
import { SubscriptionDTO } from "../../subscription_config/dto/subscription.dto";

export class UserSubscriptionDTO {
  @ApiProperty({example: 1, description: "ID Único de la Suscripción del Usuario"})
  id: number;
  @ApiProperty({example: "2025-06-28T16:09:51.820Z", description: "Dia Inicio Suscripción"})
  startDate: string;
  @ApiProperty({example: "2025-07-28T16:09:51.821Z", description: "Dia Finalización de la Suscripción"})
  endDate: string;
  @ApiProperty({example: false, description: "Vigencia de la Suscripción"})
  ongoing: boolean;
  @ApiProperty({description: "Datos de la Suscripción", type: SubscriptionDTO })
  subscription: SubscriptionDTO | null; 
}
