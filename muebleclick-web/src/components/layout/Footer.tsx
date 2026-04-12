import { Store, MapPin, Phone, Mail, Share } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#2A3631] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#A7C4B5] rounded-xl flex items-center justify-center">
                <Store className="h-5 w-5 text-[#2A3631]" />
              </div>
              <span className="text-2xl font-bold tracking-tight">MuebleClick</span>
            </a>
            <p className="text-sm text-white/60 mb-6">El marketplace líder en muebles de calidad. Conectamos mueblerías con clientes que buscan piezas únicas.</p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#A7C4B5] hover:text-[#2A3631] transition-all"><Share className="h-4 w-4" /></a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#A7C4B5] hover:text-[#2A3631] transition-all"><Share className="h-4 w-4" /></a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#A7C4B5] hover:text-[#2A3631] transition-all"><Share className="h-4 w-4" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Explorar</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><a href="#" className="hover:text-[#A7C4B5] transition-colors">Catálogo</a></li>
              <li><a href="#" className="hover:text-[#A7C4B5] transition-colors">Mueblerías</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Para Mueblerías</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><a href="#" className="hover:text-[#A7C4B5] transition-colors">Registrar Mueblería</a></li>
              <li><a href="#" className="hover:text-[#A7C4B5] transition-colors">Panel de Vendedor</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-center gap-3"><MapPin className="h-5 w-5 text-[#A7C4B5]" /> Toluca, Edo. Méx.</li>
              <li className="flex items-center gap-3"><Phone className="h-5 w-5 text-[#A7C4B5]" /> +52 722 123 4567</li>
              <li className="flex items-center gap-3"><Mail className="h-5 w-5 text-[#A7C4B5]" /> hola@muebleclick.com</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}