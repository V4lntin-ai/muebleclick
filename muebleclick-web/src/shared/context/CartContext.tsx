import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import * as db from '@/shared/data/mockDb';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const addItem = useCallback((productoId, cantidad = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id_producto === productoId);
      if (existing) {
        return prev.map(i => i.id_producto === productoId ? { ...i, cantidad: i.cantidad + cantidad } : i);
      }
      return [...prev, { id_producto: productoId, cantidad }];
    });
  }, []);

  const removeItem = useCallback((productoId) => {
    setItems(prev => prev.filter(i => i.id_producto !== productoId));
  }, []);

  const updateQuantity = useCallback((productoId, cantidad) => {
    if (cantidad <= 0) {
      setItems(prev => prev.filter(i => i.id_producto !== productoId));
    } else {
      setItems(prev => prev.map(i => i.id_producto === productoId ? { ...i, cantidad } : i));
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, []);

  const applyCoupon = useCallback((code) => {
    const cupon = db.cupones.find(c => c.codigo === code.toUpperCase() && c.activo);
    if (cupon) {
      setAppliedCoupon(cupon);
      return { success: true, message: `Cupón ${cupon.codigo} aplicado: ${cupon.descuento_porcentaje}% de descuento` };
    }
    return { success: false, message: 'Cupón inválido o expirado' };
  }, []);

  const removeCoupon = useCallback(() => setAppliedCoupon(null), []);

  const cartDetails = useMemo(() => {
    return items.map(item => {
      const producto = db.getProductoById(item.id_producto);
      const muebleria = producto ? db.getMuebleriaById(producto.id_muebleria) : null;
      return { ...item, producto, muebleria };
    }).filter(item => item.producto);
  }, [items]);

  const subtotal = useMemo(() => {
    return cartDetails.reduce((acc, item) => acc + (item.producto.precio_venta * item.cantidad), 0);
  }, [cartDetails]);

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    return subtotal * (appliedCoupon.descuento_porcentaje / 100);
  }, [subtotal, appliedCoupon]);

  const total = subtotal - discount;
  const itemCount = items.reduce((acc, i) => acc + i.cantidad, 0);

  return (
    <CartContext.Provider value={{
      items,
      cartDetails,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      applyCoupon,
      removeCoupon,
      appliedCoupon,
      subtotal,
      discount,
      total,
      itemCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
