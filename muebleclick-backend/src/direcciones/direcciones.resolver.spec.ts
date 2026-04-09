import { Test, TestingModule } from '@nestjs/testing';
import { DireccionesResolver } from './direcciones.resolver';

describe('DireccionesResolver', () => {
  let resolver: DireccionesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DireccionesResolver],
    }).compile();

    resolver = module.get<DireccionesResolver>(DireccionesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
