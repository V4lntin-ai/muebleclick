import { Resolver, Query, Args, ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductosService } from './productos.service';
import { Producto } from './productos.entity';

@ObjectType()
export class PaginatedProductos {
  @Field(() => [Producto])
  items!: Producto[];

  @Field(() => Int)
  total!: number;
}

@ObjectType()
export class CategoriaOutput {
  @Field()
  nombre!: string;
}

@Resolver(() => Producto)
export class ProductosResolver {
  constructor(private productosService: ProductosService) {}

  @Query(() => PaginatedProductos, { name: 'productos' })
  getProductos(
    @Args('categoria', { nullable: true }) categoria?: string,
    @Args('search', { nullable: true }) search?: string,
  ) {
    return this.productosService.findAll(categoria, search);
  }

  @Query(() => [CategoriaOutput], { name: 'categorias' })
  getCategorias() {
    return this.productosService.getCategorias();
  }

  @Query(() => Producto, { name: 'producto', nullable: true })
  getProducto(@Args('id', { type: () => Int }) id: number) {
    return this.productosService.findOne(id);
  }
}