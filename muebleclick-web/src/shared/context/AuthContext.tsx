import { createContext, useContext, useState, useCallback } from 'react';
import * as db from '@/shared/data/mockDb';

const AuthContext = createContext(null);

const ROLE_CONFIGS = {
  visitante: { id_usuario: null, nombre: 'Visitante', correo: '', role_id: null, roleName: 'Visitante' },
  cliente: { ...db.usuarios[4], roleName: 'Cliente' },
  propietario: { ...db.usuarios[1], roleName: 'Propietario' },
  admin: { ...db.usuarios[0], roleName: 'Administrador' },
};

export function AuthProvider({ children }) {
  const [currentRole, setCurrentRole] = useState('visitante');
  const [user, setUser] = useState(ROLE_CONFIGS.visitante);

  const switchRole = useCallback((role) => {
    setCurrentRole(role);
    setUser(ROLE_CONFIGS[role] || ROLE_CONFIGS.visitante);
  }, []);

  const isAuthenticated = currentRole !== 'visitante';

  const getMuebleriaActual = useCallback(() => {
    if (currentRole === 'propietario') {
      return db.mueblerias.find(m => m.id_propietario === user.id_usuario);
    }
    return null;
  }, [currentRole, user]);

  const getClienteActual = useCallback(() => {
    if (currentRole === 'cliente') {
      return db.clientes.find(c => c.id_usuario === user.id_usuario);
    }
    return null;
  }, [currentRole, user]);

  return (
    <AuthContext.Provider value={{
      user,
      currentRole,
      switchRole,
      isAuthenticated,
      getMuebleriaActual,
      getClienteActual,
      roles: Object.keys(ROLE_CONFIGS),
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
