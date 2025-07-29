import { Test, TestingModule } from '@nestjs/testing';
import { PermisService } from './permis.service';

describe('PermisService', () => {
  let service: PermisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermisService],
    }).compile();

    service = module.get<PermisService>(PermisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
