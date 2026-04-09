import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DireccionEnvio } from './direcciones.entity';
import { CrearDireccionInput } from './dto/crear-direccion.input';

@Injectable()
export class DireccionesService {
  constructor(
    @InjectRepository(DireccionEnvio)
    private direccionRepo: Repository<DireccionEnvio>,
  ) {}

  async obtenerMisDirecciones(id_cliente: number) {
    return this.direccionRepo.find({ where: { id_cliente } });
  }

  async agregarDireccion(id_cliente: number, input: CrearDireccionInput) {
    const nuevaDireccion = this.direccionRepo.create({
      id_cliente,
      ...input,
    });
    return this.direccionRepo.save(nuevaDireccion);
  }
}