import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { GroupsService } from 'src/groups/groups.service';
import { createInvitationGroups } from 'src/invitations/invitations.type';
import { UsersService } from 'src/users/users.service';
import { exclude } from 'src/utils/utils';

@Injectable()
export class GroupsInvitationsService {
  constructor(private readonly databaseService: DatabaseService, private readonly userService: UsersService, private readonly groupService: GroupsService) {}

  async create(createGroupInvitationDto: createInvitationGroups) {
    const targetUser = await this.userService.findOne(createGroupInvitationDto.receiverEmail);
    if(!targetUser) {
      return { error: "This user doesn't exist"};
    }
    const groupInvitation = await this.databaseService.groupsInvitation.create({
        data: {
          ...createGroupInvitationDto,
          receiverNickname: targetUser.nickname,
          creationDate: new Date(),
        },
        include: {
          group: true
        }
    });

    return exclude(groupInvitation, 'group');
  }

  async findGroupInvitationsForUser(userEmail: string) {
      return this.databaseService.groupsInvitation.findMany({
          where: { receiverEmail: userEmail },
          include: {
            group: true
          }
      })
  }

  async acceptGroupInvitation(id: number) {
    const deletedInvitation = await this.databaseService.groupsInvitation.delete({
        where: { id }
    });

    const userToAdd = await this.userService.findOne(deletedInvitation.receiverEmail);
    const updatedGroup = await this.groupService.addUserToGroup(deletedInvitation.groupId, userToAdd);
    
    return { deletedInvitationId: deletedInvitation.id, updatedGroup };
  }

  async remove(id: number) {
    const deleteInvitation = await this.databaseService.groupsInvitation.delete({
        where: { id }
    })

    return deleteInvitation.id;
  }

}
