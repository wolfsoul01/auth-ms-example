import { Test, TestingModule } from '@nestjs/testing';
import { ServerToServerController } from './server-to-server.controller';
import { ServerToServerService } from './server-to-server.service';

describe('ServerToServerController', () => {
  let controller: ServerToServerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServerToServerController],
      providers: [ServerToServerService],
    }).compile();

    controller = module.get<ServerToServerController>(ServerToServerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
