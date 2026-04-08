import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { Rol } from './roles.entity';

@Module({
  // Importamos la entidad aquí
  imports: [TypeOrmModule.forFeature([Rol])], 
  providers: [RolesResolver, RolesService]
})
export class RolesModule {}