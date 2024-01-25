import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class GamesService {
    constructor(private readonly databaseService: DatabaseService) {}

    async create(createGameDto: Prisma.GamesCreateInput) {
        return this.databaseService.games.upsert({
            create: createGameDto,
            update: createGameDto,
            where: { bggId: createGameDto.bggId }
        })
    }

    async findAll() {
        return this.databaseService.games.findMany();
    }

    async findOne(id: number) {
        return this.databaseService.games.findFirst({
            where: { id }
        })
    }

    async update(id: number, updateGameDto: Prisma.GamesUpdateInput) {
        return this.databaseService.games.update({
            where: { id },
            data: updateGameDto
        })
    }

    async remove(id: number) {
        return this.databaseService.games.delete({
            where: { id }
        })
    }
}
