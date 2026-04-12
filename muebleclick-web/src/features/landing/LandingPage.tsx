import { ArrowRight, Truck, ShieldCheck, CreditCard } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* NAVEGACIÓN */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <span className="text-2xl font-black tracking-tighter text-blue-600">
                MuebleClick
              </span>
              <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
                <a href="#catalogo" className="hover:text-blue-600 transition-colors">Catálogo</a>
                <a href="#mueblerias" className="hover:text-blue-600 transition-colors">Mueblerías</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                Inicia Sesión
              </button>
              <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-transform hover:scale-105 hover:bg-slate-800 active:scale-95">
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-bold tracking-wide">
            Nuevo en MuebleClick
          </span>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
            Muebles únicos para espacios <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">extraordinarios</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
            Descubre las mejores mueblerías y encuentra piezas que transformarán tu hogar con calidad, diseño y confort.
          </p>
          <div className="pt-4">
            <button className="group bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg shadow-blue-600/30 transition-all hover:scale-105 hover:bg-blue-700 active:scale-95 flex items-center gap-2 mx-auto lg:mx-0">
              Explorar Catálogo 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
          {/* Imagen de prueba (Placeholder) */}
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
            <img 
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1000" 
              alt="Sala moderna" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* FEATURES / BENEFICIOS */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center p-6 rounded-2xl transition-colors hover:bg-slate-50">
            <div className="bg-blue-100 p-4 rounded-full text-blue-600 mb-4">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Envío a Todo México</h3>
            <p className="text-slate-600">Entrega directa a tu hogar de forma segura.</p>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl transition-colors hover:bg-slate-50">
            <div className="bg-green-100 p-4 rounded-full text-green-600 mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Compra Segura</h3>
            <p className="text-slate-600">Transacciones protegidas y garantizadas.</p>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl transition-colors hover:bg-slate-50">
            <div className="bg-purple-100 p-4 rounded-full text-purple-600 mb-4">
              <CreditCard className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Pago Flexible</h3>
            <p className="text-slate-600">Múltiples opciones de pago para tu comodidad.</p>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explora por Categoría</h2>
          <p className="text-slate-600">Encuentra exactamente lo que buscas en nuestra amplia selección</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tarjeta con Animación */}
          {['Salas', 'Comedores', 'Recámaras', 'Oficina'].map((categoria) => (
            <div key={categoria} className="group relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200">
              <div className="aspect-square bg-slate-100 rounded-xl mb-4 overflow-hidden">
                {/* Aquí irán tus imágenes reales después */}
                <div className="w-full h-full bg-slate-200 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{categoria}</h3>
              <p className="text-sm text-slate-500 mt-1">Explorar muebles →</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Productos Destacados</h2>
              <p className="text-slate-400">Lo más nuevo y popular de nuestras mueblerías</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold">
              Ver todos <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tarjeta de Producto Animada */}
            {[
              { n: 'Sofá Seccional Moderno', p: '$12,500', m: 'Casa Moderna' },
              { n: 'Sillón Individual Nórdico', p: '$4,200', m: 'Muebles El Roble' },
              { n: 'Mesa de Comedor Rústica', p: '$8,900', m: 'Muebles El Roble' },
              { n: 'Cama King Size', p: '$15,000', m: 'Comfort Living' }
            ].map((prod, i) => (
              <div key={i} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/50 cursor-pointer">
                <div className="aspect-square bg-slate-700" />
                <div className="p-5">
                  <p className="text-xs text-slate-400 mb-1 font-medium">{prod.m}</p>
                  <h3 className="font-bold text-lg mb-3 truncate">{prod.n}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-400 font-bold">{prod.p}</span>
                    <button className="bg-slate-700 hover:bg-blue-600 text-white p-2 rounded-full transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN MUEBLERÍAS (CTA Final) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-blue-600 rounded-[3rem] p-12 lg:p-20 text-white shadow-2xl relative overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <h2 className="text-4xl lg:text-5xl font-black mb-6 relative z-10">¿Tienes una mueblería?</h2>
          <p className="text-blue-100 text-lg lg:text-xl max-w-2xl mx-auto mb-10 relative z-10">
            Únete a MuebleClick y alcanza miles de clientes. Gestiona inventario, pedidos, sucursales y mucho más desde un panel profesional.
          </p>
          <button className="relative z-10 bg-white text-blue-900 px-10 py-4 rounded-full text-lg font-bold shadow-xl transition-transform hover:scale-105 active:scale-95 hover:bg-slate-50">
            Comenzar Ahora →
          </button>
        </div>
      </section>

      {/* FOOTER BÁSICO */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="text-2xl font-black text-blue-600">MuebleClick</span>
            <p className="text-slate-500 text-sm mt-4">Conectamos mueblerías con clientes que buscan piezas únicas.</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Explorar</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Catálogo</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Mueblerías</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Ofertas</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Para Mueblerías</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Registrar mi tienda</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Panel de vendedor</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Planes y Precios</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}