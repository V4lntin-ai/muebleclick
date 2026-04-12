import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, Tag, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/shared/context/CartContext';
import { FadeIn } from '@/shared/components/FadeIn';
import { EmptyState } from '@/shared/components/EmptyState';
import * as db from '@/shared/data/mockDb';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CartPage() {
  const { cartDetails, updateQuantity, removeItem, subtotal, discount, total, appliedCoupon, applyCoupon, removeCoupon, itemCount } = useCart();
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponCode);
    if (result.success) {
      toast.success(result.message);
      setCouponCode('');
    } else {
      toast.error(result.message);
    }
  };

  if (cartDetails.length === 0) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <EmptyState
          icon={ShoppingBag}
          title="Tu carrito está vacío"
          description="Agrega productos del catálogo para comenzar tu compra."
          actionLabel="Volver al catálogo"
          actionHref="/catalogo"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <FadeIn>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[color:var(--fg)] tracking-tight mb-6">
          Carrito <span className="text-base font-normal opacity-50">({itemCount} producto{itemCount !== 1 ? 's' : ''})</span>
        </h1>
      </FadeIn>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Items List */}
        <div className="flex-1 space-y-4">
          {cartDetails.map((item, idx) => (
            <FadeIn key={item.id_producto} delay={idx * 0.05}>
              <div className="neo-card p-4 sm:p-5 flex gap-4" data-testid={`cart-item-${item.id_producto}`}>
                <Link to={`/producto/${item.id_producto}`} className="shrink-0">
                  <img src={item.producto.imagen_url} alt={item.producto.nombre} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] text-[color:var(--clr-secondary)] font-medium uppercase tracking-wider">{item.muebleria?.nombre_negocio}</p>
                      <Link to={`/producto/${item.id_producto}`} className="text-sm font-semibold text-[color:var(--fg)] hover:text-[color:var(--clr-primary)] line-clamp-1">
                        {item.producto.nombre}
                      </Link>
                      <p className="text-xs text-[color:var(--fg)] opacity-40">{item.producto.categoria}</p>
                    </div>
                    <button onClick={() => removeItem(item.id_producto)} className="text-[color:var(--fg)] opacity-40 hover:opacity-100 hover:text-red-500 p-1" data-testid={`cart-remove-${item.id_producto}`}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="neo-card-sm flex items-center h-8">
                      <button onClick={() => updateQuantity(item.id_producto, item.cantidad - 1)} className="px-2 h-full opacity-60 hover:opacity-100">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold tabular-nums">{item.cantidad}</span>
                      <button onClick={() => updateQuantity(item.id_producto, item.cantidad + 1)} className="px-2 h-full opacity-60 hover:opacity-100">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-base font-bold font-display tabular-nums text-[color:var(--clr-primary)]">
                      {db.formatPrice(item.producto.precio_venta * item.cantidad)}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Summary */}
        <FadeIn delay={0.1}>
          <div className="lg:w-80 xl:w-96">
            <div className="neo-card p-5 sm:p-6 lg:sticky lg:top-24">
              <h2 className="font-display text-lg font-bold text-[color:var(--fg)] mb-5">Resumen</h2>

              {/* Coupon */}
              <div className="mb-5">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[color:rgba(46,94,78,0.08)]">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[color:var(--clr-primary)]" />
                      <span className="text-sm font-medium">{appliedCoupon.codigo}</span>
                      <span className="text-xs opacity-50">-{appliedCoupon.descuento_porcentaje}%</span>
                    </div>
                    <button onClick={removeCoupon} className="text-xs text-red-500 hover:underline">Quitar</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text" value={couponCode} onChange={e => setCouponCode(e.target.value)}
                      placeholder="Código de cupón"
                      className="flex-1 h-9 px-3 text-sm rounded-xl bg-[color:rgba(246,245,240,0.85)] border border-[color:var(--stroke)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)]"
                      data-testid="cart-coupon-input"
                    />
                    <Button onClick={handleApplyCoupon} size="sm" className="rounded-xl bg-[color:rgba(46,94,78,0.10)] text-[color:var(--clr-primary)] hover:bg-[color:rgba(46,94,78,0.20)] btn-transition" data-testid="cart-coupon-apply-button">
                      Aplicar
                    </Button>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-60">Subtotal</span>
                  <span className="tabular-nums font-medium" data-testid="cart-subtotal">{db.formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[color:var(--clr-primary)]">
                    <span>Descuento</span>
                    <span className="tabular-nums font-medium">-{db.formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm opacity-60">
                  <span>Envío</span>
                  <span>Calculado en checkout</span>
                </div>
                <div className="border-t border-[color:var(--stroke)] pt-3 flex justify-between">
                  <span className="font-semibold text-base">Total</span>
                  <span className="font-bold font-display text-xl tabular-nums text-[color:var(--clr-primary)]" data-testid="cart-total">{db.formatPrice(total)}</span>
                </div>
              </div>

              <Button asChild className="w-full mt-5 h-11 rounded-xl bg-[var(--clr-primary)] text-[color:var(--bg)] shadow-[0_14px_30px_rgba(46,94,78,0.22)] hover:shadow-[0_18px_40px_rgba(46,94,78,0.28)] btn-transition text-sm" data-testid="cart-checkout-button">
                <Link to="/checkout">
                  Proceder al checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
