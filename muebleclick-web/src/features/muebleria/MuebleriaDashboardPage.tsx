import { LayoutDashboard, Package, ShoppingCart, AlertTriangle, Truck } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAuth } from '@/shared/context/AuthContext';
import { FadeIn } from '@/shared/components/FadeIn';
import { StatCard } from '@/shared/components/StatCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import * as db from '@/shared/data/mockDb';

const CHART_DATA = [
  { mes: 'Ene', ventas: 45000 },
  { mes: 'Feb', ventas: 67200 },
  { mes: 'Mar', ventas: 52800 },
  { mes: 'Abr', ventas: 78500 },
  { mes: 'May', ventas: 61300 },
  { mes: 'Jun', ventas: 89100 },
];

const TOP_PRODUCTS = [
  { nombre: 'Sofá Milán 3 Plazas', ventas: 12 },
  { nombre: 'Mesa de Comedor Roble', ventas: 8 },
  { nombre: 'Escritorio Ejecutivo', ventas: 7 },
  { nombre: 'Sillón Relax', ventas: 6 },
  { nombre: 'Librero Modular', ventas: 5 },
];

export default function MuebleriaDashboardPage() {
  const { getMuebleriaActual } = useAuth();
  const muebleria = getMuebleriaActual();
  const productos = muebleria ? db.getProductosByMuebleria(muebleria.id_muebleria) : [];
  const sucursales = muebleria ? db.getSucursalesByMuebleria(muebleria.id_muebleria) : [];

  const stockCritico = db.inventario.filter(inv => {
    const suc = db.getSucursalById(inv.id_sucursal);
    return suc?.id_muebleria === muebleria?.id_muebleria && inv.cantidad <= inv.stock_min;
  });

  return (
    <div>
      <FadeIn>
        <h1 className="font-display text-2xl font-bold text-[color:var(--fg)] tracking-tight mb-1">
          Dashboard
        </h1>
        <p className="text-sm text-[color:var(--fg)] opacity-50 mb-6">{muebleria?.nombre_negocio || 'Mueblería'}</p>
      </FadeIn>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={ShoppingCart} label="Ventas (mes)" value={db.formatPrice(89100)} trend="+12% vs mes anterior" trendUp delay={0} />
        <StatCard icon={Package} label="Productos" value={productos.length} delay={0.05} />
        <StatCard icon={AlertTriangle} label="Stock crítico" value={stockCritico.length} trend={stockCritico.length > 0 ? 'Requiere atención' : 'Todo OK'} trendUp={stockCritico.length === 0} delay={0.1} />
        <StatCard icon={Truck} label="Envíos pendientes" value={2} delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Chart */}
        <FadeIn delay={0.2} className="lg:col-span-2">
          <div className="neo-card p-5">
            <h3 className="text-sm font-semibold text-[color:var(--fg)] mb-4">Ventas mensuales</h3>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E5E4E" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2E5E4E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(46,94,78,0.12)" />
                <XAxis dataKey="mes" tick={{ fill: 'rgba(27,27,27,0.5)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'rgba(27,27,27,0.5)', fontSize: 12 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => db.formatPrice(v)} contentStyle={{ borderRadius: 12, border: '1px solid rgba(46,94,78,0.18)', background: 'rgba(246,245,240,0.95)', backdropFilter: 'blur(8px)' }} />
                <Area type="monotone" dataKey="ventas" stroke="#2E5E4E" fill="url(#colorVentas)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </FadeIn>

        {/* Top Products */}
        <FadeIn delay={0.25}>
          <div className="neo-card p-5">
            <h3 className="text-sm font-semibold text-[color:var(--fg)] mb-4">Top productos</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={TOP_PRODUCTS} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(46,94,78,0.12)" />
                <XAxis type="number" tick={{ fill: 'rgba(27,27,27,0.5)', fontSize: 11 }} />
                <YAxis dataKey="nombre" type="category" width={100} tick={{ fill: 'rgba(27,27,27,0.6)', fontSize: 10 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid rgba(46,94,78,0.18)', background: 'rgba(246,245,240,0.95)' }} />
                <Bar dataKey="ventas" fill="#A3B18A" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </FadeIn>
      </div>

      {/* Suggested Actions */}
      <FadeIn delay={0.3}>
        <div className="neo-card p-5">
          <h3 className="text-sm font-semibold text-[color:var(--fg)] mb-4">Acciones sugeridas</h3>
          <div className="space-y-2">
            {stockCritico.length > 0 && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-[color:rgba(212,163,115,0.12)]">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[color:var(--clr-accent)]" />
                  <span className="text-sm">{stockCritico.length} producto(s) con stock crítico</span>
                </div>
                <Button asChild size="sm" variant="ghost" className="rounded-xl text-xs text-[color:var(--clr-primary)]">
                  <Link to="/muebleria/inventario">Revisar</Link>
                </Button>
              </div>
            )}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[color:rgba(46,94,78,0.06)]">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[color:var(--clr-primary)]" />
                <span className="text-sm">2 órdenes de compra pendientes</span>
              </div>
              <Button asChild size="sm" variant="ghost" className="rounded-xl text-xs text-[color:var(--clr-primary)]">
                <Link to="/muebleria/ordenes-compra">Ver</Link>
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
