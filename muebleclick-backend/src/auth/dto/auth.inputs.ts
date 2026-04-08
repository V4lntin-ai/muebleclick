import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  correo!: string;

  @Field()
  password!: string;
}

@InputType()
export class RegisterInput {
  @Field()
  nombre!: string;

  @Field()
  correo!: string;

  @Field()
  password!: string;

  @Field({ nullable: true })
  role_id?: number; // Por defecto lo haremos cliente (Rol 1) si no se envía
}