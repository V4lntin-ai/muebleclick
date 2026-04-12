import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, CreditCard, CheckCircle2, ArrowLeft, ArrowRight, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCart } from '@/shared/context/CartContext';
import { useAuth } from '@/shared/context/AuthContext';
import { FadeIn } from '@/shared/components/FadeIn';
import { EmptyState } from '@/shared/components/EmptyState';
import * as db from '@/shared/data/mockDb';
import { toast } from 'sonner';

const STEPS = [
  { id: 'direccion', label: 'Dirección', icon: MapPin },
  { id: 'pago', label: 'Pago', icon: CreditCard },
  { id: 'confirmacion', label: 'Confirmación', icon: CheckCircle2 },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartDetails, subtotal, discount, total, appliedCoupon, clearCart, itemCount } = useCart();
  const { currentRole, getClienteActual } = useAuth();
  const cliente = getClienteActual();
  const direcciones = cliente ? db.getDireccionesByCliente(cliente.id_usuario) : [];

  const [step, setStep] = useState(0);
  const [selectedDireccion, setSelectedDireccion] = useState(direcciones[0]?.id_direccion?.toString() || '');
  const [tipoEntrega, setTipoEntrega] = useState('domicilio');
  const [metodoPago, setMetodoPago] = useState('tarjeta_credito');
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (cartDetails.length === 0 && !orderPlaced) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <EmptyState title="Carrito vacío" description="Agrega productos antes de hacer checkout." actionLabel="Ir al catálogo" actionHref="/catalogo" />
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setStep(2);
    clearCart();
    toast.success('Pedido simulado creado exitosamente');
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Stepper */}
      <FadeIn>
        <div className="flex items-center justify-center mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${
                i <= step
                  ? 'text-[color:var(--clr-primary)] font-semibold'
                  : 'text-[color:var(--fg)] opacity-40'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  i < step ? 'bg-[var(--clr-primary)] text-white'
                  : i === step ? 'bg-[color:rgba(46,94,78,0.15)] text-[color:var(--clr-primary)]'
                  : 'bg-gray-100 text-gray-400'
                }`}>
                  {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className="w-8 sm:w-16 h-px bg-[color:var(--stroke)]" />}
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Step 0: Dirección */}
      {step === 0 && (
        <FadeIn>
          <div className="neo-card p-6">
            <h2 className="font-display text-xl font-bold text-[color:var(--fg)] mb-5">Dirección de envío</h2>

            {/* Tipo entrega */}
            <div className="mb-6">
              <label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--fg)] opacity-60 mb-3 block">Tipo de entrega</label>
              <RadioGroup value={tipoEntrega} onValueChange={setTipoEntrega} className="flex gap-4">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="domicilio" id="domicilio" className="border-[color:var(--stroke-strong)] text-[color:var(--clr-primary)]" />
                  <Label htmlFor="domicilio" className="text-sm flex items-center gap-1.5"><Truck className="w-4 h-4" /> A domicilio</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="sucursal" id="sucursal" className="border-[color:var(--stroke-strong)] text-[color:var(--clr-primary)]" />
                  <Label htmlFor="sucursal" className="text-sm flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Recoger en sucursal</Label>
                </div>
              </RadioGroup>
            </div>

            {tipoEntrega === 'domicilio' && (
              <div>
                {currentRole === 'cliente' && direcciones.length > 0 ? (
                  <RadioGroup value={selectedDireccion} onValueChange={setSelectedDireccion} className="space-y-3">
                    {direcciones.map(dir => (
                      <div key={dir.id_direccion} className={`neo-card-sm p-4 cursor-pointer ${
                        selectedDireccion === String(dir.id_direccion) ? 'border-[color:var(--clr-primary)] border-2' : ''
                      }`}>
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value={String(dir.id_direccion)} id={`dir-${dir.id_direccion}`} className="mt-0.5 border-[color:var(--stroke-strong)] text-[color:var(--clr-primary)]" />
                          <Label htmlFor={`dir-${dir.id_direccion}`} className="text-sm cursor-pointer">
                            <p className="font-medium">{dir.calle_numero}</p>
                            <p className="text-xs opacity-50 mt-0.5">{db.getUbicacionCompleta(dir.id_municipio)}</p>
                            <p className="text-xs opacity-40 mt-0.5">{dir.referencias}</p>
                          </Label>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="neo-card-sm p-4">
                    <p className="text-sm opacity-60">Cambia al rol <strong>Cliente</strong> para ver direcciones guardadas, o ingresa una nueva:</p>
                    <div className="mt-3 space-y-2">
                      <input type="text" placeholder="Calle y número" className="w-full h-9 px-3 text-sm rounded-xl bg-[color:rgba(246,245,240,0.85)] border border-[color:var(--stroke)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)]" />
                      <input type="text" placeholder="Municipio, Estado" className="w-full h-9 px-3 text-sm rounded-xl bg-[color:rgba(246,245,240,0.85)] border border-[color:var(--stroke)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)]" />
                      <input type="text" placeholder="Referencias" className="w-full h-9 px-3 text-sm rounded-xl bg-[color:rgba(246,245,240,0.85)] border border-[color:var(--stroke)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)]" />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between mt-6">
              <Button asChild variant="ghost" className="rounded-xl text-sm">
                <Link to="/carrito"><ArrowLeft className="w-4 h-4 mr-1" /> Volver</Link>
              </Button>
              <Button onClick={() => setStep(1)} className="rounded-xl bg-[var(--clr-primary)] text-[color:var(--bg)] btn-transition text-sm">
                Continuar <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </FadeIn>
      )}

      {/* Step 1: Pago */}
      {step === 1 && (
        <FadeIn>
          <div className="neo-card p-6">
            <h2 className="font-display text-xl font-bold text-[color:var(--fg)] mb-5">Método de pago</h2>
            <RadioGroup value={metodoPago} onValueChange={setMetodoPago} className="space-y-3">
              {[
                { value: 'tarjeta_credito', label: 'Tarjeta de Crédito', desc: 'Visa, Mastercard, AMEX' },
                { value: 'tarjeta_debito', label: 'Tarjeta de Débito', desc: 'Todas las tarjetas' },
                { value: 'transferencia', label: 'Transferencia Bancaria', desc: 'SPEI / CLABE' },
                { value: 'contra_entrega', label: 'Contra Entrega', desc: 'Pago al recibir (solo domicilio)' },
              ].map(m => (
                <div key={m.value} className={`neo-card-sm p-4 cursor-pointer ${
                  metodoPago === m.value ? 'border-[color:var(--clr-primary)] border-2' : ''
                }`}>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={m.value} id={m.value} className="border-[color:var(--stroke-strong)] text-[color:var(--clr-primary)]" />
                    <Label htmlFor={m.value} className="text-sm cursor-pointer flex-1">
                      <p className="font-medium">{m.label}</p>
                      <p className="text-xs opacity-50">{m.desc}</p>
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>

            {/* Order Summary */}
            <div className="mt-6 p-4 rounded-xl bg-[color:rgba(46,94,78,0.05)]">
              <h3 className="text-sm font-semibold mb-3">Resumen del pedido</h3>
              {cartDetails.map(item => (
                <div key={item.id_producto} className="flex justify-between text-sm py-1">
                  <span className="opacity-70">{item.producto.nombre} x{item.cantidad}</span>
                  <span className="tabular-nums font-medium">{db.formatPrice(item.producto.precio_venta * item.cantidad)}</span>
                </div>
              ))}
              <div className="border-t border-[color:var(--stroke)] mt-2 pt-2 space-y-1">
                <div className="flex justify-between text-sm"><span className="opacity-60">Subtotal</span><span className="tabular-nums">{db.formatPrice(subtotal)}</span></div>
                {discount > 0 && <div className="flex justify-between text-sm text-[color:var(--clr-primary)]"><span>Descuento ({appliedCoupon?.codigo})</span><span className="tabular-nums">-{db.formatPrice(discount)}</span></div>}
                <div className="flex justify-between text-sm"><span className="opacity-60">Envío estimado</span><span className="tabular-nums">{db.formatPrice(950)}</span></div>
                <div className="flex justify-between text-base font-bold pt-1 border-t border-[color:var(--stroke)]">
                  <span>Total</span><span className="tabular-nums text-[color:var(--clr-primary)]">{db.formatPrice(total + 950)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button onClick={() => setStep(0)} variant="ghost" className="rounded-xl text-sm">
                <ArrowLeft className="w-4 h-4 mr-1" /> Atrás
              </Button>
              <Button onClick={handlePlaceOrder} className="rounded-xl bg-[var(--clr-primary)] text-[color:var(--bg)] shadow-[0_14px_30px_rgba(46,94,78,0.22)] btn-transition text-sm" data-testid="checkout-submit-order-button">
                Confirmar pedido
              </Button>
            </div>
          </div>
        </FadeIn>
      )}

      {/* Step 2: Confirmación */}
      {step === 2 && (
        <FadeIn>
          <div className="neo-card p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-[color:rgba(46,94,78,0.12)]">
              <CheckCircle2 className="w-8 h-8 text-[color:var(--clr-primary)]" />
            </div>
            <h2 className="font-display text-2xl font-bold text-[color:var(--fg)] mb-2">Pedido creado</h2>
            <p className="text-sm text-[color:var(--fg)] opacity-60 mb-1">Tu pedido simulado ha sido procesado exitosamente.</p>
            <p className="text-xs text-[color:var(--fg)] opacity-40 mb-6">Número de pedido: #PED-2024-{String(Math.floor(Math.random()*9999)).padStart(4,'0')}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="rounded-xl bg-[var(--clr-primary)] text-[color:var(--bg)] btn-transition text-sm">
                <Link to="/catalogo">Seguir comprando</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl border-[color:var(--stroke-strong)] text-sm">
                <Link to={currentRole === 'cliente' ? '/cliente/pedidos' : '/'}>Ver mis pedidos</Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
