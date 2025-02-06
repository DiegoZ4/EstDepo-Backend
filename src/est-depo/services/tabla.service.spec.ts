import { Test, TestingModule } from '@nestjs/testing';
import { TablaService } from './tabla.service';

describe('TablaService', () => {
  let service: TablaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TablaService],
    }).compile();

    service = module.get<TablaService>(TablaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
