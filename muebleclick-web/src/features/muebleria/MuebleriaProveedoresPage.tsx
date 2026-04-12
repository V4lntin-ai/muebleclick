import { Truck, Phone, Mail, MapPin } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/shared/components/FadeIn';
import * as db from '@/shared/data/mockDb';

export default function MuebleriaProveedoresPage() {
  return (
    <div>
      <FadeIn>
        <h1 className="font-display text-2xl font-bold text-[color:var(--fg)] tracking-tight mb-6">Proveedores</h1>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="neo-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold">Proveedor</TableHead>
                <TableHead className="text-xs font-semibold">Contacto</TableHead>
                <TableHead className="text-xs font-semibold">Ubicación</TableHead>
                <TableHead className="text-xs font-semibold">Tipo</TableHead>
                <TableHead className="text-xs font-semibold text-center">Entrega (días)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {db.proveedores.map(p => (
                <TableRow key={p.id_proveedor} className="zebra-row">
                  <TableCell>
                    <p className="text-sm font-medium">{p.nombre}</p>
                    <p className="text-xs opacity-40">RFC: {p.rfc}</p>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm space-y-0.5">
                      <p className="font-medium">{p.contacto_nombre}</p>
                      <p className="text-xs opacity-50 flex items-center gap-1"><Mail className="w-3 h-3" /> {p.contacto_email}</p>
                      <p className="text-xs opacity-50 flex items-center gap-1"><Phone className="w-3 h-3" /> {p.telefono}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm opacity-60">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {db.getUbicacionCompleta(p.id_municipio)}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-[color:rgba(163,177,138,0.2)] text-[color:var(--fg)] border-0 text-xs">{p.tipo_proveedor}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-center tabular-nums font-medium">{p.tiempo_entrega_dias}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </FadeIn>
    </div>
  );
}
