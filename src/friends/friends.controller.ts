import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendPayload } from './friends.type';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post()
  create(@Body() createFriendPayload: CreateFriendPayload) {
    return this.friendsService.create(createFriendPayload);
  }

  @Get(':id')
  findAllFriendsForUser(@Param('id') userId: string) {
    return this.friendsService.findAllFriendsForUser(+userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendsService.remove(+id);
  }
}
