import { Test, TestingModule } from '@nestjs/testing';
import { TorneoController } from './torneo.controller';

describe('TorneoController', () => {
  let controller: TorneoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TorneoController],
    }).compile();

    controller = module.get<TorneoController>(TorneoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
