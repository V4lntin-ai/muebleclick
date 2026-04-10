import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Producto } from '../productos/productos.entity';

@ObjectType()
@Entity('Inventarios')
export class Inventario {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id_inventario!: number;

  @Field(() => Int)
  @Column()
  id_producto!: number;

  @Field(() => Int)
  @Column({ default: 0 })
  cantidad_disponible!: number;

  @Field()
  @Column({ type: 'varchar', default: 'Almacén Central' })
  ubicacion!: string;

  @OneToOne(() => Producto, (producto) => producto.inventario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_producto' })
  producto!: Producto;
}