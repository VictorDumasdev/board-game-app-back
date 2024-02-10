import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { createInvitation } from './invitations.type';


@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post()
  create(@Body() createInvitationDto: createInvitation) {
    return this.invitationsService.create(createInvitationDto);
  }

  @Get(':id')
  findAllInvitationsForUser(@Param('id') userEmail: string) {
    return this.invitationsService.findInvitationsForUser(userEmail);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitationsService.remove(+id);
  }
}
