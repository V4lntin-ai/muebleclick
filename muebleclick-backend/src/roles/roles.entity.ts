import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType() // <- Decorador para GraphQL
@Entity('Roles') // <- Decorador para PostgreSQL
export class Rol {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id_rol!: number;

  @Field()
  @Column({ type: 'varchar' })
  nombre!: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  descripcion!: string;
}