import { Building2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/shared/components/FadeIn';
import * as db from '@/shared/data/mockDb';

export default function AdminMuebleriasPage() {
  return (
    <div>
      <FadeIn>
        <h1 className="font-display text-2xl font-bold text-[color:var(--fg)] tracking-tight mb-6">Mueblerías</h1>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="neo-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold">Mueblería</TableHead>
                <TableHead className="text-xs font-semibold">Propietario</TableHead>
                <TableHead className="text-xs font-semibold">RFC</TableHead>
                <TableHead className="text-xs font-semibold">Teléfono</TableHead>
                <TableHead className="text-xs font-semibold text-center">Sucursales</TableHead>
                <TableHead className="text-xs font-semibold text-center">Productos</TableHead>
                <TableHead className="text-xs font-semibold">Verificado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {db.mueblerias.map(m => {
                const prop = db.getUsuarioById(m.id_propietario);
                const propData = db.propietarios.find(p => p.id_usuario === m.id_propietario);
                const sucCount = db.getSucursalesByMuebleria(m.id_muebleria).length;
                const prodCount = db.getProductosByMuebleria(m.id_muebleria).length;
                return (
                  <TableRow key={m.id_muebleria} className="zebra-row">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white" style={{ background: 'var(--clr-primary)' }}>
                          {m.nombre_negocio.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{m.nombre_negocio}</p>
                          <p className="text-xs opacity-40">{m.razon_social}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{prop?.nombre}</TableCell>
                    <TableCell className="text-sm font-mono opacity-60">{m.rfc}</TableCell>
                    <TableCell className="text-sm opacity-60">{m.telefono}</TableCell>
                    <TableCell className="text-sm text-center tabular-nums">{sucCount}</TableCell>
                    <TableCell className="text-sm text-center tabular-nums">{prodCount}</TableCell>
                    <TableCell>
                      {propData?.verificado ? (
                        <Badge variant="secondary" className="bg-[color:rgba(46,94,78,0.12)] text-[color:var(--clr-primary)] border-0 text-xs">Verificado</Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-[color:rgba(212,163,115,0.2)] text-[color:var(--clr-accent)] border-0 text-xs">Pendiente</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </FadeIn>
    </div>
  );
}
