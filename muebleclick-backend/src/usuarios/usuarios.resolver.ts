import { Resolver, Query } from '@nestjs/graphql';
import { Usuario } from './usuarios.entity';

@Resolver(() => Usuario)
export class UsuariosResolver {
  
  @Query(() => [Usuario], { name: 'obtenerUsuarios' })
  getAllUsuarios(): Usuario[] {
    return [];
  }
}