import { Users } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/shared/context/AuthContext';
import { FadeIn } from '@/shared/components/FadeIn';
import { EmptyState } from '@/shared/components/EmptyState';
import * as db from '@/shared/data/mockDb';

export default function MuebleriaEmpleadosPage() {
  const { getMuebleriaActual } = useAuth();
  const muebleria = getMuebleriaActual();
  const sucursales = muebleria ? db.getSucursalesByMuebleria(muebleria.id_muebleria) : [];
  const sucursalIds = sucursales.map(s => s.id_sucursal);
  const empleadosList = db.empleados.filter(e => sucursalIds.includes(e.id_sucursal));

  return (
    <div>
      <FadeIn>
        <h1 className="font-display text-2xl font-bold text-[color:var(--fg)] tracking-tight mb-6">Empleados</h1>
      </FadeIn>

      {empleadosList.length === 0 ? (
        <EmptyState icon={Users} title="Sin empleados" description="No hay empleados registrados en tus sucursales." />
      ) : (
        <FadeIn delay={0.05}>
          <div className="neo-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold">Nombre</TableHead>
                  <TableHead className="text-xs font-semibold">Sucursal</TableHead>
                  <TableHead className="text-xs font-semibold">Puesto</TableHead>
                  <TableHead className="text-xs font-semibold text-center">Vendedor</TableHead>
                  <TableHead className="text-xs font-semibold text-center">Código</TableHead>
                  <TableHead className="text-xs font-semibold text-center">Comisión</TableHead>
                  <TableHead className="text-xs font-semibold text-center">Activo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {empleadosList.map(emp => {
                  const usuario = db.getUsuarioById(emp.id_usuario);
                  const suc = db.getSucursalById(emp.id_sucursal);
                  const comisiones = db.getComisionesByVendedor(emp.id_usuario);
                  const totalComisiones = comisiones.reduce((a, c) => a + c.monto, 0);
                  return (
                    <TableRow key={emp.id_usuario} className="zebra-row">
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{usuario?.nombre}</p>
                          <p className="text-xs opacity-40">{usuario?.correo}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm opacity-70">{suc?.nombre_sucursal?.split(' - ')[1] || suc?.nombre_sucursal}</TableCell>
                      <TableCell className="text-sm">{emp.puesto}</TableCell>
                      <TableCell className="text-center">
                        {emp.es_vendedor ? (
                          <Badge variant="secondary" className="bg-[color:rgba(46,94,78,0.12)] text-[color:var(--clr-primary)] border-0 text-xs">Sí</Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-500 border-0 text-xs">No</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-center font-mono opacity-60">{emp.codigo_vendedor || '—'}</TableCell>
                      <TableCell className="text-sm text-center">
                        <span className="tabular-nums">{emp.comision_pct}%</span>
                        {totalComisiones > 0 && (
                          <span className="text-xs text-[color:var(--clr-primary)] block">{db.formatPrice(totalComisiones)}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch checked={emp.activo} className="data-[state=checked]:bg-[var(--clr-primary)]" />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
