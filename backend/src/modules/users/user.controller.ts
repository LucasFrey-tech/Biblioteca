import { Controller, Get, Post, Put, Delete, Param, Body, Query, Patch } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { User } from '../../entidades/user.entity';
import { UpdateUserDto } from './userDto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() user: Partial<User>) {
    return this.usersService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: Partial<User>) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }

  @Get()
  findAll(@Query('search') search: string) {
  return this.usersService.findAll(search);
}

// PATCH /users/:id
  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto) {
  return this.usersService.update(id, dto);
}
  
}
