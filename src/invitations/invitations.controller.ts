import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { AcceptInvitationPayload, CreateInvitation } from './invitations.type';
import { InvitationsType } from '@prisma/client';


@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post()
  create(@Body() createInvitationDto: CreateInvitation) {
    return this.invitationsService.create(createInvitationDto);
  }

  @Get('/type/:type/user/:userEmail')
  findAllInvitationsForUserOfType(@Param('type') type: InvitationsType, @Param('userEmail') userEmail: string) {
    return this.invitationsService.findAllInvitationsForUserOfType(type, userEmail);
  }

  @Get(':id')
  findAllInvitationsForUser(@Param('id') userEmail: string) {//TODO: use if for notif
    return this.invitationsService.findInvitationsForUser(userEmail);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removedInvitation = await this.invitationsService.remove(+id);
    return removedInvitation.id;
  }

  @Post('/accept')
  acceptInvitation(@Body() acceptInvitationDto: AcceptInvitationPayload) {
    return this.invitationsService.acceptInvitation(acceptInvitationDto);
  }
}
