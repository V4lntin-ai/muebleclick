import { useState } from 'react';
import { Package, Plus, Search, Pencil, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/shared/context/AuthContext';
import { FadeIn } from '@/shared/components/FadeIn';
import { EmptyState } from '@/shared/components/EmptyState';
import * as db from '@/shared/data/mockDb';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export default function MuebleriaProductosPage() {
  const { getMuebleriaActual } = useAuth();
  const muebleria = getMuebleriaActual();
  const allProducts = muebleria ? db.getProductosByMuebleria(muebleria.id_muebleria) : [];
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = allProducts.filter(p =>
    p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.categoria.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold text-[color:var(--fg)] tracking-tight">Productos</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl bg-[var(--clr-primary)] text-[color:var(--bg)] btn-transition text-sm" data-testid="store-products-create-button">
                <Plus className="w-4 h-4 mr-1.5" /> Nuevo producto
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[var(--bg)] border-[color:var(--stroke)] rounded-2xl sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-display">Crear producto</DialogTitle>
              </DialogHeader>
              <form onSubmit={e => { e.preventDefault(); setDialogOpen(false); toast.success('Producto creado (simulado)'); }} className="space-y-3 mt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs font-medium mb-1 block">SKU</label><Input className="rounded-xl" placeholder="SAL-005" /></div>
                  <div><label className="text-xs font-medium mb-1 block">Categoría</label><Input className="rounded-xl" placeholder="Salas" /></div>
                </div>
                <div><label className="text-xs font-medium mb-1 block">Nombre</label><Input className="rounded-xl" placeholder="Nombre del producto" /></div>
                <div><label className="text-xs font-medium mb-1 block">Descripción</label><textarea className="w-full h-20 px-3 py-2 text-sm rounded-xl bg-[color:rgba(246,245,240,0.85)] border border-[color:var(--stroke)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)] resize-none" placeholder="Descripción del producto..." /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs font-medium mb-1 block">Precio venta</label><Input type="number" className="rounded-xl" placeholder="0.00" /></div>
                  <div><label className="text-xs font-medium mb-1 block">Peso (kg)</label><Input type="number" className="rounded-xl" placeholder="0" /></div>
                </div>
                <Button type="submit" className="w-full rounded-xl bg-[var(--clr-primary)] text-[color:var(--bg)] btn-transition text-sm">
                  Crear producto
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </FadeIn>

      {/* Search */}
      <FadeIn delay={0.05}>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
          <input
            type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, SKU o categoría..."
            className="w-full h-10 pl-9 pr-3 text-sm rounded-xl bg-[color:rgba(246,245,240,0.85)] border border-[color:var(--stroke)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)]"
            data-testid="store-products-search"
          />
        </div>
      </FadeIn>

      {filtered.length === 0 ? (
        <EmptyState icon={Package} title="Sin productos" description="Crea tu primer producto para comenzar." />
      ) : (
        <FadeIn delay={0.1}>
          <div className="neo-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold w-16">Imagen</TableHead>
                  <TableHead className="text-xs font-semibold">Producto</TableHead>
                  <TableHead className="text-xs font-semibold">SKU</TableHead>
                  <TableHead className="text-xs font-semibold">Categoría</TableHead>
                  <TableHead className="text-xs font-semibold text-right">Precio</TableHead>
                  <TableHead className="text-xs font-semibold text-center">Stock</TableHead>
                  <TableHead className="text-xs font-semibold w-24"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(p => (
                  <TableRow key={p.id_producto} className="zebra-row">
                    <TableCell><img src={p.imagen_url} alt={p.nombre} className="w-10 h-10 rounded-lg object-cover" /></TableCell>
                    <TableCell className="text-sm font-medium">{p.nombre}</TableCell>
                    <TableCell className="text-sm opacity-60 font-mono">{p.sku}</TableCell>
                    <TableCell className="text-sm opacity-70">{p.categoria}</TableCell>
                    <TableCell className="text-sm font-medium tabular-nums text-right">{db.formatPrice(p.precio_venta)}</TableCell>
                    <TableCell className="text-sm text-center tabular-nums">{db.getStockTotal(p.id_producto)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 justify-end">
                        <Button asChild variant="ghost" size="sm" className="rounded-xl h-8 w-8 p-0">
                          <Link to={`/producto/${p.id_producto}`}><Eye className="w-3.5 h-3.5" /></Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-xl h-8 w-8 p-0" onClick={() => toast.info('Edición simulada')}>
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
