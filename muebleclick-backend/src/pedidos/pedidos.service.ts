import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedidos.entity';
import { DetallePedido } from './detalle-pedido.entity';
import { Producto } from '../productos/productos.entity';
import { CrearPedidoInput } from './dto/crear-pedido.input';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido) private pedidoRepo: Repository<Pedido>,
    @InjectRepository(DetallePedido) private detalleRepo: Repository<DetallePedido>,
    @InjectRepository(Producto) private productoRepo: Repository<Producto>,
  ) {}

  async crearPedido(id_usuario: number, input: CrearPedidoInput) {
    let subtotal = 0;
    const detalles: DetallePedido[] = [];

    for (const item of input.items) {
      const producto = await this.productoRepo.findOneBy({ id_producto: item.idProducto });
      
      if (!producto) {
        throw new BadRequestException(`El producto con ID ${item.idProducto} no existe`);
      }

      subtotal += producto.precio_venta * item.cantidad;

      detalles.push(
        this.detalleRepo.create({
          id_producto: item.idProducto,
          cantidad: item.cantidad,
          precio_unitario: producto.precio_venta,
        })
      );
    }

    const costoEnvio = subtotal >= 5000 ? 0 : 299;
    const totalFinal = subtotal + costoEnvio;

    const nuevoPedido = this.pedidoRepo.create({
      id_usuario,
      total: totalFinal,
      tipo_entrega: input.tipoEntrega,
      estado: 'pendiente',
      detalles: detalles, 
    });

    const pedidoGuardado = await this.pedidoRepo.save(nuevoPedido);

    return {
      success: true,
      id: pedidoGuardado.id_pedido,
      message: 'Tu pedido ha sido procesado exitosamente'
    };
  }

  async obtenerPedidosUsuario(id_usuario: number) {
    return this.pedidoRepo.find({
      where: { id_usuario },
      relations: ['detalles', 'detalles.producto'], 
      order: { fecha_pedido: 'DESC' }, 
    });
  }

  async obtenerPedidoPorId(id_pedido: number, id_usuario: number) {
    const pedido = await this.pedidoRepo.findOne({
      where: { id_pedido, id_usuario }, // El candado de seguridad
      relations: ['detalles', 'detalles.producto', 'detalles.producto.muebleria'], 
    });

    if (!pedido) {
      throw new BadRequestException('Pedido no encontrado o no autorizado');
    }

    return pedido;
  }
}