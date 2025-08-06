// src/stores/authStore.ts
import { create } from 'zustand';

// Tipos básicos para evitar erros de import
interface User {
  id: string;
  email: string;
  displayName: string;
  organizationId: string;
  role: 'employee' | 'coordinator' | 'admin';
  profession?: string;
  department?: string;
  points: number;
  badges: string[];
  status: 'active' | 'inactive';
  profileCompleted: boolean;
}

interface AuthState {
  // Estado
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  
  // Ações
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  updateUserPoints: (points: number) => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  // Estado inicial
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,

  // Ações básicas
  setUser: (user) => 
    set({ 
      user, 
      isAuthenticated: !!user 
    }),

  setLoading: (isLoading) => 
    set({ isLoading }),

  setError: (error) => 
    set({ error }),

  clearError: () => 
    set({ error: null }),

  // Atualizar pontos do usuário
  updateUserPoints: (points) => {
    const { user } = get();
    if (user) {
      set({ 
        user: { ...user, points: user.points + points } 
      });
    }
  },

  // Login simulado
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'error@test.com') {
        throw new Error('Credenciais inválidas');
      }
      
      // Usuário fake para desenvolvimento
      const fakeUser: User = {
        id: 'fake-user-id',
        email,
        displayName: 'Usuário Teste',
        organizationId: 'fake-org',
        role: 'employee',
        profession: 'Enfermeiro',
        department: 'UTI',
        points: 150,
        badges: ['iniciante'],
        status: 'active',
        profileCompleted: true,
      };
      
      set({ 
        user: fakeUser, 
        isAuthenticated: true, 
        isLoading: false 
      });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro no login';
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
      throw error;
    }
  },

  // Logout
  logout: async () => {
    set({ isLoading: true });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false,
        error: null 
      });
      
    } catch (error) {
      set({ isLoading: false });
      console.error('Erro no logout:', error);
    }
  },
}));