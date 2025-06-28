import { Controller, Get, Post, Put, Delete, Param, Body, Query, Patch, ParseIntPipe } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { User } from '../../entidades/user.entity';
import { UpdateUserDto } from './userDto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('paginated')
  @ApiOperation({ summary: 'Obtener Usuarios Paginados' })
  @ApiQuery({ name: 'page', type: Number, required: false, description: 'Número de página', example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Límite de usuarios por página', example: 10 })
  @ApiQuery({ name: 'search', type: String, required: false, description: 'Término de búsqueda', example: '' })
  @ApiResponse({ status: 200, description: 'Lista de Usuarios Paginada', type: Object })
  async getAllPaginated(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('search') search: string = '',
  ): Promise<{ items: User[]; total: number }> {
    return this.usersService.findAllPaginated(page, limit, search);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener Todos los Usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de Usuarios', type: [User] })
  async getAllUsers(@Query('search') search: string = ''): Promise<User[]> {
    return this.usersService.findAll(search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un Usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario Encontrado', type: User })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado', type: User })
  @ApiBody({ type: User })
  create(@Body() user: Partial<User>) {
    return this.usersService.create(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Editar Información de un Usuario' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Usuario Editado', type: User })
  @ApiBody({ type: User })
  update(@Param('id', ParseIntPipe) id: number, @Body() user: Partial<User>) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un Usuario' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Usuario Eliminado' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar Estado del Usuario' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Estado del Usuario Actualizado', type: User })
  updateUserState(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }
}