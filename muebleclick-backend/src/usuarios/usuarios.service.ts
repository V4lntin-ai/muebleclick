import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuarios.entity';
import { RegisterInput } from '../auth/dto/auth.inputs';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findByCorreo(correo: string): Promise<Usuario | null> {
    // Buscamos al usuario por correo. 
    // Por defecto TypeORM no trae la columna password (por seguridad), así que forzamos que la traiga para poder compararla en el login
    return this.usuarioRepository.findOne({ 
      where: { correo },
      select: ['id_usuario', 'nombre', 'correo', 'password', 'role_id', 'activo'] 
    });
  }

  async crear(datos: RegisterInput): Promise<Usuario> {
    const nuevoUsuario = this.usuarioRepository.create({
      ...datos,
      role_id: datos.role_id || 1, // Rol 1 = Cliente por defecto
    });
    return this.usuarioRepository.save(nuevoUsuario);
  }

  async obtenerPerfil(id_usuario: number) {
    const usuario = await this.usuarioRepository.findOneBy({ id_usuario });
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    return usuario;
  }
}