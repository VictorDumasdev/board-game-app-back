import { Test, TestingModule } from '@nestjs/testing';
import { GroupsInvitationsController } from './groups-invitations.controller';
import { GroupsInvitationsService } from './groups-invitations.service';

describe('GroupsInvitationsController', () => {
  let controller: GroupsInvitationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsInvitationsController],
      providers: [GroupsInvitationsService],
    }).compile();

    controller = module.get<GroupsInvitationsController>(GroupsInvitationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
