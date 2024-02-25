import { Test, TestingModule } from '@nestjs/testing';
import { GroupsInvitationsService } from './groups-invitations.service';

describe('GroupsInvitationsService', () => {
  let service: GroupsInvitationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupsInvitationsService],
    }).compile();

    service = module.get<GroupsInvitationsService>(GroupsInvitationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
