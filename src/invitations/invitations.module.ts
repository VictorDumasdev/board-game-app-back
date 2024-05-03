import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GameEventService } from 'src/game-event/game-event.service';
import { GroupsService } from 'src/groups/groups.service';
import { UsersService } from 'src/users/users.service';
import { InvitationsController } from './invitations.controller';
import { InvitationsService } from './invitations.service';
import { FriendsService } from 'src/friends/friends.service';

@Module({
  imports: [DatabaseModule],
  controllers: [InvitationsController],
  providers: [InvitationsService, UsersService, GroupsService, GameEventService, FriendsService],
  exports: [InvitationsService]
})
export class InvitationsModule {}
