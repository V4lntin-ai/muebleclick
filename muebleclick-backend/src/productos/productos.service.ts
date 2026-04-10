import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './productos.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,
  ) {}

  async findAll(categoria?: string, search?: string) {
    const query = this.productoRepo.createQueryBuilder('producto');
    
    if (categoria) {
      query.andWhere('producto.categoria = :categoria', { categoria });
    }
    
    if (search) {
      query.andWhere('LOWER(producto.nombre) LIKE LOWER(:search)', { search: `%${search}%` });
    }

    const [items, total] = await query.getManyAndCount();
    return { items, total };
  }

  async getCategorias() {
    return this.productoRepo
      .createQueryBuilder('producto')
      .select('producto.categoria', 'nombre')
      .distinct(true)
      .getRawMany();
  }

  async findOne(id: number) {
    return this.productoRepo.findOne({
      where: { id_producto: id },
      relations: ['muebleria', 'inventario'],
    });
  }

  
}