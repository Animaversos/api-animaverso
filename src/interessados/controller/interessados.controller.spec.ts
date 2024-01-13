import { Test, TestingModule } from '@nestjs/testing';
import { InteressadosController } from './interessados.controller';
import { InteressadosService } from '../interessados.service';

describe('InteressadosController', () => {
  let controller: InteressadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InteressadosController],
      providers: [InteressadosService],
    }).compile();

    controller = module.get<InteressadosController>(InteressadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
