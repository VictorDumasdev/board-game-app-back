import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersService } from 'src/users/users.service';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FriendsController],
  providers: [FriendsService, UsersService],
  exports: [FriendsService]
})
export class FriendsModule {}
