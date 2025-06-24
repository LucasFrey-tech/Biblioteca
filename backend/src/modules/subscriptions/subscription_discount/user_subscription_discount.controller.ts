import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UserSubscriptionDiscountService } from './user_subscription_discount.service';
import { UserSubscriptionDiscount } from 'src/entidades/user_subscription_discount.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Descuentos de Suscripción por Usuario')
@Controller('user-subscription-discount')
export class UserSubscriptionDiscountController {
  constructor(private readonly discountService: UserSubscriptionDiscountService) {}

  @Post()
  @ApiOperation({ summary: 'Crear descuento para suscripción' })
  @ApiBody({ type: UserSubscriptionDiscount })
  @ApiResponse({ status: 201, description: 'Descuento creado correctamente.', type: UserSubscriptionDiscount })
  create(@Body() data: { id_subscription: number; discount: number }): Promise<UserSubscriptionDiscount> {
    return this.discountService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los descuentos de suscripciones' })
  @ApiResponse({ status: 200, description: 'Lista de descuentos.', type: [UserSubscriptionDiscount] })
  findAll(): Promise<UserSubscriptionDiscount[]> {
    return this.discountService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un descuento por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del descuento' })
  @ApiResponse({ status: 200, description: 'Descuento encontrado.', type: UserSubscriptionDiscount })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserSubscriptionDiscount> {
    return this.discountService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un descuento por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del descuento a actualizar' })
  @ApiBody({ type: UserSubscriptionDiscount })
  @ApiResponse({ status: 200, description: 'Descuento actualizado.', type: UserSubscriptionDiscount })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { discount: number },
  ): Promise<UserSubscriptionDiscount> {
    return this.discountService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un descuento por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del descuento a eliminar' })
  @ApiResponse({ status: 200, description: 'Descuento eliminado correctamente.' })
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.discountService.delete(id);
  }
}
