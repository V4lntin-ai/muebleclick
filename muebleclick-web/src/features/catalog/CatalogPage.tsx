import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductCard } from '@/shared/components/ProductCard';
import { EmptyState } from '@/shared/components/EmptyState';
import { FadeIn, StaggerContainer, StaggerItem } from '@/shared/components/FadeIn';
import * as db from '@/shared/data/mockDb';

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'price_asc', label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
  { value: 'newest', label: 'Más recientes' },
];

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('cat');
  const initialMuebleria = searchParams.get('muebleria');
  const initialQuery = searchParams.get('q') || '';

  const [selectedCategories, setSelectedCategories] = useState(initialCat ? [initialCat] : []);
  const [selectedMuebleria, setSelectedMuebleria] = useState(initialMuebleria || '');
  const [priceRange, setPriceRange] = useState([0, 35000]);
  const [sortBy, setSortBy] = useState('relevance');
  const [query, setQuery] = useState(initialQuery);

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedMuebleria('');
    setPriceRange([0, 35000]);
    setQuery('');
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    let result = [...db.productos];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(p => p.nombre.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q));
    }
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.categoria));
    }
    if (selectedMuebleria) {
      result = result.filter(p => p.id_muebleria === parseInt(selectedMuebleria));
    }
    result = result.filter(p => p.precio_venta >= priceRange[0] && p.precio_venta <= priceRange[1]);

    switch (sortBy) {
      case 'price_asc': result.sort((a, b) => a.precio_venta - b.precio_venta); break;
      case 'price_desc': result.sort((a, b) => b.precio_venta - a.precio_venta); break;
      case 'newest': result.sort((a, b) => new Date(b.creado_en) - new Date(a.creado_en)); break;
      default: break;
    }
    return result;
  }, [query, selectedCategories, selectedMuebleria, priceRange, sortBy]);

  const hasFilters = selectedCategories.length > 0 || selectedMuebleria || priceRange[0] > 0 || priceRange[1] < 35000 || query;

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--fg)] opacity-60 mb-2 block">Buscar</label>
        <input
          type="text" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Nombre del producto..."
          className="w-full h-9 px-3 text-sm rounded-xl bg-[color:rgba(246,245,240,0.85)] border border-[color:var(--stroke)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)]"
          data-testid="catalog-search-input"
        />
      </div>

      {/* Categories */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--fg)] opacity-60 mb-3 block">Categorías</label>
        <div className="space-y-2">
          {db.categorias.map(cat => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
              <Checkbox
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => toggleCategory(cat)}
                className="border-[color:var(--stroke-strong)] data-[state=checked]:bg-[var(--clr-primary)] data-[state=checked]:border-[var(--clr-primary)]"
                data-testid={`filter-category-${cat}`}
              />
              <span className="text-sm text-[color:var(--fg)] opacity-70 group-hover:opacity-100">{cat}</span>
              <span className="text-xs text-[color:var(--fg)] opacity-40 ml-auto">
                {db.productos.filter(p => p.categoria === cat).length}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--fg)] opacity-60 mb-3 block">Rango de precio</label>
        <Slider
          min={0} max={35000} step={500}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex justify-between text-xs tabular-nums text-[color:var(--fg)] opacity-50">
          <span>{db.formatPrice(priceRange[0])}</span>
          <span>{db.formatPrice(priceRange[1])}</span>
        </div>
      </div>

      {/* Muebleria */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--fg)] opacity-60 mb-2 block">Mueblería</label>
        <Select value={selectedMuebleria} onValueChange={setSelectedMuebleria}>
          <SelectTrigger className="rounded-xl bg-[color:rgba(246,245,240,0.85)] border-[color:var(--stroke)]" data-testid="filter-muebleria-select">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {db.mueblerias.map(m => (
              <SelectItem key={m.id_muebleria} value={String(m.id_muebleria)}>{m.nombre_negocio}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="rounded-xl text-xs w-full text-red-500 hover:bg-red-50">
          <X className="w-3.5 h-3.5 mr-1" /> Limpiar filtros
        </Button>
      )}
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[color:var(--fg)] tracking-tight">Catálogo</h1>
            <p className="text-sm text-[color:var(--fg)] opacity-50 mt-1">{filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Mobile filter button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden rounded-xl border-[color:var(--stroke)]" data-testid="catalog-filter-sheet-open-button">
                  <SlidersHorizontal className="w-4 h-4 mr-1.5" /> Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="bg-[var(--bg)] max-h-[80vh] overflow-y-auto rounded-t-2xl">
                <div className="pt-2 pb-6">
                  <FilterPanel />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="rounded-xl w-[180px] bg-[color:rgba(246,245,240,0.85)] border-[color:var(--stroke)] text-sm" data-testid="catalog-sort-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </FadeIn>

      <div className="flex gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="neo-card p-5 sticky top-24">
            <h3 className="text-sm font-semibold text-[color:var(--fg)] mb-4">Filtros</h3>
            <FilterPanel />
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Active filters chips */}
          {hasFilters && (
            <FadeIn>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategories.map(cat => (
                  <button key={cat} onClick={() => toggleCategory(cat)} className="inline-flex items-center gap-1 rounded-full border border-[color:var(--stroke)] bg-[color:rgba(246,245,240,0.9)] px-3 py-1 text-xs">
                    {cat} <X className="w-3 h-3" />
                  </button>
                ))}
                {query && (
                  <button onClick={() => setQuery('')} className="inline-flex items-center gap-1 rounded-full border border-[color:var(--stroke)] bg-[color:rgba(246,245,240,0.9)] px-3 py-1 text-xs">
                    \"{query}\" <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </FadeIn>
          )}

          {filteredProducts.length > 0 ? (
            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
              {filteredProducts.map(p => (
                <StaggerItem key={p.id_producto}>
                  <ProductCard producto={p} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <EmptyState
              title="Sin resultados"
              description="No encontramos productos con los filtros seleccionados. Intenta ajustar tus criterios."
              actionLabel="Limpiar filtros"
              actionHref="/catalogo"
            />
          )}
        </div>
      </div>
    </div>
  );
}
