import { Truck, Clock, Globe } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FadeIn } from '@/shared/components/FadeIn';
import * as db from '@/shared/data/mockDb';

export default function AdminPaqueteriasPage() {
  return (
    <div>
      <FadeIn>
        <h1 className="font-display text-2xl font-bold text-[color:var(--fg)] tracking-tight mb-6">Paqueterías</h1>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="neo-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold">Nombre</TableHead>
                <TableHead className="text-xs font-semibold">Teléfono</TableHead>
                <TableHead className="text-xs font-semibold">URL Tracking</TableHead>
                <TableHead className="text-xs font-semibold text-center">Tiempo promedio</TableHead>
                <TableHead className="text-xs font-semibold text-center">Envíos activos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {db.paqueterias.map(p => {
                const enviosActivos = db.envios.filter(e => e.id_paqueteria === p.id_paqueteria && e.estado_envio !== 'entregado').length;
                return (
                  <TableRow key={p.id_paqueteria} className="zebra-row">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[color:rgba(46,94,78,0.10)]">
                          <Truck className="w-4.5 h-4.5 text-[color:var(--clr-primary)]" style={{ width: 18, height: 18 }} />
                        </div>
                        <span className="text-sm font-medium">{p.nombre}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm opacity-60">{p.telefono}</TableCell>
                    <TableCell>
                      <a href={p.url_tracking} target="_blank" rel="noopener noreferrer" className="text-sm text-[color:var(--clr-primary)] flex items-center gap-1 hover:underline">
                        <Globe className="w-3 h-3" /> Rastreo
                      </a>
                    </TableCell>
                    <TableCell className="text-sm text-center">
                      <span className="flex items-center justify-center gap-1 tabular-nums">
                        <Clock className="w-3.5 h-3.5 opacity-50" /> {p.tiempo_promedio_entrega_days} días
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-center tabular-nums font-medium">{enviosActivos}</TableCell>
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
