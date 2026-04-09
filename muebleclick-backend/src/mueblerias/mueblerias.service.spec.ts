import { Test, TestingModule } from '@nestjs/testing';
import { MuebleriasService } from './mueblerias.service';

describe('MuebleriasService', () => {
  let service: MuebleriasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MuebleriasService],
    }).compile();

    service = module.get<MuebleriasService>(MuebleriasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
