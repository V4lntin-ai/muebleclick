import { useState } from 'react';
import { BadgePercent, Plus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FadeIn } from '@/shared/components/FadeIn';
import * as db from '@/shared/data/mockDb';
import { toast } from 'sonner';

export default function AdminCuponesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold text-[color:var(--fg)] tracking-tight">Cupones</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl bg-[var(--clr-primary)] text-[color:var(--bg)] btn-transition text-sm">
                <Plus className="w-4 h-4 mr-1.5" /> Crear cupón
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[var(--bg)] border-[color:var(--stroke)] rounded-2xl">
              <DialogHeader><DialogTitle className="font-display">Nuevo cupón</DialogTitle></DialogHeader>
              <form onSubmit={e => { e.preventDefault(); setDialogOpen(false); toast.success('Cupón creado (simulado)'); }} className="space-y-3 mt-2">
                <div><label className="text-xs font-medium mb-1 block">Código</label><input className="w-full h-9 px-3 text-sm rounded-xl bg-[color:rgba(246,245,240,0.85)] border border-[color:var(--stroke)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)] uppercase" placeholder="CODIGO10" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs font-medium mb-1 block">Descuento (%)</label><input type="number" className="w-full h-9 px-3 text-sm rounded-xl bg-[color:rgba(246,245,240,0.85)] border border-[color:var(--stroke)]" placeholder="10" /></div>
                  <div><label className="text-xs font-medium mb-1 block">Expiración</label><input type="date" className="w-full h-9 px-3 text-sm rounded-xl bg-[color:rgba(246,245,240,0.85)] border border-[color:var(--stroke)]" /></div>
                </div>
                <Button type="submit" className="w-full rounded-xl bg-[var(--clr-primary)] text-[color:var(--bg)] btn-transition text-sm">Crear cupón</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="neo-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold">Código</TableHead>
                <TableHead className="text-xs font-semibold text-center">Descuento</TableHead>
                <TableHead className="text-xs font-semibold">Expiración</TableHead>
                <TableHead className="text-xs font-semibold text-center">Activo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {db.cupones.map(c => (
                <TableRow key={c.id_cupon} className="zebra-row">
                  <TableCell className="text-sm font-mono font-medium">{c.codigo}</TableCell>
                  <TableCell className="text-sm text-center">
                    <Badge variant="secondary" className="bg-[color:rgba(212,163,115,0.2)] text-[color:var(--clr-accent)] border-0 text-xs">
                      {c.descuento_porcentaje}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm opacity-60">{db.formatDate(c.fecha_expiracion)}</TableCell>
                  <TableCell className="text-center">
                    <Switch checked={c.activo} className="data-[state=checked]:bg-[var(--clr-primary)]" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </FadeIn>
    </div>
  );
}
