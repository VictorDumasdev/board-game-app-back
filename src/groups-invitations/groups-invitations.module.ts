import { Module } from '@nestjs/common';
import { GroupsInvitationsService } from './groups-invitations.service';
import { GroupsInvitationsController } from './groups-invitations.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UsersService } from 'src/users/users.service';
import { GroupsService } from 'src/groups/groups.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GroupsInvitationsController],
  providers: [GroupsInvitationsService, UsersService, GroupsService],
  exports: [GroupsInvitationsService]
})
export class GroupsInvitationsModule {}
