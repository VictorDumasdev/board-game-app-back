import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class GameEventService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createGameEventDto: Prisma.GameEventCreateInput) {
      return this.databaseService.gameEvent.create({
          data: { ...createGameEventDto }
      })
  }

  async findAll() {
      return this.databaseService.gameEvent.findMany();
  }

  async findOne(id: number) {
      return this.databaseService.gameEvent.findFirst({
          where: { id }
      })
  }

  async update(id: number, updateGameEventDto: Prisma.GameEventUpdateInput) {
      return this.databaseService.gameEvent.update({
          where: { id },
          data: updateGameEventDto
      })
  }

  async remove(id: number) {
      return this.databaseService.gameEvent.delete({
          where: { id }
      })
  }
}
