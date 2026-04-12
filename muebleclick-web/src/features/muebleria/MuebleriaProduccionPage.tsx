import { Factory } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/shared/context/AuthContext';
import { FadeIn, StaggerContainer, StaggerItem } from '@/shared/components/FadeIn';
import { BadgeEstado } from '@/shared/components/BadgeEstado';
import { EmptyState } from '@/shared/components/EmptyState';
import * as db from '@/shared/data/mockDb';
import { toast } from 'sonner';

const COLUMNS = [
  { key: 'pendiente', label: 'Pendiente', color: 'bg-gray-50' },
  { key: 'en_proceso', label: 'En Proceso', color: 'bg-[color:rgba(212,163,115,0.08)]' },
  { key: 'completada', label: 'Completada', color: 'bg-[color:rgba(46,94,78,0.05)]' },
];

export default function MuebleriaProduccionPage() {
  const { getMuebleriaActual } = useAuth();
  const muebleria = getMuebleriaActual();
  const sucursales = muebleria ? db.getSucursalesByMuebleria(muebleria.id_muebleria) : [];
  const sucursalIds = sucursales.map(s => s.id_sucursal);
  const ordenes = db.ordenes_produccion.filter(op => sucursalIds.includes(op.id_sucursal));

  return (
    <div>
      <FadeIn>
        <h1 className="font-display text-2xl font-bold text-[color:var(--fg)] tracking-tight mb-6">Producción</h1>
      </FadeIn>

      {ordenes.length === 0 ? (
        <EmptyState icon={Factory} title="Sin órdenes de producción" description="No hay órdenes de producción registradas." />
      ) : (
        <FadeIn delay={0.05}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {COLUMNS.map(col => {
              const colItems = ordenes.filter(o => o.estado === col.key);
              return (
                <div key={col.key} className={`rounded-2xl ${col.color} p-4 min-h-[200px]`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-[color:var(--fg)]">{col.label}</h3>
                    <Badge variant="secondary" className="bg-white/60 text-[color:var(--fg)] border-0 text-xs tabular-nums">{colItems.length}</Badge>
                  </div>
                  <div className="space-y-3">
                    {colItems.map(op => {
                      const prod = db.getProductoById(op.id_producto);
                      const suc = db.getSucursalById(op.id_sucursal);
                      return (
                        <div key={op.id_produccion} className="neo-card-sm p-4">
                          <div className="flex items-start justify-between mb-2">
                            <p className="text-sm font-semibold">{prod?.nombre}</p>
                            <BadgeEstado estado={op.estado} />
                          </div>
                          <div className="text-xs opacity-50 space-y-0.5">
                            <p>Cantidad: {op.cantidad_planificada} uds</p>
                            <p>Sucursal: {suc?.nombre_sucursal?.split(' - ')[1]}</p>
                            <p>Programada: {db.formatDate(op.fecha_programada)}</p>
                            {op.notas && <p className="italic">{op.notas}</p>}
                          </div>
                          {op.estado === 'pendiente' && (
                            <Button size="sm" variant="ghost" className="mt-2 w-full rounded-xl text-xs text-[color:var(--clr-primary)] hover:bg-[color:rgba(46,94,78,0.08)]" onClick={() => toast.info('Acción simulada')}>
                              Iniciar producción
                            </Button>
                          )}
                          {op.estado === 'en_proceso' && (
                            <Button size="sm" variant="ghost" className="mt-2 w-full rounded-xl text-xs text-[color:var(--clr-primary)] hover:bg-[color:rgba(46,94,78,0.08)]" onClick={() => toast.info('Acción simulada')}>
                              Marcar completada
                            </Button>
                          )}
                        </div>
                      );
                    })}
                    {colItems.length === 0 && (
                      <p className="text-xs text-center opacity-40 py-6">Sin órdenes</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      )}
    </div>
  );
}
