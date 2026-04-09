import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosService } from './pedidos.service';
import { PedidosResolver } from './pedidos.resolver';
import { Pedido } from './pedidos.entity';
import { DetallePedido } from './detalle-pedido.entity';
import { Producto } from '../productos/productos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, DetallePedido, Producto])],
  providers: [PedidosResolver, PedidosService]
})
export class PedidosModule {}