import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from '../usuarios/usuarios.entity';
import { DetallePedido } from './detalle-pedido.entity';

@ObjectType()
@Entity('Pedidos')
export class Pedido {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id_pedido!: number;

  @Field(() => Int)
  @Column()
  id_usuario!: number;

  @Field(() => Usuario)
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuario;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  id_direccion!: number;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total!: number;

  @Field()
  @Column({ type: 'varchar', default: 'pendiente' }) // pendiente, pagado, enviado, entregado
  estado!: string;

  @Field()
  @Column({ type: 'varchar', default: 'domicilio' })
  tipo_entrega!: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  fecha_pedido!: Date;

  // Relación con el detalle de los productos comprados
  @Field(() => [DetallePedido], { nullable: true })
  @OneToMany(() => DetallePedido, (detalle) => detalle.pedido, { cascade: true })
  detalles!: DetallePedido[];
}