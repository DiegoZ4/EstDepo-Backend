import { Test, TestingModule } from '@nestjs/testing';
import { TorneoService } from './torneo.service';

describe('TorneoService', () => {
  let service: TorneoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TorneoService],
    }).compile();

    service = module.get<TorneoService>(TorneoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
