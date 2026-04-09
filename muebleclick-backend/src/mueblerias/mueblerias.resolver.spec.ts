import { Test, TestingModule } from '@nestjs/testing';
import { MuebleriasResolver } from './mueblerias.resolver';

describe('MuebleriasResolver', () => {
  let resolver: MuebleriasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MuebleriasResolver],
    }).compile();

    resolver = module.get<MuebleriasResolver>(MuebleriasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
