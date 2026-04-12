import { useState } from 'react';
import { MapPin, Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/shared/context/AuthContext';
import { FadeIn, StaggerContainer, StaggerItem } from '@/shared/components/FadeIn';
import { EmptyState } from '@/shared/components/EmptyState';
import * as db from '@/shared/data/mockDb';
import { toast } from 'sonner';

export default function ClientAddressesPage() {
  const { getClienteActual } = useAuth();
  const cliente = getClienteActual();
  const [direcciones, setDirecciones] = useState(
    cliente ? db.getDireccionesByCliente(cliente.id_usuario) : []
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = (id) => {
    setDirecciones(prev => prev.filter(d => d.id_direccion !== id));
    toast.success('Dirección eliminada');
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const newDir = {
      id_direccion: Date.now(),
      id_cliente: cliente?.id_usuario,
      calle_numero: form.get('calle'),
      id_municipio: 1,
      referencias: form.get('referencias'),
    };
    setDirecciones(prev => [...prev, newDir]);
    setDialogOpen(false);
    toast.success('Dirección agregada');
  };

  return (
    <div className="max-w-4xl">
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold text-[color:var(--fg)] tracking-tight">Mis Direcciones</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl bg-[var(--clr-primary)] text-[color:var(--bg)] btn-transition text-sm" data-testid="add-address-button">
                <Plus className="w-4 h-4 mr-1.5" /> Agregar
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[var(--bg)] border-[color:var(--stroke)] rounded-2xl">
              <DialogHeader>
                <DialogTitle className="font-display">Nueva dirección</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4 mt-2">
                <div>
                  <label className="text-xs font-medium mb-1 block">Calle y número</label>
                  <input name="calle" required className="w-full h-9 px-3 text-sm rounded-xl bg-[color:rgba(246,245,240,0.85)] border border-[color:var(--stroke)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)]" />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">Referencias</label>
                  <input name="referencias" className="w-full h-9 px-3 text-sm rounded-xl bg-[color:rgba(246,245,240,0.85)] border border-[color:var(--stroke)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)]" />
                </div>
                <Button type="submit" className="w-full rounded-xl bg-[var(--clr-primary)] text-[color:var(--bg)] btn-transition text-sm">
                  Guardar dirección
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </FadeIn>

      {direcciones.length === 0 ? (
        <EmptyState icon={MapPin} title="Sin direcciones" description="Agrega una dirección de envío." />
      ) : (
        <StaggerContainer className="space-y-3">
          {direcciones.map(dir => (
            <StaggerItem key={dir.id_direccion}>
              <div className="neo-card p-4 sm:p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[color:rgba(212,163,115,0.15)] shrink-0">
                  <MapPin className="w-5 h-5 text-[color:var(--clr-accent)]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{dir.calle_numero}</p>
                  <p className="text-xs opacity-50 mt-0.5">{db.getUbicacionCompleta(dir.id_municipio)}</p>
                  {dir.referencias && <p className="text-xs opacity-40 mt-0.5">{dir.referencias}</p>}
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="rounded-xl h-8 w-8 p-0 opacity-40 hover:opacity-100">
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-xl h-8 w-8 p-0 opacity-40 hover:opacity-100 hover:text-red-500" onClick={() => handleDelete(dir.id_direccion)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}
