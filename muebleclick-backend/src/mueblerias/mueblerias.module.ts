import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MuebleriasService } from './mueblerias.service';
import { MuebleriasResolver } from './mueblerias.resolver';
import { Muebleria } from './mueblerias.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Muebleria])], 
  providers: [MuebleriasResolver, MuebleriasService],
})
export class MuebleriasModule {}