import { Controller, Post, Body, Get, Param, Delete, Put, ParseIntPipe } from "@nestjs/common";
import { UserSubscriptionService } from "./subscription_user.service";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserSubscriptionDTO } from "./user_subscription.dto";
import { UserSubscription } from "../../../../src/entidades/subscription_user.entity";

@ApiTags('Suscripciones de Usuarios')
@ApiBearerAuth()
@Controller('user-subscriptions')
export class UserSubscriptionController {
  constructor(private readonly userSubscriptionService: UserSubscriptionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una Suscripción de Usuario'})
  @ApiBody({ schema: {
    type: 'object',
    properties: {
      userId: { type: 'number' },
      startDate: { type: 'string', format: 'date-time' },
      endDate: { type: 'string', format: 'date-time' }
    }
  }})
  @ApiResponse({ status: 201, description: 'Suscripción Creada Correctamente', type: UserSubscription })
  async createSubscription(
    @Body('userId') userId: number,
    @Body('startDate') startDate: Date,
    @Body('endDate') endDate: Date,
  ): Promise<UserSubscription> {
    return this.userSubscriptionService.createSubscription(userId, startDate, endDate);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Obtener Suscripción del Usuario' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, description: 'Suscripción Encontrada', type: UserSubscriptionDTO })
  async getUserSubscription(@Param('userId', ParseIntPipe) userId: number): Promise<UserSubscriptionDTO> {
    return this.userSubscriptionService.getUserSubscription(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener Suscripciones de usuarios' })
  @ApiResponse({ status: 200, description: 'Suscripciones encontradas', type: UserSubscriptionDTO, isArray: true })
  async getUserSubscriptions(): Promise<UserSubscriptionDTO[]> {
    return this.userSubscriptionService.getUserSubscriptions();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una suscripción de usuario' })
  @ApiParam({ name: 'id', type: Number })
  async updateSubscription(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<UserSubscription>
  ): Promise<UserSubscription> {
    return this.userSubscriptionService.updateSubscription(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Suscripción' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Suscripción Eliminada' })
  async cancelSubscription(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userSubscriptionService.cancelSubscription(id);
  }
}
