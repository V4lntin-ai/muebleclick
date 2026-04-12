import { ShoppingCart, Calendar } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FadeIn } from '@/shared/components/FadeIn';
import { BadgeEstado } from '@/shared/components/BadgeEstado';
import { StatCard } from '@/shared/components/StatCard';
import * as db from '@/shared/data/mockDb';

const SALES_DATA = [
  { mes: 'Ene', total: 18500 },
  { mes: 'Feb', total: 66010 },
  { mes: 'Mar', total: 49575 },
  { mes: 'Abr', total: 72000 },
  { mes: 'May', total: 55000 },
  { mes: 'Jun', total: 91000 },
];

export default function MuebleriaVentasPage() {
  const totalVentas = db.ventas.reduce((a, v) => a + v.total_venta, 0);
  const totalComisiones = db.registro_comisiones.reduce((a, c) => a + c.monto, 0);

  return (
    <div>
      <FadeIn>
        <h1 className="font-display text-2xl font-bold text-[color:var(--fg)] tracking-tight mb-6">Ventas</h1>
      </FadeIn>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={ShoppingCart} label="Total ventas" value={db.formatPrice(totalVentas)} delay={0} />
        <StatCard icon={Calendar} label="Ventas (mes)" value={db.ventas.length} delay={0.05} />
        <StatCard icon={ShoppingCart} label="Comisiones" value={db.formatPrice(totalComisiones)} delay={0.1} />
        <StatCard icon={Calendar} label="Ticket promedio" value={db.formatPrice(totalVentas / db.ventas.length)} delay={0.15} />
      </div>

      {/* Chart */}
      <FadeIn delay={0.2}>
        <div className="neo-card p-5 mb-6">
          <h3 className="text-sm font-semibold text-[color:var(--fg)] mb-4">Tendencia de ventas</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={SALES_DATA}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4A373" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#D4A373" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(46,94,78,0.12)" />
              <XAxis dataKey="mes" tick={{ fill: 'rgba(27,27,27,0.5)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'rgba(27,27,27,0.5)', fontSize: 12 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={v => db.formatPrice(v)} contentStyle={{ borderRadius: 12, border: '1px solid rgba(46,94,78,0.18)', background: 'rgba(246,245,240,0.95)' }} />
              <Area type="monotone" dataKey="total" stroke="#D4A373" fill="url(#colorTotal)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </FadeIn>

      {/* Table */}
      <FadeIn delay={0.25}>
        <div className="neo-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold">Venta</TableHead>
                <TableHead className="text-xs font-semibold">Cliente</TableHead>
                <TableHead className="text-xs font-semibold">Fecha</TableHead>
                <TableHead className="text-xs font-semibold text-right">Subtotal</TableHead>
                <TableHead className="text-xs font-semibold text-right">Descuento</TableHead>
                <TableHead className="text-xs font-semibold text-right">Total</TableHead>
                <TableHead className="text-xs font-semibold">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {db.ventas.map(v => {
                const cliente = db.getUsuarioById(v.id_cliente);
                return (
                  <TableRow key={v.id_venta} className="zebra-row">
                    <TableCell className="text-sm font-medium">#{v.id_venta}</TableCell>
                    <TableCell className="text-sm">{cliente?.nombre}</TableCell>
                    <TableCell className="text-sm opacity-60">{db.formatDate(v.fecha_venta)}</TableCell>
                    <TableCell className="text-sm tabular-nums text-right">{db.formatPrice(v.sub_total)}</TableCell>
                    <TableCell className="text-sm tabular-nums text-right text-[color:var(--clr-primary)]">{v.descuento > 0 ? `-${db.formatPrice(v.descuento)}` : '—'}</TableCell>
                    <TableCell className="text-sm font-medium tabular-nums text-right">{db.formatPrice(v.total_venta)}</TableCell>
                    <TableCell><BadgeEstado estado={v.estado_venta} /></TableCell>
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
