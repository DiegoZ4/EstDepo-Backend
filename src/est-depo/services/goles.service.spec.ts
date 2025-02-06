import { Test, TestingModule } from '@nestjs/testing';
import { GolesService } from './goles.service';

describe('GolesService', () => {
  let service: GolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GolesService],
    }).compile();

    service = module.get<GolesService>(GolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
