import { Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [InvitationsController],
  providers: [InvitationsService, UsersService],
  exports: [InvitationsService]
})
export class InvitationsModule {}
