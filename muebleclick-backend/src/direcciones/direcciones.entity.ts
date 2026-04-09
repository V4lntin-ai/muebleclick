import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuarios.entity';

@ObjectType()
@Entity('Direcciones_Envio')
export class DireccionEnvio {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id_direccion!: number;

  @Field(() => Int)
  @Column()
  id_cliente!: number;

  @Field(() => Usuario, { nullable: true })
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_cliente' })
  cliente!: Usuario;

  // 🚨 Nuevos campos completos
  @Field()
  @Column({ type: 'varchar' })
  destinatario!: string;

  @Field()
  @Column({ type: 'varchar', length: 15 })
  telefono!: string;

  @Field()
  @Column({ type: 'varchar', length: 5 })
  codigo_postal!: string;

  @Field()
  @Column({ type: 'varchar' })
  estado!: string; // Temporal hasta enlazar la tabla Estados

  @Field()
  @Column({ type: 'varchar' })
  municipio!: string; // Temporal hasta enlazar la tabla Municipios

  @Field()
  @Column({ type: 'varchar' })
  colonia!: string;

  @Field()
  @Column({ type: 'varchar' })
  calle!: string;

  @Field()
  @Column({ type: 'varchar' })
  num_exterior!: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  num_interior!: string;

  @Field()
  @Column({ type: 'text' })
  referencias!: string;
}