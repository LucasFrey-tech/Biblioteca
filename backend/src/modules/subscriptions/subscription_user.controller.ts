import { Controller, Post, Body, Get, Param, Delete, ParseIntPipe } from "@nestjs/common";
import { UserSubscription } from "src/entidades/subscription_user.entity";
import { UserSubscriptionService } from "./subscription_user.service";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Suscripciones de Usuarios')
@ApiBearerAuth()
@Controller('user-subscriptions')
export class UserSubscriptionController {
  constructor(private readonly userSubscriptionService: UserSubscriptionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una Suscripción de Usuario'})
  @ApiBody({ type: UserSubscription})
  @ApiResponse({ status: 201, description: 'Suscripción Creada Correctamente', type: UserSubscription })
  async createSubscription(
    @Body('userId') userId: number,
    @Body('startDate') startDate: Date,
    @Body('endDate') endDate: Date,
  ): Promise<UserSubscription> {
    return this.userSubscriptionService.createSubscription(userId, startDate, endDate);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Obetener Suscripción del Usuario'})
  @ApiParam({ name: 'userId', type: Number})
  @ApiResponse({ status: 200, description: 'Suscripción Encontrada', type: UserSubscription})
  async getUserSubscriptions(@Param('userId', ParseIntPipe) userId: number): Promise<UserSubscription[]> {
    return this.userSubscriptionService.getUserSubscriptions(userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Suscripción'})
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Suscripción Eliminada'})
  async cancelSubscription(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userSubscriptionService.cancelSubscription(id);
  }
}