import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from 'src/users/users.service';
import { exclude } from 'src/utils/utils';


@Injectable()
export class GroupsService {
  
  constructor(private readonly databaseService: DatabaseService, private readonly usersService: UsersService) {}

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
        groupInvitations: true
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
            groupInvitations: true
          }
      })
      return {
        ...group,
        users: group.users.map(user => exclude(user, 'password')),
        membersCount: group.users.length
      };
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

  async addUserToGroup(id: number, userToAdd: Prisma.UsersCreateInput) {
    console.log(id, userToAdd.email)
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
}
