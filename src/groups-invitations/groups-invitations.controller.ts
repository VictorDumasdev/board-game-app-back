import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { createInvitationGroups } from 'src/invitations/invitations.type';
import { GroupsInvitationsService } from './groups-invitations.service';


@Controller('groups-invitations')
export class GroupsInvitationsController {
  constructor(private readonly groupsInvitationsService: GroupsInvitationsService) {}

  @Post()
  create(@Body() createGroupsInvitationDto: createInvitationGroups) {
    return this.groupsInvitationsService.create(createGroupsInvitationDto);
  }

  @Get(':id')
  findGroupInvitationsForUser(@Param('id') userEmail: string) {
    return this.groupsInvitationsService.findGroupInvitationsForUser(userEmail);
  }
  
  @Post('/accept')
  acceptGroupInvitation(@Body() payload: { invitationId: number }) {
    return this.groupsInvitationsService.acceptGroupInvitation(payload.invitationId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsInvitationsService.remove(+id);
  }
}
