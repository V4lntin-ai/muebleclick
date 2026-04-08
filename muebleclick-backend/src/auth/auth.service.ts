import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { LoginInput, RegisterInput } from './dto/auth.inputs';
import { LoginResponse } from './dto/login-response';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async register(input: RegisterInput): Promise<LoginResponse> {
    const existe = await this.usuariosService.findByCorreo(input.correo);
    if (existe) throw new BadRequestException('El correo ya está registrado');

    const hashedPassword = await bcrypt.hash(input.password, 10);
    
    const usuario = await this.usuariosService.crear({
      ...input,
      password: hashedPassword,
    });

    return this.generarToken(usuario);
  }

  async login(input: LoginInput): Promise<LoginResponse> {
    const usuario = await this.usuariosService.findByCorreo(input.correo);
    if (!usuario) throw new UnauthorizedException('Credenciales inválidas');

    const passwordValida = await bcrypt.compare(input.password, usuario.password);
    if (!passwordValida) throw new UnauthorizedException('Credenciales inválidas');

    return this.generarToken(usuario);
  }

  private generarToken(usuario: any): LoginResponse {
    const payload = { sub: usuario.id_usuario, email: usuario.correo, role: usuario.role_id };
    return {
      access_token: this.jwtService.sign(payload),
      usuario: usuario,
    };
  }
}