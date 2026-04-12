import { useState } from 'react';
import { Store, Mail, Lock, User, ArrowRight, ArrowLeft, FileText, Building, MapPin, Phone, Briefcase, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

type Role = 'cliente' | 'propietario' | null;

export function RegisterPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>(null);

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setStep(1);
  };

  const handleNext = () => {
    if (role === 'propietario' && step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step === 1) {
      setRole(null); // Si estamos en el primer paso del form, regresamos a elegir rol
    } else {
      setStep((prev) => Math.max(prev - 1, 1)); // Si no, retrocedemos un paso en el wizard
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full bg-white">
      
      {/* LADO DEL FORMULARIO (Izquierda) */}
      <div className="w-full lg:w-1/2 px-8 sm:px-12 lg:px-16 xl:px-24 py-8 lg:py-12 flex flex-col justify-start overflow-y-auto">
        
        <div className="max-w-xl w-full mx-auto mt-4 lg:mt-8">
          
          {/* Botón superior dinámico (Volver) */}
          <div className="mb-6">
            {!role ? (
              <Link to="/" className="inline-flex items-center gap-2 text-[#5C7065] hover:text-[#2A3631] transition-colors font-semibold text-sm">
                <ArrowLeft className="w-4 h-4" /> Volver al inicio
              </Link>
            ) : (
              <button onClick={handlePrev} className="inline-flex items-center gap-2 text-[#5C7065] hover:text-[#2A3631] transition-colors font-semibold text-sm">
                <ArrowLeft className="w-4 h-4" /> Volver atrás
              </button>
            )}
          </div>

          {/* Encabezado Dinámico */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-black text-[#2A3631] tracking-tight mb-3 transition-all duration-300">
              {!role && 'Únete a MuebleClick'}
              {role && step === 1 && 'Crear Cuenta'}
              {role && step === 2 && 'Información Fiscal'}
              {role && step === 3 && 'Datos de tu Mueblería'}
            </h1>
            <p className="text-[#5C7065] text-base sm:text-lg transition-all duration-300">
              {!role && 'Selecciona tu perfil para comenzar.'}
              {role && step === 1 && 'Ingresa tus datos personales para continuar.'}
              {role && step === 2 && 'Necesitamos estos datos para tu facturación automática.'}
              {role && step === 3 && 'Casi listos para abrir las puertas de tu tienda.'}
            </p>
          </div>

          {/* Barra de Progreso (Solo Propietarios, Pasos 2 y 3) */}
          {role === 'propietario' && (
            <div className="mb-8 animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-[#A7C4B5] uppercase tracking-wider">Paso {step} de 3</span>
                <span className="text-xs font-bold text-[#5C7065]">
                  {step === 1 && 'Datos Personales'}
                  {step === 2 && 'Datos Fiscales'}
                  {step === 3 && 'Datos del Negocio'}
                </span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`h-2 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-[#A7C4B5]' : 'bg-[#F2EFE9]'}`} />
                ))}
              </div>
            </div>
          )}

          {/* VISTA 1: Selección de Rol (Se oculta al seleccionar) */}
          {!role && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button
                type="button"
                onClick={() => handleRoleSelect('cliente')}
                className="p-6 rounded-2xl border-2 border-[#F2EFE9] text-left transition-all duration-300 hover:border-[#A7C4B5]/50 hover:bg-[#A7C4B5]/5 hover:shadow-md hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors bg-[#F2EFE9] text-[#5C7065]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#2A3631] mb-2">Soy Cliente</h3>
                <p className="text-sm text-[#5C7065] leading-relaxed">Quiero explorar y comprar muebles únicos para mi hogar u oficina.</p>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('propietario')}
                className="p-6 rounded-2xl border-2 border-[#F2EFE9] text-left transition-all duration-300 hover:border-[#A7C4B5]/50 hover:bg-[#A7C4B5]/5 hover:shadow-md hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors bg-[#F2EFE9] text-[#5C7065]">
                  <Store className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#2A3631] mb-2">Soy Propietario</h3>
                <p className="text-sm text-[#5C7065] leading-relaxed">Tengo una mueblería y quiero registrarme para vender mis productos.</p>
              </button>
            </div>
          )}

          {/* VISTA 2: Formularios (Se despliega al seleccionar rol) */}
          {role && (
            <form className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col">
              
              {/* PASO 1: Datos Personales (Ambos roles) */}
              {step === 1 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-[#2A3631] mb-2">Nombre</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5C7065]" />
                        <input type="text" placeholder="Ej. Juan" className="w-full pl-12 pr-4 py-3.5 bg-[#F2EFE9]/50 border border-[#2A3631]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A7C4B5] transition-all text-[#2A3631]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#2A3631] mb-2">Apellidos</label>
                      <input type="text" placeholder="Ej. Pérez" className="w-full px-4 py-3.5 bg-[#F2EFE9]/50 border border-[#2A3631]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A7C4B5] transition-all text-[#2A3631]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#2A3631] mb-2">Correo Electrónico</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5C7065]" />
                      <input type="email" placeholder="hola@ejemplo.com" className="w-full pl-12 pr-4 py-3.5 bg-[#F2EFE9]/50 border border-[#2A3631]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A7C4B5] transition-all text-[#2A3631]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#2A3631] mb-2">Contraseña</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5C7065]" />
                      <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-3.5 bg-[#F2EFE9]/50 border border-[#2A3631]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A7C4B5] transition-all text-[#2A3631]" />
                    </div>
                  </div>
                </div>
              )}

              {/* PASO 2: Datos Fiscales (Solo Propietario) */}
              {step === 2 && role === 'propietario' && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div>
                    <label className="block text-sm font-bold text-[#2A3631] mb-2">RFC con Homoclave</label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5C7065]" />
                      <input type="text" placeholder="ABCD123456XYZ" className="w-full pl-12 pr-4 py-3.5 bg-[#F2EFE9]/50 border border-[#2A3631]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A7C4B5] transition-all text-[#2A3631] uppercase" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#2A3631] mb-2">Razón Social</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5C7065]" />
                      <input type="text" placeholder="Muebles S.A. de C.V." className="w-full pl-12 pr-4 py-3.5 bg-[#F2EFE9]/50 border border-[#2A3631]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A7C4B5] transition-all text-[#2A3631]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#2A3631] mb-2">Código Postal Fiscal</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5C7065]" />
                      <input type="text" placeholder="50000" className="w-full pl-12 pr-4 py-3.5 bg-[#F2EFE9]/50 border border-[#2A3631]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A7C4B5] transition-all text-[#2A3631]" />
                    </div>
                  </div>
                </div>
              )}

              {/* PASO 3: Datos del Negocio (Solo Propietario) */}
              {step === 3 && role === 'propietario' && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div>
                    <label className="block text-sm font-bold text-[#2A3631] mb-2">Nombre Comercial de la Tienda</label>
                    <div className="relative">
                      <Store className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5C7065]" />
                      <input type="text" placeholder="Mi Mueblería" className="w-full pl-12 pr-4 py-3.5 bg-[#F2EFE9]/50 border border-[#2A3631]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A7C4B5] transition-all text-[#2A3631]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#2A3631] mb-2">Teléfono de Contacto</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5C7065]" />
                      <input type="tel" placeholder="(722) 123 4567" className="w-full pl-12 pr-4 py-3.5 bg-[#F2EFE9]/50 border border-[#2A3631]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A7C4B5] transition-all text-[#2A3631]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#2A3631] mb-2">Categoría Principal</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5C7065]" />
                      <select className="w-full pl-12 pr-4 py-3.5 bg-[#F2EFE9]/50 border border-[#2A3631]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A7C4B5] transition-all text-[#2A3631] appearance-none">
                        <option value="">Selecciona una opción</option>
                        <option value="salas">Salas y Sillones</option>
                        <option value="comedores">Comedores</option>
                        <option value="recamaras">Recámaras</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* BOTÓN INFERIOR DE ACCIÓN */}
              <div className="pt-8 mt-auto">
                {role === 'cliente' || (role === 'propietario' && step === 3) ? (
                  <button type="button" className="w-full py-4 bg-[#2A3631] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#1f2824] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#2A3631]/20">
                    Finalizar Registro <User className="h-5 w-5" />
                  </button>
                ) : (
                  <button type="button" onClick={handleNext} className="w-full py-4 bg-[#A7C4B5] text-[#2A3631] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#8eb0a0] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#A7C4B5]/20">
                    Siguiente Paso <ArrowRight className="h-5 w-5" />
                  </button>
                )}
              </div>

            </form>
          )}

          <div className="mt-8 text-center text-[#5C7065] font-medium">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-[#A7C4B5] font-bold hover:text-[#2A3631] transition-colors underline decoration-2 underline-offset-4">
              Inicia Sesión aquí
            </Link>
          </div>

        </div>
      </div>

      {/* LADO DE LA IMAGEN (Derecha - Full Height) */}
      <div className="hidden lg:block w-1/2 relative bg-[#2A3631] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80" 
          alt="Inicio" 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${!role ? 'opacity-100' : 'opacity-0'}`}
        />
        <img 
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80" 
          alt="Paso 1" 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${(role === 'cliente' || (role === 'propietario' && step === 1)) ? 'opacity-100' : 'opacity-0'}`}
        />
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80" 
          alt="Paso 2" 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${role === 'propietario' && step === 2 ? 'opacity-100' : 'opacity-0'}`}
        />
        <img 
          src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=1200&q=80" 
          alt="Paso 3" 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${role === 'propietario' && step === 3 ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Gradiente y Textos */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A3631] via-[#2A3631]/40 to-transparent flex flex-col justify-end p-16 xl:p-24 text-right">
          <h2 className="text-4xl xl:text-5xl font-black text-white mb-6 drop-shadow-lg transition-all duration-500 translate-y-0">
            {!role && 'Bienvenido a MuebleClick'}
            {role === 'cliente' && 'Miles de opciones'}
            {role === 'propietario' && step === 1 && 'Gestiona tus ventas'}
            {role === 'propietario' && step === 2 && 'Vende de forma segura'}
            {role === 'propietario' && step === 3 && 'Alcanza nuevos clientes'}
          </h2>
          <p className="text-white/90 text-lg leading-relaxed ml-auto max-w-md drop-shadow-md transition-all duration-500">
            {!role && 'El marketplace que conecta las mejores mueblerías locales con espacios extraordinarios.'}
            {role === 'cliente' && 'Únete a nuestra comunidad y descubre piezas únicas con envío directo a tu hogar.'}
            {role === 'propietario' && step === 1 && 'Únete a MuebleClick y conecta tus productos con miles de compradores todos los días.'}
            {role === 'propietario' && step === 2 && 'Automatizamos los pagos y la facturación para que te enfoques exclusivamente en vender.'}
            {role === 'propietario' && step === 3 && 'Tu catálogo digital estará disponible 24/7 para un mercado que busca diseño y calidad.'}
          </p>
        </div>
      </div>
      
    </div>
  );
}