import { Test, TestingModule } from '@nestjs/testing';
import { PermisController } from './permis.controller';
import { PermisService } from './permis.service';

describe('PermisController', () => {
  let controller: PermisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermisController],
      providers: [PermisService],
    }).compile();

    controller = module.get<PermisController>(PermisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
