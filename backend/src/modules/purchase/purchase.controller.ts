import { Controller, Post, Get, Param, ParseIntPipe, Body, Query } from '@nestjs/common';
import { PurchasesService } from './purchase.service';
import { PurchaseDTO, PaginatedPurchaseDTO } from './DTO/purchase.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody, ApiQuery, ApiProperty } from '@nestjs/swagger';

class PurchaseItemDTO {
  cartItemId: number;
  amount: number;
  virtual: boolean;
  discount: number;
}

class ProcessPurchaseDTO {
  @ApiProperty({ example: 1, description: "ID Único del Usuario" })
  idUser: number;
  @ApiProperty({
    description: 'Lista de ítems a procesar en la compra',
    type: [PurchaseItemDTO],
    example: [
      {
        idBook: 15,
        title: 'El Hobbit',
        amount: 2,
        price: 499.99,
        virtual: false,
      },
      {
        idBook: 18,
        title: 'El Señor de los Anillos',
        amount: 1,
        price: 899.99,
        virtual: true,
      },
    ],
  })
  items: PurchaseItemDTO[];

  @ApiProperty({
    example: 1899.97,
    description: 'Total de la compra (suma de todos los ítems)',
  })
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
  @ApiResponse({ status: 200, description: 'Listado completo de compras', type: PurchaseDTO, isArray: true })
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
  @ApiQuery({ name: 'search', type: String, required: false, description: 'Término de búsqueda por username', example: '' })
  @ApiResponse({ status: 200, description: 'Lista de compras paginada', type: PaginatedPurchaseDTO })
  async getAllPurchasesPaginated(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('search') search: string = ''
  ): Promise<PaginatedPurchaseDTO> {
    return this.purchasesService.getAllPurchasesPaginated(page, limit, search);
  }

  /**
   * Procesa una compra
   */
  @Post()
  @ApiOperation({ summary: 'Procesar compra de un usuario' })
  @ApiBody({ type: ProcessPurchaseDTO })
  @ApiResponse({ status: 201, description: 'Compra procesada exitosamente' })
  async processPurchase(@Body() body: ProcessPurchaseDTO) {
    await this.purchasesService.processPurchase(body.idUser, body.items);
    return { message: 'Compra procesada exitosamente' };
  }

  /**
   * Obtiene el historial de compras de un usuario
   */
  @Get(':idUser/paginated')
  @ApiOperation({ summary: 'Obtener historial de compras paginado de un usuario' })
  @ApiParam({ name: 'idUser', type: Number })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiResponse({ status: 200, description: 'Historial de compras paginado', type: Object })
  async getUserPurchaseHistoryPaginated(
    @Param('idUser', ParseIntPipe) idUser: number,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<{ items: PurchaseDTO[], total: number, page: number, limit: number }> {
    const [items, total] = await this.purchasesService.getUserPurchaseHistoryPaginated(idUser, page, limit);
    return { items, total, page, limit };
  }
}