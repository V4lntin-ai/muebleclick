import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, ChevronDown, Armchair } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/shared/context/CartContext';
import { useAuth } from '@/shared/context/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import * as db from '@/shared/data/mockDb';

const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Catálogo', href: '/catalogo' },
];

const ROLE_LABELS = { visitante: 'Visitante', cliente: 'Cliente', propietario: 'Propietario', admin: 'Admin' };
const ROLE_ROUTES = { cliente: '/cliente/perfil', propietario: '/muebleria/dashboard', admin: '/admin/dashboard' };

export default function PublicLayout() {
  const { itemCount } = useCart();
  const { currentRole, switchRole, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/catalogo?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card rounded-none border-x-0 border-t-0">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0" data-testid="logo-link">
              <Armchair className="w-7 h-7 text-[color:var(--clr-primary)]" />
              <span className="font-display font-bold text-lg text-[color:var(--clr-primary)] hidden sm:block">MuebleClick</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 ml-8">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium sidebar-link ${
                    location.pathname === link.href ? 'text-[color:var(--clr-primary)]' : 'text-[color:var(--fg)] opacity-70 hover:opacity-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {db.categorias.map(cat => (
                <Link
                  key={cat}
                  to={`/catalogo?cat=${encodeURIComponent(cat)}`}
                  className="text-sm text-[color:var(--fg)] opacity-60 hover:opacity-100 sidebar-link"
                >
                  {cat}
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-xs mx-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--fg)] opacity-40" />
                <input
                  type="text"
                  placeholder="Buscar muebles..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 text-sm rounded-xl bg-[color:rgba(246,245,240,0.85)] border border-[color:var(--stroke)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)]"
                  data-testid="header-search-input"
                />
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Role Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-xl text-xs gap-1 px-2 sm:px-3 hover:bg-[color:rgba(212,163,115,0.18)]" data-testid="role-switcher-dropdown">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{ROLE_LABELS[currentRole]}</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-card-light min-w-[180px]">
                  <p className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-[color:var(--fg)] opacity-50">Cambiar rol</p>
                  {Object.entries(ROLE_LABELS).map(([role, label]) => (
                    <DropdownMenuItem
                      key={role}
                      onClick={() => switchRole(role)}
                      className={`text-sm cursor-pointer ${currentRole === role ? 'font-semibold text-[color:var(--clr-primary)]' : ''}`}
                      data-testid={`role-switch-${role}`}
                    >
                      {label}
                    </DropdownMenuItem>
                  ))}
                  {currentRole !== 'visitante' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => navigate(ROLE_ROUTES[currentRole] || '/')}
                        className="text-sm cursor-pointer font-medium text-[color:var(--clr-primary)]"
                      >
                        Ir a mi panel
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cart */}
              <Link to="/carrito" className="relative" data-testid="cart-icon-link">
                <Button variant="ghost" size="sm" className="rounded-xl hover:bg-[color:rgba(212,163,115,0.18)]">
                  <ShoppingCart className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--clr-accent)] text-white text-[10px] font-bold flex items-center justify-center" data-testid="cart-badge">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Mobile menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden rounded-xl hover:bg-[color:rgba(212,163,115,0.18)]">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[var(--bg)] w-72">
                  <div className="flex flex-col gap-1 mt-6">
                    <form onSubmit={handleSearch} className="mb-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                        <input
                          type="text"
                          placeholder="Buscar..."
                          value={search}
                          onChange={e => setSearch(e.target.value)}
                          className="w-full h-10 pl-9 pr-3 text-sm rounded-xl bg-[color:rgba(246,245,240,0.85)] border border-[color:var(--stroke)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)]"
                        />
                      </div>
                    </form>
                    {NAV_LINKS.map(link => (
                      <Link key={link.href} to={link.href} className="px-3 py-2.5 text-sm rounded-xl hover:bg-[color:rgba(46,94,78,0.06)]">
                        {link.label}
                      </Link>
                    ))}
                    <div className="border-t border-[color:var(--stroke)] my-2" />
                    <p className="px-3 text-[10px] uppercase tracking-wider opacity-50 mb-1">Categorías</p>
                    {db.categorias.map(cat => (
                      <Link key={cat} to={`/catalogo?cat=${encodeURIComponent(cat)}`} className="px-3 py-2 text-sm rounded-xl hover:bg-[color:rgba(46,94,78,0.06)]">
                        {cat}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-[color:var(--stroke)] mt-auto">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Armchair className="w-6 h-6 text-[color:var(--clr-primary)]" />
                <span className="font-display font-bold text-base text-[color:var(--clr-primary)]">MuebleClick</span>
              </div>
              <p className="text-xs text-[color:var(--fg)] opacity-50 leading-relaxed">Tu marketplace de confianza para muebles de calidad en todo México.</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[color:var(--fg)] opacity-60 mb-3">Navegación</h4>
              <div className="flex flex-col gap-2">
                <Link to="/" className="text-sm text-[color:var(--fg)] opacity-70 hover:opacity-100">Inicio</Link>
                <Link to="/catalogo" className="text-sm text-[color:var(--fg)] opacity-70 hover:opacity-100">Catálogo</Link>
                <Link to="/carrito" className="text-sm text-[color:var(--fg)] opacity-70 hover:opacity-100">Carrito</Link>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[color:var(--fg)] opacity-60 mb-3">Categorías</h4>
              <div className="flex flex-col gap-2">
                {db.categorias.map(cat => (
                  <Link key={cat} to={`/catalogo?cat=${encodeURIComponent(cat)}`} className="text-sm text-[color:var(--fg)] opacity-70 hover:opacity-100">{cat}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[color:var(--fg)] opacity-60 mb-3">Confianza</h4>
              <div className="flex flex-col gap-2 text-sm text-[color:var(--fg)] opacity-70">
                <span>Envíos a todo México</span>
                <span>Pagos seguros</span>
                <span>Garantía de calidad</span>
                <span>Soporte dedicado</span>
              </div>
            </div>
          </div>
          <div className="border-t border-[color:var(--stroke)] mt-8 pt-6 text-center">
            <p className="text-xs text-[color:var(--fg)] opacity-40">&copy; 2024 MuebleClick. Marketplace de muebles (demo con datos simulados).</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
