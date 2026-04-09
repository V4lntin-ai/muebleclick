import { Int, Query } from '@nestjs/graphql';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CrearPedidoInput, CrearPedidoResponse } from './dto/crear-pedido.input';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { Pedido } from './pedidos.entity';

@Resolver()
export class PedidosResolver {
  constructor(private pedidosService: PedidosService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CrearPedidoResponse)
  crearPedido(
    @Args('input') input: CrearPedidoInput,
    @Context() context: any,
  ) {
    const userId = context.req.user.userId;
    
    return this.pedidosService.crearPedido(userId, input);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Pedido], { name: 'misPedidos' })
  getMisPedidos(@Context() context: any) {
    const userId = context.req.user.userId;
    return this.pedidosService.obtenerPedidosUsuario(userId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Pedido, { name: 'pedido' })
  getPedido(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: any
  ) {
    const userId = context.req.user.userId; // Sacamos el ID del Token
    return this.pedidosService.obtenerPedidoPorId(id, userId);
  }
}