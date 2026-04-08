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
      entities: [Rol, Usuario], 
      synchronize: true, // Lo dejamos en true por ahora para que cree las tablas automáticamente
    }),
    RolesModule,
    UsuariosModule,
    AuthModule,
  ],
})
export class AppModule {}