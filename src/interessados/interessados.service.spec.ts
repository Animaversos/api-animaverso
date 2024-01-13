import { Test, TestingModule } from '@nestjs/testing';
import { InteressadosService } from './interessados.service';

describe('InteressadosService', () => {
  let service: InteressadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InteressadosService],
    }).compile();

    service = module.get<InteressadosService>(InteressadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
