import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { InvitationsService } from 'src/invitations/invitations.service';
import { UsersService } from 'src/users/users.service';
import { CreateFriendPayload } from './friends.type';


@Injectable()
export class FriendsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UsersService,
    private readonly invitationService: InvitationsService
  ) {}

  async create(createFriendPayload: CreateFriendPayload) {
    const deletedInvitation = await this.invitationService.remove(createFriendPayload.invitationId);
    const friendUser = await this.userService.findOne(deletedInvitation.senderEmail)
    const friend = await this.databaseService.friends.create({
        data: {
          receiverUserId: createFriendPayload.currentUserId,
          senderUserId: friendUser.id
        }
    });

    return { ...friendUser, friendId: friend.id }
  }

  async findAllFriendsForUser(userId: number) {
    const friends = await this.databaseService.friends.findMany({
        where: { 
          OR: [
            { senderUserId: userId },
            { receiverUserId: userId },
          ]
        }
    })

    const friendsUserId = friends.map(friend => friend.receiverUserId !== userId ? friend.receiverUserId : friend.senderUserId);
    const friendUsers = await this.userService.findMany(friendsUserId);
    return friendUsers.map(friendUser => {
      return {
        ...friendUser,
        friendId: friends.filter(friend => friend.receiverUserId === friendUser.id || friend.senderUserId === friendUser.id)[0].id
      }
    })
  }

  async remove(id: number) {
      const deletedFriend = await this.databaseService.friends.delete({
          where: { id }
      })
      return deletedFriend.id
  }
}
