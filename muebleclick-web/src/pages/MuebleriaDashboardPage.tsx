import { ShoppingCart, Package, AlertTriangle, Truck, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const CHART_DATA = [
  { mes: 'Ene', ventas: 45000 }, { mes: 'Feb', ventas: 67200 },
  { mes: 'Mar', ventas: 52800 }, { mes: 'Abr', ventas: 78500 },
  { mes: 'May', ventas: 61300 }, { mes: 'Jun', ventas: 89100 },
];

const TOP_PRODUCTS = [
  { nombre: 'Sofá Milán 3 Plazas', ventas: 12 },
  { nombre: 'Mesa Roble', ventas: 8 },
  { nombre: 'Escritorio Exec', ventas: 7 },
  { nombre: 'Sillón Relax', ventas: 6 },
];

const StatCard = ({ icon: Icon, label, value, trend, trendUp }: any) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-[#2A3631]/5 hover:shadow-md transition-shadow animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex justify-between items-start mb-3">
      <div className="p-2.5 bg-[#F2EFE9] rounded-lg">
        <Icon className="h-5 w-5 text-[#A7C4B5]" />
      </div>
      {trend && (
        <span className={`flex items-center text-[10px] font-bold px-2 py-0.5 rounded-md ${trendUp ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
          {trend} {trendUp ? <ArrowUpRight className="h-3 w-3 ml-0.5" /> : <ArrowDownRight className="h-3 w-3 ml-0.5" />}
        </span>
      )}
    </div>
    <h3 className="text-[#5C7065] text-xs font-semibold mb-1">{label}</h3>
    <p className="text-xl font-black text-[#2A3631]">{value}</p>
  </div>
);

export function MuebleriaDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 animate-in fade-in duration-500">
        <h1 className="text-2xl font-bold text-[#2A3631] tracking-tight">Dashboard</h1>
        <p className="text-sm text-[#5C7065] mt-1">Muebles El Roble</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={ShoppingCart} label="Ventas (mes)" value="$89,100.00" trend="+12%" trendUp={true} />
        <StatCard icon={Package} label="Productos" value="142" />
        <StatCard icon={AlertTriangle} label="Stock crítico" value="0" trend="Todo OK" trendUp={true} />
        <StatCard icon={Truck} label="Envíos pendientes" value="2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Gráfica de Ventas */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow-sm border border-[#2A3631]/5 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h3 className="text-sm font-semibold text-[#2A3631] mb-4">Ventas mensuales</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={CHART_DATA}>
              <defs>
                <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A7C4B5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#A7C4B5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F2EFE9" vertical={false} />
              <XAxis dataKey="mes" tick={{ fill: '#5C7065', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#5C7065', fontSize: 11 }} tickFormatter={v => `$${v/1000}k`} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #F2EFE9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
              <Area type="monotone" dataKey="ventas" stroke="#2A3631" strokeWidth={2} fill="url(#colorVentas)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Productos */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-[#2A3631]/5 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <h3 className="text-sm font-semibold text-[#2A3631] mb-4">Top productos</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={TOP_PRODUCTS} layout="vertical" margin={{ left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F2EFE9" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="nombre" type="category" axisLine={false} tickLine={false} tick={{ fill: '#5C7065', fontSize: 10 }} width={90} />
              <Tooltip cursor={{ fill: '#F2EFE9' }} contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '12px' }} />
              <Bar dataKey="ventas" fill="#A7C4B5" radius={[0, 6, 6, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}