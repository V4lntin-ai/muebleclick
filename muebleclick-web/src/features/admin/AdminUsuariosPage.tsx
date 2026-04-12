import { useState } from 'react';
import { Users, Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { FadeIn } from '@/shared/components/FadeIn';
import * as db from '@/shared/data/mockDb';

export default function AdminUsuariosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = db.usuarios.filter(u =>
    u.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.correo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <FadeIn>
        <h1 className="font-display text-2xl font-bold text-[color:var(--fg)] tracking-tight mb-6">Usuarios</h1>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
          <input
            type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre o correo..."
            className="w-full h-10 pl-9 pr-3 text-sm rounded-xl bg-[color:rgba(246,245,240,0.85)] border border-[color:var(--stroke)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)]"
            data-testid="admin-users-search"
          />
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="neo-card overflow-hidden" data-testid="admin-users-table">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold">Usuario</TableHead>
                <TableHead className="text-xs font-semibold">Correo</TableHead>
                <TableHead className="text-xs font-semibold">Rol</TableHead>
                <TableHead className="text-xs font-semibold">Registro</TableHead>
                <TableHead className="text-xs font-semibold text-center">Activo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(u => {
                const rol = db.getRolById(u.role_id);
                return (
                  <TableRow key={u.id_usuario} className="zebra-row">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: 'var(--clr-primary)' }}>
                          {u.nombre.charAt(0)}
                        </div>
                        <span className="text-sm font-medium">{u.nombre}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm opacity-60">{u.correo}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-[color:rgba(163,177,138,0.2)] text-[color:var(--fg)] border-0 text-xs">
                        {rol?.nombre || 'Sin rol'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm opacity-60">{db.formatDate(u.fecha_registro)}</TableCell>
                    <TableCell className="text-center">
                      <Switch checked={u.activo} className="data-[state=checked]:bg-[var(--clr-primary)]" />
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
