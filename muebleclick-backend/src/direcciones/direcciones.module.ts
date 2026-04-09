import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DireccionesService } from './direcciones.service';
import { DireccionesResolver } from './direcciones.resolver';
import { DireccionEnvio } from './direcciones.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([DireccionEnvio])], 
  providers: [DireccionesResolver, DireccionesService]
})
export class DireccionesModule {}