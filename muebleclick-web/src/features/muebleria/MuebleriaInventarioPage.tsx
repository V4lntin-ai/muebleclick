import { Warehouse, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/shared/context/AuthContext';
import { FadeIn } from '@/shared/components/FadeIn';
import { EmptyState } from '@/shared/components/EmptyState';
import * as db from '@/shared/data/mockDb';

export default function MuebleriaInventarioPage() {
  const { getMuebleriaActual } = useAuth();
  const muebleria = getMuebleriaActual();
  const sucursales = muebleria ? db.getSucursalesByMuebleria(muebleria.id_muebleria) : [];

  return (
    <div>
      <FadeIn>
        <h1 className="font-display text-2xl font-bold text-[color:var(--fg)] tracking-tight mb-6">Inventario</h1>
      </FadeIn>

      {sucursales.length === 0 ? (
        <EmptyState icon={Warehouse} title="Sin sucursales" description="Agrega sucursales para gestionar inventario." />
      ) : (
        <FadeIn delay={0.05}>
          <Tabs defaultValue={String(sucursales[0]?.id_sucursal)}>
            <TabsList className="bg-transparent border-b border-[color:var(--stroke)] rounded-none w-full justify-start gap-0 mb-6">
              {sucursales.map(s => (
                <TabsTrigger key={s.id_sucursal} value={String(s.id_sucursal)}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--clr-primary)] data-[state=active]:text-[color:var(--clr-primary)] text-sm px-4">
                  {s.nombre_sucursal.split(' - ')[1] || s.nombre_sucursal}
                </TabsTrigger>
              ))}
            </TabsList>

            {sucursales.map(s => {
              const inv = db.getInventarioBySucursal(s.id_sucursal);
              return (
                <TabsContent key={s.id_sucursal} value={String(s.id_sucursal)}>
                  {inv.length === 0 ? (
                    <EmptyState icon={Warehouse} title="Sin inventario" description="No hay productos registrados en esta sucursal." />
                  ) : (
                    <div className="neo-card overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="text-xs font-semibold">Producto</TableHead>
                            <TableHead className="text-xs font-semibold text-center">Cantidad</TableHead>
                            <TableHead className="text-xs font-semibold text-center">Reservado</TableHead>
                            <TableHead className="text-xs font-semibold text-center">Disponible</TableHead>
                            <TableHead className="text-xs font-semibold text-center">Mín / Máx</TableHead>
                            <TableHead className="text-xs font-semibold text-center">Estado</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {inv.map(i => {
                            const prod = db.getProductoById(i.id_producto);
                            const disponible = i.cantidad - i.reservado;
                            const isCritical = i.cantidad <= i.stock_min;
                            const isLow = i.cantidad <= i.stock_min * 1.5 && !isCritical;
                            return (
                              <TableRow key={i.id_inventario} className="zebra-row">
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <img src={prod?.imagen_url} alt="" className="w-8 h-8 rounded-lg object-cover" />
                                    <span className="text-sm font-medium">{prod?.nombre}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-sm text-center tabular-nums">{i.cantidad}</TableCell>
                                <TableCell className="text-sm text-center tabular-nums">{i.reservado}</TableCell>
                                <TableCell className="text-sm text-center tabular-nums font-medium">{disponible}</TableCell>
                                <TableCell className="text-sm text-center tabular-nums opacity-50">{i.stock_min} / {i.stock_max}</TableCell>
                                <TableCell className="text-center">
                                  {isCritical ? (
                                    <Badge variant="secondary" className="bg-red-100 text-red-600 border-0 text-xs">
                                      <AlertTriangle className="w-3 h-3 mr-1" /> Crítico
                                    </Badge>
                                  ) : isLow ? (
                                    <Badge variant="secondary" className="bg-[color:rgba(212,163,115,0.25)] text-[color:var(--clr-accent)] border-0 text-xs">
                                      <TrendingDown className="w-3 h-3 mr-1" /> Bajo
                                    </Badge>
                                  ) : (
                                    <Badge variant="secondary" className="bg-[color:rgba(46,94,78,0.12)] text-[color:var(--clr-primary)] border-0 text-xs">
                                      <TrendingUp className="w-3 h-3 mr-1" /> OK
                                    </Badge>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </FadeIn>
      )}
    </div>
  );
}
