import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GameEventController } from './game-event.controller';
import { GameEventService } from './game-event.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GameEventController],
  providers: [GameEventService],
  exports: [GameEventService]
})
export class GameEventModule {}
