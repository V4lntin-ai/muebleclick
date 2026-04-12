import { Link } from 'react-router-dom';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/shared/context/CartContext';
import * as db from '@/shared/data/mockDb';
import { useState } from 'react';

export function ProductCard({ producto }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const muebleria = db.getMuebleriaById(producto.id_muebleria);
  const stock = db.getStockTotal(producto.id_producto);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(producto.id_producto);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link
      to={`/producto/${producto.id_producto}`}
      className="neo-card-sm overflow-hidden card-hover block group"
      data-testid={`product-card-${producto.id_producto}`}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={producto.imagen_url}
          alt={producto.nombre}
          className="w-full h-full object-cover group-hover:scale-105"
          style={{ transitionProperty: 'transform', transitionDuration: '500ms' }}
          loading="lazy"
        />
        {stock > 0 ? (
          <span className="absolute top-3 left-3 text-[10px] font-medium px-2 py-1 rounded-full bg-[color:rgba(46,94,78,0.85)] text-white">
            En stock
          </span>
        ) : (
          <span className="absolute top-3 left-3 text-[10px] font-medium px-2 py-1 rounded-full bg-gray-500 text-white">
            Agotado
          </span>
        )}
      </div>
      <div className="p-3 sm:p-4">
        <p className="text-[10px] text-[color:var(--clr-secondary)] font-medium uppercase tracking-wider mb-1">
          {muebleria?.nombre_negocio}
        </p>
        <h3 className="text-sm font-semibold text-[color:var(--fg)] leading-snug mb-1 line-clamp-2">
          {producto.nombre}
        </h3>
        <p className="text-xs text-[color:var(--fg)] opacity-50 mb-3">{producto.categoria}</p>
        <div className="flex items-center justify-between">
          <span className="text-base sm:text-lg font-bold font-display tabular-nums text-[color:var(--clr-primary)]">
            {db.formatPrice(producto.precio_venta)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={stock === 0}
            className={`rounded-xl text-xs px-3 h-8 btn-transition ${
              added
                ? 'bg-[var(--clr-primary)] text-white'
                : 'bg-[color:rgba(46,94,78,0.10)] text-[color:var(--clr-primary)] hover:bg-[color:rgba(46,94,78,0.20)]'
            }`}
            data-testid={`product-card-add-to-cart-button-${producto.id_producto}`}
          >
            {added ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </div>
    </Link>
  );
}
