import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { AcceptInvitationPayload } from 'src/invitations/invitations.type';
import { exclude } from 'src/utils/utils';


@Injectable()
export class GroupsService {
  
  constructor(
    private readonly databaseService: DatabaseService
  ) {}

  async create(createGroupDto: Prisma.GroupsCreateInput) {
    return this.databaseService.groups.create({
        data: {
          ...createGroupDto,
          users: {
            connect: {
              email: createGroupDto.adminUserEmail
            }
          }
        }
    })
  }

  async findAllGroupsForUser(userId: number) {
    const groups = await this.databaseService.groups.findMany({
      where: {
        users: {
          some: {
            id: userId
          }
        }
      },
      include: {
        users: true,
      }
    });

    return [...groups.map(group => ({ ...group, users: undefined, membersCount: group.users.length}))]
  }

  async findOne(id: number) {
      const group = await this.databaseService.groups.findUnique({
          where: {
              id
          },
          include: {
            users: true,
          }
      })
      return {
        ...group,
        users: group.users.map(user => exclude(user, 'password')),
        membersCount: group.users.length
      };
  }

  async findGroupsById(ids: number[]) {
    return await this.databaseService.groups.findMany({
      where: { id: { in: ids } }
    })
  }

  async update(id: number, updateGroupDto: Prisma.GroupsUpdateInput) {
      return this.databaseService.groups.update({
          where: {
              id
          },
          data: updateGroupDto
      })
  }

  async remove(id: number) {
    return this.databaseService.groups.delete({
        where: {
            id
        }
    })
  }

  async findGroupsContainingInvitationsIds(ids: number[]) {
    return await this.databaseService.groups.findMany({
      where: { invitationsId: { hasSome: ids } }
    })
  }

  async addUserToGroup(id: number, userToAdd: Prisma.UsersCreateInput) {
    return this.databaseService.groups.update({
      where: { id },
      data: {
        users: {
          connect: {
            email: userToAdd.email
          } 
        }
      }
    });
  }

  async addInvitation(groupId: number, invitationId: number) {
    return this.databaseService.groups.update({
      where: { id: groupId },
      data: {
        invitationsId: {
          push: invitationId
        }
      }
    })
  }

  async removeGroupInvitation(invitationId: number) {
    const groupToUpdate = await this.findGroupsContainingInvitationsIds([invitationId]);
    return this.databaseService.groups.update({
      where: { id: groupToUpdate[0].id },
      data: {
        invitationsId: {
          set: groupToUpdate[0].invitationsId.filter(groupInvitationId => groupInvitationId !== invitationId)
        }
      }
    })
  }

  async acceptGroupInvitation(payload: {acceptInvitationDto: AcceptInvitationPayload, receiverEmail: string}) {
    const groupToUpdate = await this.databaseService.groups.findUnique({
      where: { id: payload.acceptInvitationDto.targetId }
    })

    return this.databaseService.groups.update({
      where: { id: payload.acceptInvitationDto.targetId },
      data: {
        invitationsId: {
          set: groupToUpdate.invitationsId.filter(invitationId => invitationId !== payload.acceptInvitationDto.invitationId)
        },
        users: {
          connect: {
            email: payload.receiverEmail
          } 
        }
      }
    })
  }
}
