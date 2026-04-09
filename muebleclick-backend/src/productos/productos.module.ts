import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosService } from './productos.service';
import { ProductosResolver } from './productos.resolver';
import { Producto } from './productos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto])], 
  providers: [ProductosResolver, ProductosService],
})
export class ProductosModule {}