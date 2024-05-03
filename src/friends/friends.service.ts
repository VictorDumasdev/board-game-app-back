import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class FriendsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UsersService
  ) {}

  async acceptFriendInvitation(currentUserId: number, senderEmail: string) {
    const friendUser = await this.userService.findOne(senderEmail)
    const friend = await this.databaseService.friends.create({
        data: {
          receiverUserId: currentUserId,
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
