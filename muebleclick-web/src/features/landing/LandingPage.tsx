import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Headphones, CreditCard, Sofa, UtensilsCrossed, BedDouble, Monitor, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/shared/components/FadeIn';
import { ProductCard } from '@/shared/components/ProductCard';
import * as db from '@/shared/data/mockDb';

const HERO_IMG = 'https://images.unsplash.com/photo-1633505899118-4ca6bd143043?w=1200&h=600&fit=crop';

const CATEGORY_ICONS = {
  Salas: Sofa,
  Comedores: UtensilsCrossed,
  'Recámaras': BedDouble,
  Oficina: Monitor,
  Estantes: BookOpen,
};

const TRUST_ITEMS = [
  { icon: Truck, label: 'Envíos a todo México', desc: 'Cobertura nacional' },
  { icon: ShieldCheck, label: 'Garantía de calidad', desc: 'Productos verificados' },
  { icon: CreditCard, label: 'Pagos seguros', desc: 'Múltiples métodos' },
  { icon: Headphones, label: 'Soporte dedicado', desc: 'Atención personalizada' },
];

export default function LandingPage() {
  const featuredProducts = db.productos.slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative hero-gradient noise-overlay">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <FadeIn>
              <div>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-[color:var(--fg)] mb-5">
                  Encuentra el mueble <span className="text-[color:var(--clr-primary)]">perfecto</span> para tu hogar
                </h1>
                <p className="text-base sm:text-lg text-[color:var(--fg)] opacity-60 leading-relaxed mb-8 max-w-lg">
                  Explora las mejores mueblerías de México en un solo lugar. Calidad, diseño y confianza.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg" className="rounded-xl bg-[var(--clr-primary)] text-[color:var(--bg)] shadow-[0_14px_30px_rgba(46,94,78,0.22)] hover:shadow-[0_18px_40px_rgba(46,94,78,0.28)] btn-transition text-sm px-6 h-12" data-testid="hero-cta-catalog">
                    <Link to="/catalogo">
                      Explorar catálogo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-xl border-[color:var(--stroke-strong)] text-sm px-6 h-12 hover:bg-[color:rgba(163,177,138,0.15)] btn-transition">
                    <Link to="/catalogo?cat=Salas">Ver salas</Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="relative">
                <div className="neo-card overflow-hidden">
                  <img src={HERO_IMG} alt="Sala moderna" className="w-full h-64 sm:h-80 lg:h-96 object-cover" />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 glass-card p-3 sm:p-4">
                  <p className="text-xs font-medium text-[color:var(--fg)] opacity-60">Mueblerías activas</p>
                  <p className="text-2xl font-bold font-display text-[color:var(--clr-primary)]">{db.mueblerias.length}+</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Categories Bento Grid */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <FadeIn>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[color:var(--fg)] tracking-tight mb-2">Categorías</h2>
          <p className="text-sm text-[color:var(--fg)] opacity-50 mb-8">Encuentra lo que necesitas para cada espacio</p>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {db.categorias.map(cat => {
            const Icon = CATEGORY_ICONS[cat] || BookOpen;
            const count = db.productos.filter(p => p.categoria === cat).length;
            return (
              <StaggerItem key={cat}>
                <Link
                  to={`/catalogo?cat=${encodeURIComponent(cat)}`}
                  className="neo-card p-5 sm:p-6 text-center card-hover block group"
                  data-testid={`category-card-${cat}`}
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center bg-[color:rgba(46,94,78,0.10)] group-hover:bg-[color:rgba(46,94,78,0.18)]" style={{transitionProperty:'background-color',transitionDuration:'200ms'}}>
                    <Icon className="w-6 h-6 text-[color:var(--clr-primary)]" />
                  </div>
                  <h3 className="text-sm font-semibold text-[color:var(--fg)] mb-1">{cat}</h3>
                  <p className="text-xs text-[color:var(--fg)] opacity-40">{count} productos</p>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* Featured Products */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        <FadeIn>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[color:var(--fg)] tracking-tight mb-1">Productos destacados</h2>
              <p className="text-sm text-[color:var(--fg)] opacity-50">Lo más buscado por nuestros clientes</p>
            </div>
            <Button asChild variant="ghost" className="rounded-xl text-sm text-[color:var(--clr-primary)] hover:bg-[color:rgba(46,94,78,0.08)]">
              <Link to="/catalogo">Ver todo <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {featuredProducts.map(p => (
            <StaggerItem key={p.id_producto}>
              <ProductCard producto={p} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Featured Stores */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        <FadeIn>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[color:var(--fg)] tracking-tight mb-2">Mueblerías destacadas</h2>
          <p className="text-sm text-[color:var(--fg)] opacity-50 mb-8">Conoce a nuestros vendedores verificados</p>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {db.mueblerias.map(muebleria => {
            const propietario = db.getUsuarioById(muebleria.id_propietario);
            const productCount = db.getProductosByMuebleria(muebleria.id_muebleria).length;
            const sucursalCount = db.getSucursalesByMuebleria(muebleria.id_muebleria).length;
            return (
              <StaggerItem key={muebleria.id_muebleria}>
                <div className="glass-card p-5 sm:p-6 card-hover">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold font-display text-white shrink-0" style={{ background: 'var(--clr-primary)' }}>
                      {muebleria.nombre_negocio.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-[color:var(--fg)] truncate">{muebleria.nombre_negocio}</h3>
                      <p className="text-xs text-[color:var(--fg)] opacity-50 mb-2">{propietario?.nombre}</p>
                      <div className="flex items-center gap-4 text-xs text-[color:var(--fg)] opacity-60">
                        <span>{productCount} productos</span>
                        <span>{sucursalCount} sucursales</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button asChild variant="ghost" size="sm" className="rounded-xl text-xs w-full text-[color:var(--clr-primary)] hover:bg-[color:rgba(46,94,78,0.08)]">
                      <Link to={`/catalogo?muebleria=${muebleria.id_muebleria}`}>Ver productos</Link>
                    </Button>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* Trust Badges */}
      <section className="border-t border-[color:var(--stroke)]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_ITEMS.map(item => (
              <StaggerItem key={item.label}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[color:rgba(212,163,115,0.15)] shrink-0">
                    <item.icon className="w-5 h-5 text-[color:var(--clr-accent)]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[color:var(--fg)]">{item.label}</h4>
                    <p className="text-xs text-[color:var(--fg)] opacity-50">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
