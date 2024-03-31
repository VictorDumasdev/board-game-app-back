import { Module } from '@nestjs/common';
import { GameEventService } from './game-event.service';
import { GameEventController } from './game-event.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [GameEventController],
  providers: [GameEventService],
})
export class GameEventModule {}
