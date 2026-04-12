import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { ShoppingCart, Store, Search, Menu, X } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-[#2A3631]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Cambiamos <a> por <Link> */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center border border-[#A7C4B5]/30 group-hover:scale-105 transition-transform">
              <Store className="h-5 w-5 text-[#5C7065]" />
            </div>
            <span className="text-2xl font-bold text-[#2A3631] tracking-tight">MuebleClick</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            <Link to="/catalogo" className="px-4 py-2 rounded-xl text-sm font-medium text-[#5C7065] hover:text-[#2A3631] hover:bg-[#A7C4B5]/10 transition-colors">Catálogo</Link>
            <Link to="/mueblerias" className="px-4 py-2 rounded-xl text-sm font-medium text-[#5C7065] hover:text-[#2A3631] hover:bg-[#A7C4B5]/10 transition-colors">Mueblerías</Link>
          </nav>

          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="flex items-center px-4 py-2.5 bg-white/50 border border-[#2A3631]/10 rounded-full focus-within:ring-2 focus-within:ring-[#A7C4B5] transition-all">
                <Search className="h-4 w-4 text-[#5C7065] mr-3" />
                <input type="text" placeholder="Buscar muebles..." className="w-full bg-transparent text-sm focus:outline-none text-[#2A3631] placeholder:text-[#5C7065]/60" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/carrito" className="relative p-2 text-[#5C7065] hover:text-[#2A3631] transition-colors">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-[#A7C4B5] text-[#2A3631] text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
            </Link>
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-[#5C7065] hover:text-[#2A3631]">Iniciar Sesión</Link>
              <Link to="/registro" className="px-5 py-2.5 bg-[#2A3631] text-white text-sm font-medium rounded-full hover:bg-[#1f2824] hover:shadow-lg hover:-translate-y-0.5 transition-all">Registrarse</Link>
            </div>
            <button className="md:hidden p-2 text-[#5C7065]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}