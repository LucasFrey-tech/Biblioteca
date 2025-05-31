import { Controller, Get, Param, Delete } from "@nestjs/common";
import { AuthorService } from "./author.service";

@Controller('authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) { }

    @Get()
    findAll() {
        return this.authorService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.authorService.findOne(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.authorService.remove(+id);
    }
}