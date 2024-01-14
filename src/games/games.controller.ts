import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GamesService } from './games.service';
import { Prisma } from '@prisma/client';


@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}

    @Post()
    create(@Body() createGameDto: Prisma.GamesCreateInput[]) {
        const response = [];
        createGameDto.forEach(item => response.push(this.gamesService.create(item)))
        return response;
    }

    @Get()
    findAll() {
        return this.gamesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.gamesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGameDto: Prisma.GamesUpdateInput) {
        return this.gamesService.update(+id, updateGameDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.gamesService.remove(+id);
    }
}
