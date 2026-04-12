import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart, Check, Minus, Plus, MapPin, Truck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCart } from '@/shared/context/CartContext';
import { FadeIn } from '@/shared/components/FadeIn';
import { ProductCard } from '@/shared/components/ProductCard';
import { BadgeEstado } from '@/shared/components/BadgeEstado';
import { EmptyState } from '@/shared/components/EmptyState';
import * as db from '@/shared/data/mockDb';

export default function ProductDetailPage() {
  const { id } = useParams();
  const producto = db.getProductoById(parseInt(id));
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!producto) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <EmptyState title="Producto no encontrado" description="El producto que buscas no existe." actionLabel="Volver al catálogo" actionHref="/catalogo" />
      </div>
    );
  }

  const muebleria = db.getMuebleriaById(producto.id_muebleria);
  const inventarioItems = db.getInventarioByProducto(producto.id_producto);
  const stockTotal = db.getStockTotal(producto.id_producto);
  const related = db.productos.filter(p => p.categoria === producto.categoria && p.id_producto !== producto.id_producto).slice(0, 4);
  const proveedoresRel = db.proveedor_producto.filter(pp => pp.id_producto === producto.id_producto);

  const handleAdd = () => {
    addItem(producto.id_producto, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Breadcrumb */}
      <FadeIn>
        <div className="flex items-center gap-2 text-sm text-[color:var(--fg)] opacity-50 mb-6">
          <Link to="/catalogo" className="hover:opacity-100 flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> Catálogo</Link>
          <span>/</span>
          <Link to={`/catalogo?cat=${encodeURIComponent(producto.categoria)}`} className="hover:opacity-100">{producto.categoria}</Link>
          <span>/</span>
          <span className="text-[color:var(--fg)] opacity-80 truncate">{producto.nombre}</span>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <FadeIn>
          <div className="neo-card overflow-hidden">
            <img src={producto.imagen_url} alt={producto.nombre} className="w-full aspect-square object-cover" />
          </div>
        </FadeIn>

        {/* Product Info */}
        <FadeIn delay={0.1}>
          <div className="lg:sticky lg:top-24">
            <p className="text-xs text-[color:var(--clr-secondary)] font-semibold uppercase tracking-wider mb-1">
              {muebleria?.nombre_negocio}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[color:var(--fg)] tracking-tight mb-2">
              {producto.nombre}
            </h1>
            <p className="text-xs text-[color:var(--fg)] opacity-40 mb-4">SKU: {producto.sku} &bull; {producto.categoria}</p>

            <p className="text-3xl font-bold font-display tabular-nums text-[color:var(--clr-primary)] mb-4">
              {db.formatPrice(producto.precio_venta)}
            </p>

            <p className="text-sm text-[color:var(--fg)] opacity-60 leading-relaxed mb-6">
              {producto.descripcion}
            </p>

            {/* Stock info */}
            <div className="flex items-center gap-2 mb-6">
              {stockTotal > 0 ? (
                <span className="text-sm font-medium text-[color:var(--clr-primary)]">{stockTotal} unidades disponibles</span>
              ) : (
                <span className="text-sm font-medium text-red-500">Agotado</span>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-3 mb-6">
              <div className="neo-card-sm flex items-center gap-0 h-11">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 h-full flex items-center opacity-60 hover:opacity-100">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-semibold tabular-nums">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 h-full flex items-center opacity-60 hover:opacity-100">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button
                onClick={handleAdd}
                disabled={stockTotal === 0}
                className={`flex-1 h-11 rounded-xl text-sm btn-transition ${
                  added
                    ? 'bg-[var(--clr-primary)] text-white'
                    : 'bg-[var(--clr-primary)] text-[color:var(--bg)] shadow-[0_14px_30px_rgba(46,94,78,0.22)] hover:shadow-[0_18px_40px_rgba(46,94,78,0.28)]'
                }`}
                data-testid="product-detail-add-to-cart"
              >
                {added ? <><Check className="w-4 h-4 mr-2" /> Agregado</> : <><ShoppingCart className="w-4 h-4 mr-2" /> Agregar al carrito</>}
              </Button>
            </div>

            {/* Quick info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="neo-card-sm p-3 text-center">
                <p className="text-[10px] text-[color:var(--fg)] opacity-40 mb-0.5">Peso</p>
                <p className="text-sm font-semibold">{producto.peso_kg} kg</p>
              </div>
              <div className="neo-card-sm p-3 text-center">
                <p className="text-[10px] text-[color:var(--fg)] opacity-40 mb-0.5">Volumen</p>
                <p className="text-sm font-semibold">{producto.volumen_m3} m³</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Tabs */}
      <FadeIn delay={0.2}>
        <div className="mt-10">
          <Tabs defaultValue="descripcion">
            <TabsList className="bg-transparent border-b border-[color:var(--stroke)] rounded-none w-full justify-start gap-0">
              <TabsTrigger value="descripcion" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--clr-primary)] data-[state=active]:text-[color:var(--clr-primary)] text-sm">Descripción</TabsTrigger>
              <TabsTrigger value="disponibilidad" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--clr-primary)] data-[state=active]:text-[color:var(--clr-primary)] text-sm">Disponibilidad</TabsTrigger>
              <TabsTrigger value="envio" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--clr-primary)] data-[state=active]:text-[color:var(--clr-primary)] text-sm">Envío</TabsTrigger>
            </TabsList>

            <TabsContent value="descripcion" className="mt-6">
              <div className="neo-card p-6">
                <p className="text-sm text-[color:var(--fg)] opacity-70 leading-relaxed mb-4">{producto.descripcion}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div><span className="text-[color:var(--fg)] opacity-40">Unidad:</span> <span className="font-medium">{producto.unidad_medida}</span></div>
                  <div><span className="text-[color:var(--fg)] opacity-40">Tipo:</span> <span className="font-medium">{producto.tipo_producto}</span></div>
                  <div><span className="text-[color:var(--fg)] opacity-40">Peso:</span> <span className="font-medium">{producto.peso_kg} kg</span></div>
                  <div><span className="text-[color:var(--fg)] opacity-40">Volumen:</span> <span className="font-medium">{producto.volumen_m3} m³</span></div>
                </div>
                {proveedoresRel.length > 0 && (
                  <div className="mt-6 border-t border-[color:var(--stroke)] pt-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[color:var(--fg)] opacity-60 mb-3">Proveedores asociados</h4>
                    {proveedoresRel.map(pp => {
                      const prov = db.getProveedorById(pp.id_proveedor);
                      return prov ? (
                        <div key={pp.id} className="flex items-center justify-between text-sm py-1.5">
                          <span>{prov.nombre}</span>
                          <span className="text-xs opacity-50">Entrega: {prov.tiempo_entrega_dias} días</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="disponibilidad" className="mt-6">
              <div className="neo-card overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs font-semibold">Sucursal</TableHead>
                      <TableHead className="text-xs font-semibold">Ubicación</TableHead>
                      <TableHead className="text-xs font-semibold text-center">Disponible</TableHead>
                      <TableHead className="text-xs font-semibold text-center">Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventarioItems.length > 0 ? inventarioItems.map(inv => {
                      const suc = db.getSucursalById(inv.id_sucursal);
                      const disponible = inv.cantidad - inv.reservado;
                      return (
                        <TableRow key={inv.id_inventario} className="zebra-row">
                          <TableCell className="text-sm font-medium">{suc?.nombre_sucursal}</TableCell>
                          <TableCell className="text-sm opacity-60">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{db.getUbicacionCompleta(suc?.id_municipio)}</span>
                          </TableCell>
                          <TableCell className="text-sm text-center tabular-nums font-medium">{disponible}</TableCell>
                          <TableCell className="text-center">
                            {disponible > inv.stock_min
                              ? <BadgeEstado estado="completado" />
                              : disponible > 0
                                ? <BadgeEstado estado="en_proceso" />
                                : <BadgeEstado estado="cancelado" />}
                          </TableCell>
                        </TableRow>
                      );
                    }) : (
                      <TableRow><TableCell colSpan={4} className="text-center text-sm opacity-50 py-8">Sin inventario registrado</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="envio" className="mt-6">
              <div className="neo-card p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Truck className="w-5 h-5 text-[color:var(--clr-primary)] mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Envío a domicilio</h4>
                    <p className="text-sm opacity-60">Disponible a todo México. Tiempo estimado: 4-7 días hábiles.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[color:var(--clr-accent)] mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Recoger en sucursal</h4>
                    <p className="text-sm opacity-60">Disponible en sucursales con stock. Sin costo adicional.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </FadeIn>

      {/* Related Products */}
      {related.length > 0 && (
        <FadeIn delay={0.3}>
          <div className="mt-14">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[color:var(--fg)] tracking-tight mb-6">Productos relacionados</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
              {related.map(p => <ProductCard key={p.id_producto} producto={p} />)}
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
