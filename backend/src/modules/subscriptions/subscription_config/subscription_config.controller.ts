import { Controller, Body, Get, Param, Put, ParseIntPipe, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { SubscriptionService } from "./subscription_config.service";
import { SubscriptionDTO } from "./dto/subscription.dto";

@ApiTags('Configuracion de Subscripcion')
@ApiBearerAuth()
@Controller('subscriptions')
export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService) { }

    @Get()
    @ApiOperation({ summary: 'Obetener configuracion de Suscripción' })
    @ApiResponse({ status: 200, description: 'configuracion de Suscripción', type: SubscriptionDTO })
    async getUserSubscriptions(): Promise<SubscriptionDTO> {
        return this.subscriptionService.get();
    }

    @Put()
    @ApiOperation({ summary: 'Actualizar configuracion Subscripcion.' })
    @ApiBody({ type: SubscriptionDTO })
    @ApiResponse({ status: 200, description: 'Subscripcion Actualizado', type: SubscriptionDTO })
    update(
        @Body() updateData: Partial<SubscriptionDTO>
    ) {
        const defaultConfigId = 1;
        return this.subscriptionService.update(defaultConfigId, updateData);
    }

  @Post()
  @ApiResponse({ status: 201, description: 'Subscripcion Creada', type: SubscriptionDTO })
  async create(@Body() data: SubscriptionDTO) {
    return this.subscriptionService.create(data);
    }
}
