import { Test, TestingModule } from '@nestjs/testing';
import { TablaController } from './tabla.controller';

describe('TablaController', () => {
  let controller: TablaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TablaController],
    }).compile();

    controller = module.get<TablaController>(TablaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
