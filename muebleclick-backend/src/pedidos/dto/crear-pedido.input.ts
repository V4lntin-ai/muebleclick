import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class PedidoItemInput {
  @Field(() => Int)
  idProducto!: number;

  @Field(() => Int)
  cantidad!: number;
}

@InputType()
export class CrearPedidoInput {
  @Field(() => [PedidoItemInput])
  items!: PedidoItemInput[];

  @Field()
  tipoEntrega!: string;

  @Field(() => Int)
  idDireccion!: number;
}

@ObjectType()
export class CrearPedidoResponse {
  @Field()
  success!: boolean;

  @Field({ nullable: true })
  message?: string;

  @Field(() => Int, { nullable: true })
  id?: number;
}