import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, CartItem, Producto } from '../types';


interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      setLoading: (isLoading) => set({ isLoading }),
      login: (user, token) => set({ user, token, isAuthenticated: true, isLoading: false }),
      logout: () => set({ user: null, token: null, isAuthenticated: false, isLoading: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);


interface CartState {
  items: CartItem[];
  addItem: (producto: Producto, cantidad?: number) => void;
  removeItem: (productoId: string | number) => void;
  updateQuantity: (productoId: string | number, cantidad: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (producto, cantidad = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.producto.idProducto === producto.idProducto
          );
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.producto.idProducto === producto.idProducto
                  ? { ...item, cantidad: item.cantidad + cantidad }
                  : item
              ),
            };
          }
          
          return { items: [...state.items, { producto, cantidad }] };
        });
      },
      removeItem: (productoId) => {
        set((state) => ({
          items: state.items.filter((item) => item.producto.idProducto !== productoId),
        }));
      },
      updateQuantity: (productoId, cantidad) => {
        if (cantidad <= 0) {
          get().removeItem(productoId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.producto.idProducto === productoId
              ? { ...item, cantidad }
              : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.producto.precioVenta * item.cantidad,
          0
        );
      },
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.cantidad, 0);
      },
    }),
    {
      // Cambiamos el nombre para purgar la memoria corrupta
      name: 'cart-storage-v2',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);


interface UIState {
  selectedCategoria: string | null;
  searchQuery: string;
  setSelectedCategoria: (categoria: string | null) => void;
  setSearchQuery: (query: string) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  selectedCategoria: null,
  searchQuery: '',
  setSelectedCategoria: (selectedCategoria) => set({ selectedCategoria }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));