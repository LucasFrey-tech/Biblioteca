import { Controller, Get, Post, Body, Param, ParseIntPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "src/entities/user.entity";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id:number): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Post()
    async create(@Body() user: Partial<User>): Promise<User> {
        return this.usersService.create(user);
    }
}