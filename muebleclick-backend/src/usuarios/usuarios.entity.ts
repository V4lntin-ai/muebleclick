import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Rol } from '../roles/roles.entity';

@ObjectType()
@Entity('Usuarios')
export class Usuario {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id_usuario!: number;

  @Field()
  @Column({ type: 'varchar' })
  nombre!: string;

  @Field()
  @Column({ type: 'varchar', unique: true }) // El correo debe ser único
  correo!: string;

  // 🚨 OMITIMOS el @Field() por seguridad, GraphQL nunca enviará esto al Frontend
  @Column({ type: 'varchar' })
  password!: string;

  @Field(() => Int)
  @Column()
  role_id!: number;

  // 🔗 Aquí hacemos la relación (Llave Foránea) con la tabla Roles
  @Field(() => Rol)
  @ManyToOne(() => Rol)
  @JoinColumn({ name: 'role_id' }) // Esto le dice a Postgres que use esta columna para enlazar
  rol!: Rol;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  fecha_registro!: Date;

  @Field()
  @Column({ type: 'boolean', default: true })
  activo!: boolean;
}