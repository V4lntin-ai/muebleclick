import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DireccionesService } from './direcciones.service';
import { DireccionEnvio } from './direcciones.entity';
import { CrearDireccionInput } from './dto/crear-direccion.input';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver()
export class DireccionesResolver {
  constructor(private direccionesService: DireccionesService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [DireccionEnvio], { name: 'misDirecciones' })
  getMisDirecciones(@Context() context: any) {
    return this.direccionesService.obtenerMisDirecciones(context.req.user.userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DireccionEnvio)
  crearDireccion(
    @Args('input') input: CrearDireccionInput,
    @Context() context: any
  ) {
    return this.direccionesService.agregarDireccion(context.req.user.userId, input);
  }
}