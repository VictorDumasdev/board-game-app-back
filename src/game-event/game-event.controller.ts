import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GameEventService } from './game-event.service';


@Controller('game-event')
export class GameEventController {
  constructor(private readonly gameEventService: GameEventService) {}

  @Post()
  create(@Body() createGameEventDto: Prisma.GameEventCreateInput) {//TODO: use CreateGameEventPayload
    return this.gameEventService.create(createGameEventDto);
  }

  @Get()
  findAll() {
    return this.gameEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameEventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameEventDto: Prisma.GameEventUpdateInput) {
    return this.gameEventService.update(+id, updateGameEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameEventService.remove(+id);
  }
}
