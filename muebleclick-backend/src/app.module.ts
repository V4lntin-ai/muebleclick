import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RolesModule } from './roles/roles.module';
import { Rol } from './roles/roles.entity';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/usuarios.entity';
import { AuthModule } from './auth/auth.module';
import { MuebleriasModule } from './mueblerias/mueblerias.module';
import { Muebleria } from './mueblerias/mueblerias.entity';
import { ProductosModule } from './productos/productos.module';
import { Producto } from './productos/productos.entity';
import { SeedModule } from './seed/seed.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { Pedido } from './pedidos/pedidos.entity';
import { DetallePedido } from './pedidos/detalle-pedido.entity';
import { DireccionesModule } from './direcciones/direcciones.module';
import { DireccionEnvio } from './direcciones/direcciones.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'qawsedrftg',
      database: 'muebleclick_db', 
      entities: [Rol, Usuario, Muebleria, Producto, Pedido, DetallePedido, DireccionEnvio], 
      synchronize: true,
    }),
    RolesModule,
    UsuariosModule,
    AuthModule,
    MuebleriasModule,
    ProductosModule,
    SeedModule,
    PedidosModule,
    DireccionesModule,
  ],
})
export class AppModule {}