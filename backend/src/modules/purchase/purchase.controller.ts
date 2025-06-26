import { Controller, Post, Get, Param, ParseIntPipe, Body } from '@nestjs/common';
import { PurchasesService } from './purchase.service';
import { PurchaseDTO } from './DTO/purchase.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

class PurchaseItemDTO {
  cartItemId: number;
  amount: number;
  virtual: boolean;
  discount: number;
}

class ProcessPurchaseDTO {
  idUser: number;
  items: PurchaseItemDTO[];
  price: number;
}

/**
 * Servicio que maneja la lógica de negocio para los compras.
 */
@ApiTags('Purchases')
@ApiBearerAuth()
@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) { }

  /**
   * 
   */
  @Get()
  @ApiOperation({ summary: 'Obtener todas las compras del sistema' })
  @ApiResponse({ status: 200, description: 'Listado completo de compras', type: [PurchaseDTO] })
  @ApiResponse({ status: 404, description: 'No se encontraron compras' })
  async getAllPurchases(): Promise<PurchaseDTO[]> {
    return this.purchasesService.getAllPurchases();
  }

  @Post()
  @ApiOperation({ summary: 'Procesar compra de un usuario' })
  @ApiBody({ type: ProcessPurchaseDTO })
  @ApiResponse({ status: 200, description: 'Compra procesada exitosamente' })
  async processPurchase(@Body() body: ProcessPurchaseDTO) {
    await this.purchasesService.processPurchase(body.idUser, body.items);
    return { message: 'Compra procesada exitosamente' };
  }

  @Get(':idUser')
  @ApiOperation({ summary: 'Obtener historial de compras de un usuario' })
  @ApiParam({ name: 'idUser', type: Number })
  @ApiResponse({ status: 200, description: 'Historial de compras encontrado', type: [PurchaseDTO] })
  async getUserPurchaseHistory(@Param('idUser', ParseIntPipe) idUser: number): Promise<PurchaseDTO[] | null> {
    return await this.purchasesService.getUserPurchaseHistory(idUser);
  }
}