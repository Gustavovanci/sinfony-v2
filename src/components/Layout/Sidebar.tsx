// src/components/layout/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Users, 
  Settings,
  X 
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { usePermissions } from '@/components/auth/ProtectedRoute';
import { cn } from '@/utils/cn';

interface SidebarProps {
  onClose?: () => void; // Para mobile
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
  roles?: Array<'employee' | 'coordinator' | 'admin'>;
}

const navigation: NavItem[] = [
  // Rotas para todos os usuários
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: Home 
  },
  { 
    name: 'Meu Progresso', 
    href: '/progress', 
    icon: TrendingUp 
  },
  { 
    name: 'Certificados', 
    href: '/certificates', 
    icon: Award 
  },
  
  // Rotas para coordenadores
  { 
    name: 'Gestão de Equipe', 
    href: '/coordinator', 
    icon: Users,
    roles: ['coordinator', 'admin']
  },
  
  // Rotas para admins
  { 
    name: 'Administração', 
    href: '/admin', 
    icon: Settings,
    roles: ['admin']
  },
];

export default function Sidebar({ onClose }: SidebarProps) {
  const { user } = useAuthStore();
  const { hasAnyRole } = usePermissions();

  // Filtrar navegação baseada na role do usuário
  const filteredNavigation = navigation.filter(item => {
    if (!item.roles) return true; // Item disponível para todos
    return hasAnyRole(item.roles);
  });

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header da sidebar */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="ml-3 text-xl font-bold text-gray-900">Sinfony</span>
        </div>
        
        {/* Botão fechar para mobile */}
        {onClose && (
          <button
            type="button"
            className="lg:hidden p-2 text-gray-500 hover:text-gray-600"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Informações do usuário */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-primary-600 font-medium text-sm">
              {user?.displayName?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{user?.displayName}</p>
            <p className="text-xs text-gray-500">{user?.profession}</p>
            {user?.department && (
              <p className="text-xs text-gray-400">{user.department}</p>
            )}
          </div>
        </div>
        
        {/* Progresso ou pontos */}
        <div className="mt-4 bg-gray-50 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Pontos</span>
            <span className="text-sm font-bold text-primary-600">
              {user?.points || 0}
            </span>
          </div>
          
          {/* Barra de progresso para próximo nível */}
          <div className="mt-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Nível Atual</span>
              <span>Próximo: +{1000 - (user?.points || 0)} pts</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${Math.min(((user?.points || 0) % 1000) / 1000 * 100, 100)}%` 
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-6 py-6 space-y-1">
        {filteredNavigation.map((item) => {
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )
              }
              onClick={onClose} // Fechar sidebar no mobile após navegar
            >
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
              <span>{item.name}</span>
              
              {/* Badge */}
              {item.badge && (
                <span className="ml-auto bg-primary-100 text-primary-600 text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer da sidebar */}
      <div className="p-6 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p>Sinfony v2.0</p>
          <p>© 2024 Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
}