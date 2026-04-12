import { Package, DollarSign, ShoppingCart, TrendingUp, ArrowUpRight } from 'lucide-react';

export function StoreDashboardPage() {
  const stats = [
    { title: 'Ventas del Mes', value: '$45,231.00', icon: DollarSign, trend: '+12.5%' },
    { title: 'Pedidos Nuevos', value: '24', icon: ShoppingCart, trend: '+5.2%' },
    { title: 'Productos Activos', value: '142', icon: Package, trend: '+2' },
    { title: 'Visitas a la Tienda', value: '1,204', icon: TrendingUp, trend: '+18.1%' },
  ];

  const recentOrders = [
    { id: '#PED-001', client: 'Ana García', product: 'Sofá Seccional Moderno', status: 'Pendiente', amount: '$12,500.00' },
    { id: '#PED-002', client: 'Carlos López', product: 'Mesa de Comedor Roble', status: 'Enviado', amount: '$8,900.00' },
    { id: '#PED-003', client: 'María Fernández', product: 'Sillón Individual', status: 'Entregado', amount: '$4,200.00' },
  ];

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#2A3631] tracking-tight">Hola, Muebles El Roble 👋</h1>
        <p className="text-[#5C7065] mt-1">Aquí tienes el resumen de tu negocio de hoy.</p>
      </div>

      {/* Tarjetas de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-[#2A3631]/5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#F2EFE9] rounded-xl">
                <stat.icon className="h-6 w-6 text-[#A7C4B5]" />
              </div>
              <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                {stat.trend} <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>
            </div>
            <h3 className="text-[#5C7065] text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-black text-[#2A3631]">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabla de Últimos Pedidos */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#2A3631]/5 overflow-hidden">
        <div className="p-6 border-b border-[#2A3631]/5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#2A3631]">Últimos Pedidos</h2>
          <button className="text-sm font-bold text-[#A7C4B5] hover:text-[#2A3631] transition-colors">Ver todos</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F2EFE9]/50 text-[#5C7065] text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">ID Pedido</th>
                <th className="px-6 py-4 font-bold">Cliente</th>
                <th className="px-6 py-4 font-bold">Producto</th>
                <th className="px-6 py-4 font-bold">Estado</th>
                <th className="px-6 py-4 font-bold">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A3631]/5">
              {recentOrders.map((order, i) => (
                <tr key={i} className="hover:bg-[#F2EFE9]/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#2A3631]">{order.id}</td>
                  <td className="px-6 py-4 text-[#5C7065]">{order.client}</td>
                  <td className="px-6 py-4 text-[#5C7065]">{order.product}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'Enviado' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-[#2A3631]">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}