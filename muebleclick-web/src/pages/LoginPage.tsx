import { Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full bg-white">
      
      {/* LADO DEL FORMULARIO (Izquierda) */}
      <div className="w-full lg:w-1/2 px-8 sm:px-12 lg:px-16 xl:px-24 py-8 lg:py-12 flex flex-col justify-start overflow-y-auto">
        
        <div className="max-w-xl w-full mx-auto mt-4 lg:mt-8">
          
          {/* Botón superior (Volver) */}
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-[#5C7065] hover:text-[#2A3631] transition-colors font-semibold text-sm">
              <ArrowLeft className="w-4 h-4" /> Volver al inicio
            </Link>
          </div>

          {/* Encabezado */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-black text-[#2A3631] tracking-tight mb-3">
              Bienvenido de nuevo
            </h1>
            <p className="text-[#5C7065] text-base sm:text-lg">
              Ingresa tus credenciales para acceder a tu cuenta y continuar donde te quedaste.
            </p>
          </div>

          <form className="flex flex-col space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div>
              <label className="block text-sm font-bold text-[#2A3631] mb-2">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5C7065]" />
                <input 
                  type="email" 
                  placeholder="hola@ejemplo.com" 
                  className="w-full pl-12 pr-4 py-3.5 bg-[#F2EFE9]/50 border border-[#2A3631]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A7C4B5] transition-all text-[#2A3631]" 
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-[#2A3631]">Contraseña</label>
                <a href="#" className="text-sm text-[#A7C4B5] hover:text-[#2A3631] font-bold transition-colors">¿Olvidaste tu contraseña?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5C7065]" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-3.5 bg-[#F2EFE9]/50 border border-[#2A3631]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A7C4B5] transition-all text-[#2A3631]" 
                />
              </div>
            </div>

            <div className="pt-6">
              <button type="button" className="w-full py-4 bg-[#2A3631] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#1f2824] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#2A3631]/20">
                Entrar a mi cuenta <ArrowRight className="h-5 w-5" />
              </button>
            </div>

          </form>

          <div className="mt-10 text-center text-[#5C7065] font-medium">
            ¿No tienes una cuenta?{' '}
            <Link to="/registro" className="text-[#A7C4B5] font-bold hover:text-[#2A3631] transition-colors underline decoration-2 underline-offset-4">
              Regístrate aquí
            </Link>
          </div>

        </div>
      </div>

      {/* LADO DE LA IMAGEN (Derecha - Full Height) */}
      <div className="hidden lg:block w-1/2 relative bg-[#2A3631] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80" 
          alt="Interior elegante" 
          className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A3631] via-[#2A3631]/40 to-transparent flex flex-col justify-end p-16 xl:p-24 text-right pointer-events-none">
          <h2 className="text-4xl xl:text-5xl font-black text-white mb-6 drop-shadow-lg">
            Tu espacio ideal
          </h2>
          <p className="text-white/90 text-lg leading-relaxed ml-auto max-w-md drop-shadow-md">
            Gestiona tus compras, guarda tus muebles favoritos y descubre nuevas piezas increíbles para transformar tu hogar con MuebleClick.
          </p>
        </div>
      </div>
      
    </div>
  );
}