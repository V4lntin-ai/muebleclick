import { Users, Building2, ShoppingBag, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const VENTAS_POR_MUEBLERIA = [
  { nombre: 'El Roble', ventas: 45 },
  { nombre: 'Casa Moderna', ventas: 32 },
  { nombre: 'Comfort', ventas: 28 },
  { nombre: 'Minimalia', ventas: 18 },
];

const PIE_DATA = [
  { name: 'Salas', value: 140 },
  { name: 'Comedores', value: 85 },
  { name: 'Recámaras', value: 110 },
  { name: 'Oficina', value: 45 },
];
// Nuestra paleta de colores para el gráfico
const PIE_COLORS = ['#2A3631', '#A7C4B5', '#5C7065', '#D1DFD7'];

const StatCard = ({ icon: Icon, label, value }: any) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#2A3631]/5 hover:shadow-md transition-shadow animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="p-3 bg-[#F2EFE9] rounded-xl w-fit mb-4">
      <Icon className="h-6 w-6 text-[#A7C4B5]" />
    </div>
    <h3 className="text-[#5C7065] text-sm font-medium mb-1">{label}</h3>
    <p className="text-2xl font-black text-[#2A3631]">{value}</p>
  </div>
);

export function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 animate-in fade-in duration-500">
        <h1 className="text-3xl font-black text-[#2A3631] tracking-tight">Dashboard General</h1>
        <p className="text-[#5C7065] mt-1">Vista global de toda la plataforma MuebleClick.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={Users} label="Usuarios Activos" value="1,245" />
        <StatCard icon={Building2} label="Mueblerías" value="48" />
        <StatCard icon={ShoppingBag} label="Pedidos Totales" value="892" />
        <StatCard icon={DollarSign} label="Ingresos Plataforma" value="$2.4M" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Gráfica de Barras */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#2A3631]/5 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h3 className="text-lg font-bold text-[#2A3631] mb-6">Ventas por Mueblería (Top 4)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={VENTAS_POR_MUEBLERIA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F2EFE9" vertical={false} />
              <XAxis dataKey="nombre" tick={{ fill: '#5C7065', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#5C7065', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#F2EFE9' }} contentStyle={{ borderRadius: '16px', border: 'none' }} />
              <Bar dataKey="ventas" fill="#2A3631" radius={[8, 8, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico Circular */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#2A3631]/5 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <h3 className="text-lg font-bold text-[#2A3631] mb-6">Distribución de Categorías</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {PIE_DATA.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-6">
            {PIE_DATA.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[index] }} />
                <span className="text-sm text-[#5C7065] font-medium">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}