import { Test, TestingModule } from '@nestjs/testing';
import { GolesController } from './goles.controller';

describe('GolesController', () => {
  let controller: GolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GolesController],
    }).compile();

    controller = module.get<GolesController>(GolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
