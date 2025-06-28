import { Controller, Post, Get, Param, ParseIntPipe, Body, Query } from '@nestjs/common';
import { PurchasesService } from './purchase.service';
import { PurchaseDTO, PaginatedPurchaseDTO } from './DTO/purchase.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';

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
 * Controlador que maneja las operaciones relacionadas con las compras.
 */
@ApiTags('Purchases')
@ApiBearerAuth()
@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) { }

  /**
   * Obtiene todas las compras del sistema
   */
  @Get()
  @ApiOperation({ summary: 'Obtener todas las compras del sistema' })
  @ApiResponse({ status: 200, description: 'Listado completo de compras', type: [PurchaseDTO] })
  @ApiResponse({ status: 404, description: 'No se encontraron compras' })
  async getAllPurchases(): Promise<PurchaseDTO[]> {
    return this.purchasesService.getAllPurchases();
  }

  /**
   * Obtiene todas las compras del sistema con paginación
   */
  @Get('paginated')
  @ApiOperation({ summary: 'Obtener compras paginadas del sistema' })
  @ApiQuery({ name: 'page', type: Number, required: false, description: 'Página solicitada (basada en 1)', example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Cantidad de compras por página', example: 10 })
  @ApiResponse({ status: 200, description: 'Lista de compras paginada', type: PaginatedPurchaseDTO })
  async getAllPurchasesPaginated(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10
  ): Promise<PaginatedPurchaseDTO> {
    return this.purchasesService.getAllPurchasesPaginated(page, limit);
  }

  /**
   * Procesa una compra
   */
  @Post()
  @ApiOperation({ summary: 'Procesar compra de un usuario' })
  @ApiBody({ type: ProcessPurchaseDTO })
  @ApiResponse({ status: 200, description: 'Compra procesada exitosamente' })
  async processPurchase(@Body() body: ProcessPurchaseDTO) {
    await this.purchasesService.processPurchase(body.idUser, body.items);
    return { message: 'Compra procesada exitosamente' };
  }

  /**
   * Obtiene el historial de compras de un usuario
   */
  @Get(':idUser')
  @ApiOperation({ summary: 'Obtener historial de compras de un usuario' })
  @ApiParam({ name: 'idUser', type: Number })
  @ApiResponse({ status: 200, description: 'Historial de compras encontrado', type: [PurchaseDTO] })
  async getUserPurchaseHistory(@Param('idUser', ParseIntPipe) idUser: number): Promise<PurchaseDTO[] | null> {
    return await this.purchasesService.getUserPurchaseHistory(idUser);
  }
}