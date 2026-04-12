// ==========================================
// TIPOS GLOBALES DE MUEBLECLICK
// ==========================================

export interface User {
  idUsuario: string | number;
  nombre: string;
  email: string;
  rol?: string;
}

export interface Muebleria {
  idMuebleria?: string | number;
  nombreNegocio: string;
}

export interface Producto {
  idProducto: string | number;
  nombre: string;
  precioVenta: number;
  imagenUrl?: string;
  categoria?: string;
  stockDisponible?: number;
  muebleria?: Muebleria;
}

export interface CartItem {
  producto: Producto;
  cantidad: number;
}