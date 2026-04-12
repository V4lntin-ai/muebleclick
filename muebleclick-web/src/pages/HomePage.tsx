import { ArrowRight, Truck, Shield, CreditCard, Star, Sofa, UtensilsCrossed, Bed, Monitor } from 'lucide-react';

const categorias = [
  { id: 'salas', nombre: 'Salas', desc: 'Sofás y sillones', icon: Sofa },
  { id: 'comedores', nombre: 'Comedores', desc: 'Mesas y sillas', icon: UtensilsCrossed },
  { id: 'recamaras', nombre: 'Recámaras', desc: 'Camas y burós', icon: Bed },
  { id: 'oficina', nombre: 'Oficina', desc: 'Escritorios', icon: Monitor },
];

const featuredProducts = [
  { id: 1, nombre: 'Sofá Seccional Moderno', precio: 12500, rating: 4.8, tienda: 'Casa Moderna', imagen: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80' },
  { id: 2, nombre: 'Mesa de Comedor Roble', precio: 8900, rating: 4.9, tienda: 'Muebles El Roble', imagen: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=500&q=80' },
  { id: 3, nombre: 'Cama King Size', precio: 15000, rating: 5.0, tienda: 'Comfort Living', imagen: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80' },
  { id: 4, nombre: 'Sillón Individual', precio: 4200, rating: 4.7, tienda: 'Muebles El Roble', imagen: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&q=80' },
];

export function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1716078410207-20e223587181?w=1920" alt="Living room" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2A3631]/95 via-[#2A3631]/70 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium text-white mb-6 border border-white/30">
              Nuevo en MuebleClick
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              Muebles únicos para
              <span className="text-[#A7C4B5]"> espacios</span> extraordinarios
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed">
              Descubre las mejores mueblerías y encuentra piezas que transformarán tu hogar con calidad, diseño y confort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-[#A7C4B5] text-[#2A3631] rounded-full text-base font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors">
                Explorar Catálogo <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="py-16 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Truck, title: 'Envío a Todo México', desc: 'Entrega directa a tu hogar' },
              { icon: Shield, title: 'Compra Segura', desc: 'Transacciones protegidas' },
              { icon: CreditCard, title: 'Pago Flexible', desc: 'Múltiples opciones de pago' },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 flex items-start gap-4 shadow-sm border border-[#2A3631]/5 hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="bg-[#F2EFE9] p-3 rounded-xl">
                  <feature.icon className="h-6 w-6 text-[#A7C4B5]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#2A3631] mb-1">{feature.title}</h3>
                  <p className="text-sm text-[#5C7065]">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2A3631] tracking-tight mb-8">Explora por Categoría</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categorias.map((cat) => (
              <a key={cat.id} href="#" className="bg-white rounded-2xl p-8 text-center group shadow-sm border border-[#2A3631]/5 hover:shadow-xl hover:border-[#A7C4B5]/50 transition-all cursor-pointer">
                <div className="w-16 h-16 bg-[#F2EFE9] rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#A7C4B5]/20 transition-all">
                  <cat.icon className="h-8 w-8 text-[#A7C4B5]" />
                </div>
                <h3 className="text-lg font-bold text-[#2A3631] mb-1">{cat.nombre}</h3>
                <p className="text-sm text-[#5C7065]">{cat.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="py-20 bg-[#E8D8CE]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2A3631] tracking-tight mb-8">Productos Destacados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <a key={product.id} href="#" className="bg-white rounded-2xl overflow-hidden group shadow-sm border border-[#2A3631]/5 hover:shadow-xl transition-all">
                <div className="aspect-[4/5] bg-gray-100 overflow-hidden relative">
                  <img src={product.imagen} alt={product.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold text-[#A7C4B5] mb-1">{product.tienda}</p>
                  <h3 className="font-bold text-[#2A3631] truncate mb-3">{product.nombre}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-[#2A3631]">${product.precio.toLocaleString('es-MX')}</p>
                    <div className="flex items-center gap-1 bg-[#F2EFE9] px-2 py-1 rounded-md">
                      <Star className="h-3 w-3 fill-[#A7C4B5] text-[#A7C4B5]" />
                      <span className="text-xs font-bold text-[#5C7065]">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#2A3631]" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#A7C4B5] rounded-full blur-[100px] opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E8D8CE] rounded-full blur-[100px] opacity-20" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">¿Tienes una mueblería?</h2>
          <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
            Únete a MuebleClick y alcanza miles de clientes. Gestiona inventario, pedidos, sucursales y más.
          </p>
          <button className="px-10 py-4 bg-[#A7C4B5] text-[#2A3631] rounded-full text-lg font-bold flex items-center gap-2 mx-auto hover:bg-white hover:scale-105 transition-all shadow-xl shadow-[#A7C4B5]/20">
            Comenzar Ahora <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </>
  );
}