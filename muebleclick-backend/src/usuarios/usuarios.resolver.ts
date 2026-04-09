import { Resolver, Query, Context } from '@nestjs/graphql';
import { Usuario } from './usuarios.entity';
import { UsuariosService } from './usuarios.service';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';

@Resolver(() => Usuario)
export class UsuariosResolver {
  constructor(private usuariosService: UsuariosService) {} 
  
  @Query(() => [Usuario], { name: 'obtenerUsuarios' })
  getAllUsuarios(): Usuario[] {
    return [];
  }

  @UseGuards(GqlAuthGuard) 
  @Query(() => Usuario, { name: 'perfil' })
  getPerfil(@Context() context: any) {
    const userId = context.req.user.userId;
    return this.usuariosService.obtenerPerfil(userId);
  }
}