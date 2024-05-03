import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { AcceptInvitationPayload } from 'src/invitations/invitations.type';
import { CreateGameEventPayload } from './game-event.types';


@Injectable()
export class GameEventService {
  constructor(
    private readonly databaseService: DatabaseService
  ) {}

  async create(createGameEventDto: CreateGameEventPayload) {
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

  async findGameEventsById(ids: number[]) {
    return await this.databaseService.gameEvent.findMany({
      where: { id: { in: ids } }
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

  async addInvitation(gameEventId: number, invitationId: number) {
    return this.databaseService.gameEvent.update({
      where: { id: gameEventId },
      data: {
        invitationsId: {
          push: invitationId
        }
      }
    })
  }

  async acceptEventInvitation(payload: {acceptInvitationDto: AcceptInvitationPayload, receiverEmail: string}) {
    const eventToUpdate = await this.databaseService.gameEvent.findUnique({
      where: { id: payload.acceptInvitationDto.targetId }
    })

    return this.databaseService.gameEvent.update({
      where: { id: payload.acceptInvitationDto.targetId },
      data: {
        invitationsId: {
          set: eventToUpdate.invitationsId.filter(invitationId => invitationId !== payload.acceptInvitationDto.invitationId)
        },
        participants: {
          connect: {
            email: payload.receiverEmail
          } 
        }
      }
    })
  }
}
