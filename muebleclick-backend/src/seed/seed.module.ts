import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Rol } from '../roles/roles.entity';
import { Usuario } from '../usuarios/usuarios.entity';
import { Muebleria } from '../mueblerias/mueblerias.entity';
import { Producto } from '../productos/productos.entity';
import { Inventario } from '../inventarios/inventarios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rol, Usuario, Muebleria, Producto, Inventario])
  ],
  providers: [SeedService]
})
export class SeedModule {}