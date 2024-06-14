import { Test, TestingModule } from '@nestjs/testing';
import { ServerToServerService } from './server-to-server.service';

describe('ServerToServerService', () => {
  let service: ServerToServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerToServerService],
    }).compile();

    service = module.get<ServerToServerService>(ServerToServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
