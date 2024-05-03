import { Controller, Delete, Get, Param } from '@nestjs/common';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get(':id')
  findAllFriendsForUser(@Param('id') userId: string) {
    return this.friendsService.findAllFriendsForUser(+userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendsService.remove(+id);
  }
}
