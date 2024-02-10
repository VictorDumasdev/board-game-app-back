import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from 'src/users/users.service';
import { createInvitation } from './invitations.type';


@Injectable()
export class InvitationsService {
  constructor(private readonly databaseService: DatabaseService, private readonly userService: UsersService) {}

  async create(createInvitationDto: createInvitation) {
      const targetUser = await this.userService.findOne(createInvitationDto.receiverEmail);
      if(!targetUser) {
        return { error: "This user doesn't exist"};
      }
      return this.databaseService.invitations.create({
          data: {
            ...createInvitationDto,
            receiverNickname: targetUser.nickname,
            creationDate: new Date()
          }
      });
  }

  async findInvitationsForUser(userEmail: string) {
      const invitationsSent = await this.databaseService.invitations.findMany({
          where: { senderEmail: userEmail }
      })

      const invitationsReceived = await this.databaseService.invitations.findMany({
        where: { receiverEmail: userEmail }
      })

      return { invitationsSent, invitationsReceived }
  }

  async remove(id: number) {
      const invitationDelete =  await this.databaseService.invitations.delete({
          where: { id }
      })
      return invitationDelete.id
  }
}
