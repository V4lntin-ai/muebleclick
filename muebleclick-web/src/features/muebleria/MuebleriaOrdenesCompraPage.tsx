import { ClipboardList, Plus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FadeIn } from '@/shared/components/FadeIn';
import { BadgeEstado } from '@/shared/components/BadgeEstado';
import * as db from '@/shared/data/mockDb';
import { toast } from 'sonner';
import { useState } from 'react';

export default function MuebleriaOrdenesCompraPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold text-[color:var(--fg)] tracking-tight">Órdenes de Compra</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl bg-[var(--clr-primary)] text-[color:var(--bg)] btn-transition text-sm">
                <Plus className="w-4 h-4 mr-1.5" /> Nueva orden
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[var(--bg)] border-[color:var(--stroke)] rounded-2xl">
              <DialogHeader><DialogTitle className="font-display">Crear orden de compra</DialogTitle></DialogHeader>
              <form onSubmit={e => { e.preventDefault(); setDialogOpen(false); toast.success('Orden creada (simulado)'); }} className="space-y-3 mt-2">
                <div><label className="text-xs font-medium mb-1 block">Proveedor</label>
                  <select className="w-full h-9 px-3 text-sm rounded-xl bg-[color:rgba(246,245,240,0.85)] border border-[color:var(--stroke)]">
                    {db.proveedores.map(p => <option key={p.id_proveedor} value={p.id_proveedor}>{p.nombre}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs font-medium mb-1 block">Total estimado</label><input type="number" className="w-full h-9 px-3 text-sm rounded-xl bg-[color:rgba(246,245,240,0.85)] border border-[color:var(--stroke)]" placeholder="0.00" /></div>
                  <div><label className="text-xs font-medium mb-1 block">Fecha esperada</label><input type="date" className="w-full h-9 px-3 text-sm rounded-xl bg-[color:rgba(246,245,240,0.85)] border border-[color:var(--stroke)]" /></div>
                </div>
                <Button type="submit" className="w-full rounded-xl bg-[var(--clr-primary)] text-[color:var(--bg)] btn-transition text-sm">Crear orden</Button>
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
                <TableHead className="text-xs font-semibold">Orden</TableHead>
                <TableHead className="text-xs font-semibold">Proveedor</TableHead>
                <TableHead className="text-xs font-semibold">Sucursal</TableHead>
                <TableHead className="text-xs font-semibold">Fecha</TableHead>
                <TableHead className="text-xs font-semibold text-right">Total</TableHead>
                <TableHead className="text-xs font-semibold">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {db.ordenes_compra.map(oc => {
                const prov = db.getProveedorById(oc.id_proveedor);
                const suc = db.getSucursalById(oc.id_sucursal);
                return (
                  <TableRow key={oc.id_orden} className="zebra-row">
                    <TableCell className="text-sm font-medium">#{oc.id_orden}</TableCell>
                    <TableCell className="text-sm">{prov?.nombre}</TableCell>
                    <TableCell className="text-sm opacity-70">{suc?.nombre_sucursal?.split(' - ')[1] || suc?.nombre_sucursal}</TableCell>
                    <TableCell className="text-sm opacity-60">{db.formatDate(oc.fecha_orden)}</TableCell>
                    <TableCell className="text-sm font-medium tabular-nums text-right">{db.formatPrice(oc.total)}</TableCell>
                    <TableCell><BadgeEstado estado={oc.estado} /></TableCell>
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
