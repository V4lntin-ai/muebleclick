import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@ObjectType()
@Entity('Mueblerias')
export class Muebleria {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id_muebleria!: number;

  @Field()
  @Column({ type: 'varchar' })
  nombre_negocio!: string;

  @Field(() => Int)
  @Column()
  id_propietario!: number;

  @Field()
  @Column({ type: 'varchar' })
  razon_social!: string;

  @Field()
  @Column({ type: 'varchar' })
  rfc!: string;

  @Field()
  @Column({ type: 'text' })
  direccion_principal!: string;

  @Field()
  @Column({ type: 'varchar' })
  telefono!: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  creado_en!: Date;
}