import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Store, LayoutDashboard, Package, Warehouse, Building2, Users, Truck, ShoppingBag,
  ClipboardList, Factory, ShoppingCart, BarChart3, BadgePercent, Menu, X, ChevronLeft, UserCircle, ChevronDown
} from 'lucide-react';

const useAuth = () => ({
  user: { nombre: 'Muebles El Roble', rol: 'propietario' }, 
});

const MENU_CONFIG: Record<string, any[]> = {
  cliente: [
    { label: 'Mi Perfil', href: '/dashboard/perfil', icon: UserCircle },
    { label: 'Mis Pedidos', href: '/dashboard/pedidos', icon: ShoppingBag },
  ],
  propietario: [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Productos', href: '/dashboard/productos', icon: Package },
    { label: 'Inventario', href: '/dashboard/inventario', icon: Warehouse },
    { label: 'Sucursales', href: '/dashboard/sucursales', icon: Building2 },
    { label: 'Empleados', href: '/dashboard/empleados', icon: Users },
    { label: 'Proveedores', href: '/dashboard/proveedores', icon: Truck },
    { label: 'Órdenes de Compra', href: '/dashboard/ordenes-compra', icon: ClipboardList },
    { label: 'Producción', href: '/dashboard/produccion', icon: Factory },
    { label: 'Ventas', href: '/dashboard/ventas', icon: ShoppingCart },
  ],
  admin: [
    { label: 'Dashboard', href: '/admin/dashboard', icon: BarChart3 },
    { label: 'Usuarios', href: '/admin/usuarios', icon: Users },
    { label: 'Mueblerías', href: '/admin/mueblerias', icon: Building2 },
    { label: 'Cupones', href: '/admin/cupones', icon: BadgePercent },
    { label: 'Paqueterías', href: '/admin/paqueterias', icon: Truck },
  ]
};

const ROLE_LABELS: Record<string, string> = { 
  cliente: 'Panel Cliente', 
  propietario: 'Panel Mueblería', 
  admin: 'Panel Admin'
};

export function DashboardLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = MENU_CONFIG[user.rol] || [];
  const panelLabel = ROLE_LABELS[user.rol] || 'Panel';

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full bg-white border-r border-[#2A3631]/10">
      
      {/* Header del Sidebar: Ahora con el botón ANTES del logo */}
      <div className={`flex items-center h-16 border-b border-[#2A3631]/10 shrink-0 ${isCollapsed && !isMobile ? 'justify-center' : 'px-4 gap-3'}`}>
        <button 
          onClick={() => isMobile ? setMobileOpen(false) : setIsCollapsed(!isCollapsed)} 
          className="p-1.5 text-[#5C7065] hover:bg-[#F2EFE9] hover:text-[#2A3631] rounded-lg transition-colors shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>

        {(!isCollapsed || isMobile) && (
          <Link to="/" className="flex items-center gap-2 overflow-hidden hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 shrink-0 bg-[#A7C4B5]/20 rounded-lg flex items-center justify-center">
              <Store className="w-4 h-4 text-[#2A3631]" />
            </div>
            <div className="flex flex-col justify-center whitespace-nowrap">
              <span className="font-black text-sm text-[#2A3631] leading-none mb-0.5">MuebleClick</span>
              <span className="text-[9px] uppercase tracking-wider font-bold text-[#A7C4B5] leading-none">{panelLabel}</span>
            </div>
          </Link>
        )}
      </div>

      {/* Navegación del Sidebar */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map(item => {
          const active = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              title={isCollapsed && !isMobile ? item.label : undefined}
              onClick={() => isMobile && setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                active
                  ? 'bg-[#A7C4B5]/20 text-[#2A3631] font-bold shadow-sm'
                  : 'text-[#5C7065] hover:bg-[#F2EFE9] hover:text-[#2A3631] font-medium'
              } ${isCollapsed && !isMobile ? 'justify-center px-0' : ''}`}
            >
              <item.icon className="w-4.5 h-4.5 shrink-0" style={{ width: 18, height: 18 }} />
              {(!isCollapsed || isMobile) && <span className="whitespace-nowrap">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer del Sidebar */}
      <div className="p-3 border-t border-[#2A3631]/10 shrink-0">
        <button onClick={() => navigate('/')} className={`flex items-center gap-3 px-3 py-2.5 w-full text-sm text-[#5C7065] hover:text-[#2A3631] hover:bg-[#F2EFE9] rounded-xl transition-all font-bold ${isCollapsed && !isMobile ? 'justify-center px-0' : ''}`}>
          <ChevronLeft className="w-4.5 h-4.5 shrink-0" style={{ width: 18, height: 18 }} />
          {(!isCollapsed || isMobile) && <span className="whitespace-nowrap">Volver a tienda</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#F2EFE9]">
      
      {/* Sidebar Desktop */}
      <aside 
        className={`hidden lg:block shrink-0 h-screen sticky top-0 transition-[width] duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Overlay para móviles */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-[#2A3631]/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      
      {/* Sidebar Mobile */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent isMobile />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Topbar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-[#2A3631]/10 shadow-sm flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            
            {/* Solo se muestra en móvil, el de desktop ya está en el Sidebar */}
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-1.5 text-[#5C7065] hover:bg-[#F2EFE9] rounded-lg transition-colors">
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb / Título dinámico */}
            <h2 className="text-sm font-semibold text-[#5C7065] hidden sm:block">
              {menuItems.find(i => i.href === location.pathname)?.label || 'Dashboard'}
            </h2>
          </div>

          {/* Menú de Usuario: Se le devolvió el fondo, borde y sombra (shadow-sm) */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#2A3631]/10 shadow-sm rounded-lg hover:bg-[#F2EFE9] hover:shadow-md cursor-pointer transition-all">
            <UserCircle className="w-5 h-5 text-[#5C7065]" />
            <span className="hidden sm:inline text-sm font-semibold text-[#2A3631]">{user.nombre}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#5C7065]" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}