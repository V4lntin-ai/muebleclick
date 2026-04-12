import { Building2, MapPin, Phone, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/shared/context/AuthContext';
import { FadeIn, StaggerContainer, StaggerItem } from '@/shared/components/FadeIn';
import { EmptyState } from '@/shared/components/EmptyState';
import * as db from '@/shared/data/mockDb';

export default function MuebleriaSucursalesPage() {
  const { getMuebleriaActual } = useAuth();
  const muebleria = getMuebleriaActual();
  const sucursales = muebleria ? db.getSucursalesByMuebleria(muebleria.id_muebleria) : [];

  return (
    <div>
      <FadeIn>
        <h1 className="font-display text-2xl font-bold text-[color:var(--fg)] tracking-tight mb-6">Sucursales</h1>
      </FadeIn>

      {sucursales.length === 0 ? (
        <EmptyState icon={Building2} title="Sin sucursales" description="Registra tu primera sucursal." />
      ) : (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sucursales.map(s => {
            const empleados = db.getEmpleadosBySucursal(s.id_sucursal);
            const invCount = db.getInventarioBySucursal(s.id_sucursal).length;
            return (
              <StaggerItem key={s.id_sucursal}>
                <div className="neo-card p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base font-semibold text-[color:var(--fg)]">{s.nombre_sucursal}</h3>
                    <Badge variant="secondary" className={`border-0 text-xs ${s.activo ? 'bg-[color:rgba(46,94,78,0.12)] text-[color:var(--clr-primary)]' : 'bg-gray-100 text-gray-500'}`}>
                      {s.activo ? 'Activa' : 'Inactiva'}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2 opacity-60"><MapPin className="w-4 h-4 shrink-0" /> {s.calle_numero}, {db.getUbicacionCompleta(s.id_municipio)}</p>
                    <p className="flex items-center gap-2 opacity-60"><Phone className="w-4 h-4 shrink-0" /> {s.telefono}</p>
                    <p className="flex items-center gap-2 opacity-60"><Clock className="w-4 h-4 shrink-0" /> L-V: {s.horario?.lunes_viernes}</p>
                  </div>
                  <div className="flex gap-4 mt-4 pt-3 border-t border-[color:var(--stroke)] text-xs opacity-50">
                    <span>{empleados.length} empleados</span>
                    <span>{invCount} productos en inventario</span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      )}
    </div>
  );
}
