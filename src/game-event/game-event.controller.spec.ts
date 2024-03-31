import { Test, TestingModule } from '@nestjs/testing';
import { GameEventController } from './game-event.controller';
import { GameEventService } from './game-event.service';

describe('GameEventController', () => {
  let controller: GameEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameEventController],
      providers: [GameEventService],
    }).compile();

    controller = module.get<GameEventController>(GameEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
