import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { GameEventService } from 'src/game-event/game-event.service';
import { GroupsService } from 'src/groups/groups.service';
import { UsersService } from 'src/users/users.service';
import { AcceptInvitationPayload, CreateInvitation } from './invitations.type';
import { FriendsService } from 'src/friends/friends.service';
import { InvitationsType } from '@prisma/client';


@Injectable()
export class InvitationsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UsersService,
    private readonly groupService: GroupsService,
    private readonly gameEventService: GameEventService,
    private readonly friendService: FriendsService
    ) {}

  async create(createInvitationDto: CreateInvitation) {
    const { receiverEmail, senderEmail, senderNickname, type } = {...createInvitationDto}
    const targetUser = await this.userService.findOne(receiverEmail);

    if(!targetUser) {
      return { error: "This user doesn't exist"};
    }

    const createdInvitation = await this.databaseService.invitations.create({
        data: {
          senderEmail,
          senderNickname,
          receiverEmail,
          receiverNickname: targetUser.nickname,
          type,
          creationDate: new Date()
        }
    });

    if(type === 'GROUP' && createInvitationDto.groupId) {
      const updatedGroup = await this.groupService.addInvitation(createInvitationDto.groupId, createdInvitation.id);
      return { ...createdInvitation, groupId: updatedGroup.id };
    } else if(type === 'EVENT' && createInvitationDto.eventId) {
      const updatedEvent = await this.gameEventService.addInvitation(createInvitationDto.groupId, createdInvitation.id);
      return { ...createdInvitation, eventId: updatedEvent.id };
    } else {
      return createdInvitation;
    }
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

  async findAllInvitationsForUserOfType(type: InvitationsType, userEmail: string) {

    const invitationsReceived = await this.databaseService.invitations.findMany({
      where: { 
        AND: [
          { receiverEmail: userEmail },
          { type },
        ]  
      }
    })
    const invitationsId = invitationsReceived.map(invitation => invitation.id);

    switch(type) {
      case InvitationsType.FRIEND:
        const invitationsSent =  await this.databaseService.invitations.findMany({
          where: { 
            AND: [
              { senderEmail: userEmail },
              { type },
            ]  
          }
        });
        const invitations = invitationsReceived.concat(invitationsSent).map(invitation => ({ ...invitation, isReiceived: invitation.receiverEmail === userEmail }))

        return { invitations, type };

      case InvitationsType.GROUP:
        const groups = await this.groupService.findGroupsContainingInvitationsIds(invitationsId);
        const groupInvitations =  invitationsReceived.map(invitation => ({
          ...invitation,
          group: groups.filter(group => group.invitationsId.includes(invitation.id))[0]
        }));

        return { invitations: groupInvitations, type };

      case InvitationsType.EVENT:
        const events = await this.gameEventService.findGameEventsById(invitationsId);
        const eventInvitations =   invitationsReceived.map(invitation => ({
          ...invitation,
          event: events.filter(event => event.invitationsId.includes(invitation.id))[0]
        }));
        return { invitations: eventInvitations, type };

    }
}

  async remove(id: number) {
    const deletedInvitation = await this.databaseService.invitations.delete({
        where: { id }
    })

    switch(deletedInvitation.type) {
      case 'GROUP': 
        await this.groupService.removeGroupInvitation(deletedInvitation.id);
        break;
      // case 'EVENT': 
      //   await this.gameEventService.acceptEventInvitation({ acceptInvitationDto, receiverEmail: deletedInvitation.receiverEmail });
      //   break;
    }
    console.log(deletedInvitation)

    return deletedInvitation;
  }

  async acceptInvitation(acceptInvitationDto: AcceptInvitationPayload) {
    const deletedInvitation = await this.remove(acceptInvitationDto.invitationId);
    let response;

    switch(deletedInvitation.type) {
      case 'FRIEND': 
        response = await this.friendService.acceptFriendInvitation(acceptInvitationDto.targetId, deletedInvitation.senderEmail);
        break;
      case 'GROUP': 
        response = await this.groupService.acceptGroupInvitation({ acceptInvitationDto, receiverEmail: deletedInvitation.receiverEmail });
        break;
      case 'EVENT': 
        response = await this.gameEventService.acceptEventInvitation({ acceptInvitationDto, receiverEmail: deletedInvitation.receiverEmail });
        break;
    }
    return await { response, type: deletedInvitation.type, deletedInvitationId: deletedInvitation.id }
  }
}
