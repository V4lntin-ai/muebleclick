import { BarChart3, Users, Building2, ShoppingBag, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FadeIn } from '@/shared/components/FadeIn';
import { StatCard } from '@/shared/components/StatCard';
import * as db from '@/shared/data/mockDb';

const VENTAS_POR_MUEBLERIA = db.mueblerias.map(m => ({
  nombre: m.nombre_negocio.split(' ')[0],
  ventas: db.ventas.filter(v => {
    const det = db.detalle_venta.filter(d => d.id_venta === v.id_venta);
    return det.some(d => {
      const prod = db.getProductoById(d.id_producto);
      return prod?.id_muebleria === m.id_muebleria;
    });
  }).length,
}));

const PIE_DATA = db.categorias.map(cat => ({
  name: cat,
  value: db.productos.filter(p => p.categoria === cat).length,
}));

const PIE_COLORS = ['#2E5E4E', '#A3B18A', '#D4A373', '#1B1B1B', '#8FBC8F'];

export default function AdminDashboardPage() {
  const totalVentas = db.ventas.reduce((a, v) => a + v.total_venta, 0);

  return (
    <div>
      <FadeIn>
        <h1 className="font-display text-2xl font-bold text-[color:var(--fg)] tracking-tight mb-1">Dashboard Administrador</h1>
        <p className="text-sm text-[color:var(--fg)] opacity-50 mb-6">Vista general de la plataforma</p>
      </FadeIn>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} label="Usuarios" value={db.usuarios.length} delay={0} />
        <StatCard icon={Building2} label="Mueblerías" value={db.mueblerias.length} delay={0.05} />
        <StatCard icon={ShoppingBag} label="Pedidos" value={db.pedidos.length} delay={0.1} />
        <StatCard icon={DollarSign} label="Ventas totales" value={db.formatPrice(totalVentas)} delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <FadeIn delay={0.2}>
          <div className="neo-card p-5">
            <h3 className="text-sm font-semibold text-[color:var(--fg)] mb-4">Ventas por mueblería</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={VENTAS_POR_MUEBLERIA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(46,94,78,0.12)" />
                <XAxis dataKey="nombre" tick={{ fill: 'rgba(27,27,27,0.6)', fontSize: 11 }} />
                <YAxis tick={{ fill: 'rgba(27,27,27,0.5)', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid rgba(46,94,78,0.18)', background: 'rgba(246,245,240,0.95)' }} />
                <Bar dataKey="ventas" fill="#2E5E4E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="neo-card p-5">
            <h3 className="text-sm font-semibold text-[color:var(--fg)] mb-4">Productos por categoría</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={PIE_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={4}>
                  {PIE_DATA.map((entry, i) => <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid rgba(46,94,78,0.18)', background: 'rgba(246,245,240,0.95)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {PIE_DATA.map((d, i) => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <span className="opacity-60">{d.name} ({d.value})</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Recent Activity */}
      <FadeIn delay={0.3}>
        <div className="neo-card p-5">
          <h3 className="text-sm font-semibold text-[color:var(--fg)] mb-4">Actividad reciente</h3>
          <div className="space-y-3">
            {db.pedidos.slice(0, 5).map(p => {
              const cliente = db.getUsuarioById(p.id_cliente);
              return (
                <div key={p.id_pedido} className="flex items-center justify-between py-2 border-b border-[color:var(--stroke)] last:border-0">
                  <div>
                    <p className="text-sm font-medium">{cliente?.nombre} realizó un pedido</p>
                    <p className="text-xs opacity-40">{db.formatDateTime(p.fecha_pedido)}</p>
                  </div>
                  <span className="text-sm font-medium tabular-nums">{db.formatPrice(p.total)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
