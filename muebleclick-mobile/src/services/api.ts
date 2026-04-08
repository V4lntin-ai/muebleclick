// 🚨 ARCHIVO TEMPORAL (Dummy) 🚨
// Sirve para engañar a Metro Bundler mientras terminamos de migrar
// todas las pantallas a Apollo Client y GraphQL.

export const saveToken = async (token: string) => {};
export const removeToken = async () => {};

export const api = {
  login: async () => ({}),
  register: async () => ({}),
  googleAuth: async () => ({}),
  
  // Rellenos para que el catálogo y carrito no se rompan
  getProductos: async () => ({ data: [] }),
  getProducto: async (id: string) => ({ data: null }),
  crearPedido: async (items: any[]) => ({ success: true }),
  getPedidos: async () => ({ data: [] }),
  getPerfil: async () => ({ data: null }),
};