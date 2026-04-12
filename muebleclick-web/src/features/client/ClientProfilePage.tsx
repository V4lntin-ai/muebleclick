import { useAuth } from '@/shared/context/AuthContext';
import { FadeIn } from '@/shared/components/FadeIn';
import { StatCard } from '@/shared/components/StatCard';
import { Star, ShoppingBag, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import * as db from '@/shared/data/mockDb';

export default function ClientProfilePage() {
  const { user, getClienteActual } = useAuth();
  const cliente = getClienteActual();
  const pedidosCount = cliente ? db.getPedidosByCliente(cliente.id_usuario).length : 0;
  const direccionesCount = cliente ? db.getDireccionesByCliente(cliente.id_usuario).length : 0;

  return (
    <div className="max-w-4xl">
      <FadeIn>
        <h1 className="font-display text-2xl font-bold text-[color:var(--fg)] tracking-tight mb-6">Mi Perfil</h1>
      </FadeIn>

      {/* Profile Card */}
      <FadeIn delay={0.05}>
        <div className="neo-card p-6 mb-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold font-display text-white shrink-0" style={{ background: 'var(--clr-primary)' }}>
              {user.nombre?.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-[color:var(--fg)]">{user.nombre}</h2>
              <p className="text-sm text-[color:var(--fg)] opacity-50">{user.correo}</p>
              {cliente && (
                <>
                  <p className="text-sm text-[color:var(--fg)] opacity-50 mt-0.5">{cliente.telefono}</p>
                  <p className="text-xs text-[color:var(--fg)] opacity-40 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {cliente.direccion_principal}
                  </p>
                </>
              )}
              <p className="text-xs text-[color:var(--fg)] opacity-40 mt-1 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Miembro desde {db.formatDate(user.fecha_registro)}
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Star} label="Puntos" value={cliente?.puntos || 0} delay={0.1} />
        <StatCard icon={ShoppingBag} label="Pedidos" value={pedidosCount} delay={0.15} />
        <StatCard icon={MapPin} label="Direcciones" value={direccionesCount} delay={0.2} />
        <StatCard icon={Calendar} label="Antigüedad" value="1 año" delay={0.25} />
      </div>

      {/* Quick Actions */}
      <FadeIn delay={0.3}>
        <div className="neo-card p-5">
          <h3 className="text-sm font-semibold text-[color:var(--fg)] mb-4">Acciones rápidas</h3>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" className="rounded-xl border-[color:var(--stroke)] text-sm">
              <Link to="/cliente/pedidos">Ver mis pedidos</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl border-[color:var(--stroke)] text-sm">
              <Link to="/cliente/direcciones">Gestionar direcciones</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl border-[color:var(--stroke)] text-sm">
              <Link to="/catalogo">Ir al catálogo</Link>
            </Button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
