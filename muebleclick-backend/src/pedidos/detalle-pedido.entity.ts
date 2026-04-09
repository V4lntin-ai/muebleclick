import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from './pedidos.entity';
import { Producto } from '../productos/productos.entity';

@ObjectType()
@Entity('Detalle_Pedidos')
export class DetallePedido {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id_detalle!: number;

  @Field(() => Int)
  @Column()
  id_pedido!: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.detalles)
  @JoinColumn({ name: 'id_pedido' })
  pedido!: Pedido;

  @Field(() => Int)
  @Column()
  id_producto!: number;

  @Field(() => Producto)
  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'id_producto' })
  producto!: Producto;

  @Field(() => Int)
  @Column()
  cantidad!: number;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_unitario!: number;
}