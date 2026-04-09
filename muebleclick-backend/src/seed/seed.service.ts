import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Rol } from '../roles/roles.entity';
import { Usuario } from '../usuarios/usuarios.entity';
import { Muebleria } from '../mueblerias/mueblerias.entity';
import { Producto } from '../productos/productos.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger('SeedService');

  constructor(
    @InjectRepository(Rol) private rolRepo: Repository<Rol>,
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
    @InjectRepository(Muebleria) private muebleriaRepo: Repository<Muebleria>,
    @InjectRepository(Producto) private productoRepo: Repository<Producto>,
  ) {}

  // Este método se ejecuta automáticamente al iniciar NestJS
  async onModuleInit() {
    await this.ejecutarSeed();
  }

  async ejecutarSeed() {
    // Si ya hay productos, detenemos el script para no duplicar datos
    const cantidadProductos = await this.productoRepo.count();
    if (cantidadProductos > 0) {
      this.logger.log('La base de datos ya tiene datos. Seed omitido.');
      return;
    }

    this.logger.log('Iniciando el sembrado (Seed) de la base de datos...');

    // 1. Crear Rol de Propietario
    const rolPropietario = await this.rolRepo.save({ nombre: 'propietario', descripcion: 'Dueño de Mueblería' });

    // 2. Crear un Usuario Propietario de Prueba
    const hashedPassword = await bcrypt.hash('Demo123!', 10);
    const propietario = await this.usuarioRepo.save({
      nombre: 'Carlos Muebles Demo',
      correo: 'propietario@muebleclick.com',
      password: hashedPassword,
      role_id: rolPropietario.id_rol,
      activo: true,
    });

    // 3. Crear su Mueblería
    const muebleria = await this.muebleriaRepo.save({
      nombre_negocio: 'Muebles Modernos MX',
      id_propietario: propietario.id_usuario,
      razon_social: 'Muebles Modernos SA de CV',
      rfc: 'MMX123456ABC',
      direccion_principal: 'Av. Reforma 123, CDMX',
      telefono: '55-1234-5678',
    });

    // 4. Insertar los Productos de tu prototipo original
    await this.productoRepo.save([
      {
        sku: 'SOF-MOD-001',
        id_muebleria: muebleria.id_muebleria,
        nombre: 'Sofá Moderno 3 Plazas',
        descripcion: 'Sofá de diseño contemporáneo con tapizado premium en tela antimanchas.',
        categoria: 'Salas',
        precio_venta: 12999.00,
        imagen_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
        peso_kg: 45.0,
        volumen_m3: 1.8,
      },
      {
        sku: 'MES-COM-001',
        id_muebleria: muebleria.id_muebleria,
        nombre: 'Mesa de Comedor Rústica',
        descripcion: 'Mesa de comedor de madera maciza estilo rústico para 6 personas.',
        categoria: 'Comedores',
        precio_venta: 8499.00,
        imagen_url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800',
        peso_kg: 35.0,
        volumen_m3: 0.9,
      },
      {
        sku: 'CAM-KIN-001',
        id_muebleria: muebleria.id_muebleria,
        nombre: 'Cama King Size Elegante',
        descripcion: 'Cama king size con cabecera tapizada y base de madera.',
        categoria: 'Recámaras',
        precio_venta: 15999.00,
        imagen_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
        peso_kg: 80.0,
        volumen_m3: 2.5,
      }
    ]);

    this.logger.log('✅ Seed completado con éxito. Mueblería y productos creados.');
  }
}