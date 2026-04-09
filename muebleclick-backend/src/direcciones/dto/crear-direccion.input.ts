import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CrearDireccionInput {
  @Field() 
  destinatario!: string;
  
  @Field() 
  telefono!: string;

  @Field() 
  codigo_postal!: string;
  
  @Field() 
  estado!: string;
  
  @Field() 
  municipio!: string;
  
  @Field() 
  colonia!: string;
  
  @Field() 
  calle!: string;
  
  @Field() 
  num_exterior!: string;
  
  @Field({ nullable: true }) 
  num_interior?: string;
  
  @Field() 
  referencias!: string;
}