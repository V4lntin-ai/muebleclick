import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Muebleria } from '../mueblerias/mueblerias.entity';
import { Inventario } from '../inventarios/inventarios.entity';

@ObjectType()
@Entity('Productos')
export class Producto {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id_producto!: number;

  @Field()
  @Column({ type: 'varchar', unique: true })
  sku!: string;

  @Field(() => Int)
  @Column()
  id_muebleria!: number;

  @Field(() => Muebleria)
  @ManyToOne(() => Muebleria)
  @JoinColumn({ name: 'id_muebleria' })
  muebleria!: Muebleria;

  @Field()
  @Column({ type: 'varchar' })
  nombre!: string;

  @Field()
  @Column({ type: 'text' })
  descripcion!: string;

  @Field()
  @Column({ type: 'varchar' })
  categoria!: string;

  @Field()
  @Column({ type: 'varchar', default: 'pieza' })
  unidad_medida!: string;

  @Field()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_venta!: number;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  imagen_url!: string;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  peso_kg!: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  volumen_m3!: number;

  @Field()
  @Column({ type: 'varchar', default: 'producto_final' })
  tipo_producto!: string;

  @Field()
  @Column({ type: 'boolean', default: true })
  activo!: boolean;

  @Field(() => Inventario, { nullable: true })
  @OneToOne(() => Inventario, (inventario) => inventario.producto)
  inventario!: Inventario;

}