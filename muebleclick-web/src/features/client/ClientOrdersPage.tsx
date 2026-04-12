import { useState } from 'react';
import { ShoppingBag, Eye, Truck, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useAuth } from '@/shared/context/AuthContext';
import { FadeIn } from '@/shared/components/FadeIn';
import { BadgeEstado } from '@/shared/components/BadgeEstado';
import { EmptyState } from '@/shared/components/EmptyState';
import * as db from '@/shared/data/mockDb';

export default function ClientOrdersPage() {
  const { getClienteActual } = useAuth();
  const cliente = getClienteActual();
  const pedidos = cliente ? db.getPedidosByCliente(cliente.id_usuario) : [];
  const [selectedPedido, setSelectedPedido] = useState(null);

  const venta = selectedPedido ? db.getVentaByPedido(selectedPedido.id_pedido) : null;
  const detalles = venta ? db.getDetalleVentaByVenta(venta.id_venta) : [];
  const envio = venta ? db.getEnvioByVenta(venta.id_venta) : null;

  return (
    <div className="max-w-5xl">
      <FadeIn>
        <h1 className="font-display text-2xl font-bold text-[color:var(--fg)] tracking-tight mb-6">Mis Pedidos</h1>
      </FadeIn>

      {pedidos.length === 0 ? (
        <EmptyState icon={ShoppingBag} title="Sin pedidos" description="Aún no has realizado ninguna compra." actionLabel="Ir al catálogo" actionHref="/catalogo" />
      ) : (
        <FadeIn delay={0.05}>
          <div className="neo-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold">Pedido</TableHead>
                  <TableHead className="text-xs font-semibold">Fecha</TableHead>
                  <TableHead className="text-xs font-semibold">Entrega</TableHead>
                  <TableHead className="text-xs font-semibold">Total</TableHead>
                  <TableHead className="text-xs font-semibold">Estado</TableHead>
                  <TableHead className="text-xs font-semibold w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pedidos.map(p => (
                  <TableRow key={p.id_pedido} className="zebra-row">
                    <TableCell className="text-sm font-medium">#{p.id_pedido}</TableCell>
                    <TableCell className="text-sm opacity-70">{db.formatDate(p.fecha_pedido)}</TableCell>
                    <TableCell className="text-sm opacity-70">{p.tipo_entrega === 'domicilio' ? 'Domicilio' : 'Sucursal'}</TableCell>
                    <TableCell className="text-sm font-medium tabular-nums">{db.formatPrice(p.total)}</TableCell>
                    <TableCell><BadgeEstado estado={p.estado_pedido} /></TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="rounded-xl h-8 w-8 p-0" onClick={() => setSelectedPedido(p)} data-testid={`order-detail-${p.id_pedido}`}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </FadeIn>
      )}

      {/* Order Detail Sheet */}
      <Sheet open={!!selectedPedido} onOpenChange={(open) => { if (!open) setSelectedPedido(null); }}>
        <SheetContent className="bg-[var(--bg)] w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-display">Pedido #{selectedPedido?.id_pedido}</SheetTitle>
          </SheetHeader>
          {selectedPedido && (
            <div className="mt-4 space-y-5">
              {/* Status */}
              <div className="neo-card-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider opacity-60">Estado</span>
                  <BadgeEstado estado={selectedPedido.estado_pedido} />
                </div>
                <p className="text-sm opacity-60">Fecha: {db.formatDateTime(selectedPedido.fecha_pedido)}</p>
              </div>

              {/* Products */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-2">Productos</h4>
                {detalles.map(d => {
                  const prod = db.getProductoById(d.id_producto);
                  return prod ? (
                    <div key={d.id_detalle_venta} className="flex items-center gap-3 py-2 border-b border-[color:var(--stroke)] last:border-0">
                      <img src={prod.imagen_url} alt={prod.nombre} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{prod.nombre}</p>
                        <p className="text-xs opacity-50">x{d.cantidad} &bull; {db.formatPrice(d.precio_unitario)}</p>
                      </div>
                      <span className="text-sm font-medium tabular-nums">{db.formatPrice(d.subtotal)}</span>
                    </div>
                  ) : null;
                })}
              </div>

              {/* Venta info */}
              {venta && (
                <div className="neo-card-sm p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-2">Venta</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span className="opacity-60">Subtotal</span><span className="tabular-nums">{db.formatPrice(venta.sub_total)}</span></div>
                    {venta.descuento > 0 && <div className="flex justify-between text-[color:var(--clr-primary)]"><span>Descuento</span><span className="tabular-nums">-{db.formatPrice(venta.descuento)}</span></div>}
                    <div className="flex justify-between font-bold border-t border-[color:var(--stroke)] pt-1"><span>Total</span><span className="tabular-nums">{db.formatPrice(venta.total_venta)}</span></div>
                  </div>
                </div>
              )}

              {/* Envio tracking */}
              {envio && (
                <div className="neo-card-sm p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-2">Envío</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm flex items-center gap-1.5"><Truck className="w-4 h-4" /> {db.getPaqueteriaById(envio.id_paqueteria)?.nombre}</span>
                      <BadgeEstado estado={envio.estado_envio} />
                    </div>
                    {envio.tracking_number && (
                      <p className="text-xs opacity-50">Tracking: <span className="font-mono">{envio.tracking_number}</span></p>
                    )}
                    <div className="text-xs opacity-50">
                      <p>Envío: {db.formatDate(envio.fecha_envio)}</p>
                      <p>Entrega estimada: {db.formatDate(envio.fecha_entrega_estimada)}</p>
                      {envio.fecha_entrega_real && <p>Entregado: {db.formatDate(envio.fecha_entrega_real)}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
