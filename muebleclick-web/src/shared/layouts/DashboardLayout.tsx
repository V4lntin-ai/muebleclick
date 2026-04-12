import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Armchair, LayoutDashboard, Package, Warehouse, Building2, Users, Truck, ShoppingBag,
  Settings, ChevronLeft, Menu, Factory, ArrowLeftRight, ClipboardList, UserCircle,
  MapPin, ShoppingCart, BarChart3, Tag, BadgePercent, ChevronDown
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useState } from 'react';

const MENU_CONFIG = {
  cliente: [
    { label: 'Mi Perfil', href: '/cliente/perfil', icon: UserCircle },
    { label: 'Direcciones', href: '/cliente/direcciones', icon: MapPin },
    { label: 'Mis Pedidos', href: '/cliente/pedidos', icon: ShoppingBag },
  ],
  propietario: [
    { label: 'Dashboard', href: '/muebleria/dashboard', icon: LayoutDashboard },
    { label: 'Productos', href: '/muebleria/productos', icon: Package },
    { label: 'Inventario', href: '/muebleria/inventario', icon: Warehouse },
    { label: 'Sucursales', href: '/muebleria/sucursales', icon: Building2 },
    { label: 'Empleados', href: '/muebleria/empleados', icon: Users },
    { label: 'Proveedores', href: '/muebleria/proveedores', icon: Truck },
    { label: 'Órdenes de Compra', href: '/muebleria/ordenes-compra', icon: ClipboardList },
    { label: 'Producción', href: '/muebleria/produccion', icon: Factory },
    { label: 'Ventas', href: '/muebleria/ventas', icon: ShoppingCart },
  ],
  admin: [
    { label: 'Dashboard', href: '/admin/dashboard', icon: BarChart3 },
    { label: 'Usuarios', href: '/admin/usuarios', icon: Users },
    { label: 'Mueblerías', href: '/admin/mueblerias', icon: Building2 },
    { label: 'Cupones', href: '/admin/cupones', icon: BadgePercent },
    { label: 'Paqueterías', href: '/admin/paqueterias', icon: Truck },
  ],
};

const ROLE_LABELS = { cliente: 'Panel Cliente', propietario: 'Panel Mueblería', admin: 'Panel Admin' };
const ROLE_COLORS = { cliente: 'var(--clr-accent)', propietario: 'var(--clr-primary)', admin: 'var(--clr-primary)' };

export default function DashboardLayout() {
  const { currentRole, user, switchRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = MENU_CONFIG[currentRole] || [];
  const panelLabel = ROLE_LABELS[currentRole] || 'Panel';

  const SidebarContent = ({ mobile = false }) => (
    <div className={`flex flex-col h-full ${mobile ? '' : ''}`}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-[color:var(--stroke)]">
        <Link to="/" className="flex items-center gap-2">
          <Armchair className="w-6 h-6 text-[color:var(--clr-primary)] shrink-0" />
          {(!collapsed || mobile) && <span className="font-display font-bold text-sm text-[color:var(--clr-primary)]">MuebleClick</span>}
        </Link>
        {(!collapsed || mobile) && (
          <p className="text-[10px] uppercase tracking-wider mt-2 font-semibold" style={{ color: ROLE_COLORS[currentRole] }}>
            {panelLabel}
          </p>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto custom-scrollbar">
        {menuItems.map(item => {
          const active = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm sidebar-link ${
                active
                  ? 'bg-[color:rgba(46,94,78,0.12)] text-[color:var(--clr-primary)] font-semibold'
                  : 'text-[color:var(--fg)] opacity-70 hover:opacity-100 hover:bg-[color:rgba(46,94,78,0.06)]'
              }`}
              data-testid={`sidebar-link-${item.href.split('/').pop()}`}
            >
              <item.icon className="w-4.5 h-4.5 shrink-0" style={{ width: 18, height: 18 }} />
              {(!collapsed || mobile) && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-[color:var(--stroke)]">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 text-sm text-[color:var(--fg)] opacity-60 hover:opacity-100 rounded-xl hover:bg-[color:rgba(46,94,78,0.06)] sidebar-link"
        >
          <ChevronLeft className="w-4 h-4" />
          {(!collapsed || mobile) && <span>Volver a tienda</span>}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col border-r border-[color:var(--stroke)] bg-[var(--bg)] shrink-0 ${
        collapsed ? 'w-16' : 'w-60'
      }`} style={{ transitionProperty: 'width', transitionDuration: '200ms' }}>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-40 glass-card rounded-none border-x-0 border-t-0">
          <div className="flex items-center justify-between h-14 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              {/* Mobile sidebar trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden rounded-xl">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-[var(--bg)] w-64 p-0">
                  <SidebarContent mobile />
                </SheetContent>
              </Sheet>

              {/* Collapse button (desktop) */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCollapsed(!collapsed)}
                className="hidden lg:flex rounded-xl"
              >
                <Menu className="w-4 h-4" />
              </Button>

              {/* Breadcrumb */}
              <div className="text-sm text-[color:var(--fg)] opacity-60">
                {menuItems.find(i => i.href === location.pathname)?.label || panelLabel}
              </div>
            </div>

            {/* Role Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-xl text-xs gap-1.5 hover:bg-[color:rgba(212,163,115,0.18)]" data-testid="dashboard-role-switcher">
                  <UserCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">{user.nombre}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card-light min-w-[180px]">
                <p className="px-3 py-1.5 text-[10px] uppercase tracking-wider opacity-50">Cambiar rol</p>
                {['visitante','cliente','propietario','admin'].map(role => (
                  <DropdownMenuItem
                    key={role}
                    onClick={() => {
                      switchRole(role);
                      if (role === 'visitante') navigate('/');
                      else if (MENU_CONFIG[role]) navigate(MENU_CONFIG[role][0].href);
                    }}
                    className={`text-sm cursor-pointer ${currentRole === role ? 'font-semibold text-[color:var(--clr-primary)]' : ''}`}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/')} className="text-sm cursor-pointer">
                  Ir a la tienda
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
