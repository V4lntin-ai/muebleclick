import { Resolver, Query } from '@nestjs/graphql';
import { Rol } from './roles.entity';

@Resolver(() => Rol)
export class RolesResolver {
  
  @Query(() => [Rol], { name: 'obtenerRoles' })
  getAllRoles(): Rol[] {
    return [
      { id_rol: 1, nombre: 'Admin', descripcion: 'Acceso total' },
      { id_rol: 2, nombre: 'Cliente', descripcion: 'Comprador' }
    ];
  }
}