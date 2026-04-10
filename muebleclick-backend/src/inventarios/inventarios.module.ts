import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventario } from './inventarios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inventario])],
  exports: [TypeOrmModule],
})
export class InventariosModule {}