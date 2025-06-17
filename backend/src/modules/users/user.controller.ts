import { Controller, Get, Post, Put, Delete, Param, Body, Query, Patch, ParseIntPipe } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { User } from '../../entidades/user.entity';
import { UpdateUserDto } from './userDto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody} from '@nestjs/swagger';

@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener Todos los Usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de Usuarios', type: [User] })
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
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


  @Get()
  @ApiOperation({ summary: 'Busca los Usuarios cuyos datos contengan la cadena pasada por parametro' })
  @ApiParam({ name: 'search', type: String })
  @ApiResponse({ status: 200, description: 'Cadena Encontrada'})
  findAll(@Query('search') search: string) {
    return this.usersService.findAll(search);
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un Usuario'})
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Usuario Actualizado', type: User})
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }
  
}
