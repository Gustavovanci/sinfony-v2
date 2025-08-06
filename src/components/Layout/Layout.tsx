// src/components/layout/Layout.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { 
  BookOpen, 
  Home, 
  TrendingUp, 
  User, 
  Settings, 
  Bell, 
  Search,
  Menu,
  X,
  LogOut,
  Award,
  Target
} from 'lucide-react';

// Componente de Header
const Header = () => {
  const { user, logout } = useAuthStore();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar módulos, conteúdos..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100/50 border border-gray-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4 ml-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="font-medium text-gray-900">Notificações</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm text-gray-900">Novo módulo disponível</p>
                    <p className="text-xs text-gray-500 mt-1">Há 2 horas</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm text-gray-900">Certificado gerado</p>
                    <p className="text-xs text-gray-500 mt-1">Há 1 dia</p>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-gray-100">
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Ver todas
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.displayName}</p>
              <p className="text-xs text-gray-500">{user?.profession}</p>
            </div>
            <div className="relative group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-medium">
                {user?.displayName?.charAt(0)}
              </div>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user?.displayName}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <NavLink
                  to="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <User className="h-4 w-4 mr-3" />
                  Meu Perfil
                </NavLink>
                <NavLink
                  to="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Configurações
                </NavLink>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={logout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Componente da Barra Lateral
const Sidebar = () => {
  const { user } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'Módulos', path: '/modules' },
    { icon: TrendingUp, label: 'Meu Progresso', path: '/progress' },
    { icon: Award, label: 'Certificados', path: '/certificates' },
    { icon: User, label: 'Meu Perfil', path: '/profile' },
  ];

  const NavItem = ({ icon: Icon, label, path }: { icon: any, label: string, path: string }) => (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
          isActive
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        } ${isCollapsed ? 'justify-center' : ''}`
      }
    >
      <Icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
      {!isCollapsed && (
        <span className="font-medium">{label}</span>
      )}
      {!isCollapsed && (
        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-1 h-1 bg-current rounded-full"></div>
        </div>
      )}
    </NavLink>
  );

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-72'} bg-white border-r border-gray-200/50 transition-all duration-300 flex flex-col`}>
      {/* Logo */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sinfony
            </span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </button>
      </div>

      {/* User Stats */}
      {!isCollapsed && (
        <div className="p-6 border-b border-gray-200/50">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Seus Pontos</span>
              <Target className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{user?.points || 0}</div>
            <div className="text-xs text-gray-500">+25 esta semana</div>
            
            {/* Progress Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progresso</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        {navItems.map((item) => (
          <NavItem key={item.path} {...item} />
        ))}
      </nav>

      {/* Bottom Section */}
      {!isCollapsed && (
        <div className="p-6 border-t border-gray-200/50">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Award className="h-5 w-5" />
              <span className="text-xs bg-white/20 px-2 py-1 rounded">Novo</span>
            </div>
            <h3 className="font-medium mb-1">Badge Desbloqueado!</h3>
            <p className="text-xs text-blue-100 mb-3">
              Você completou 5 módulos este mês
            </p>
            <button className="w-full bg-white/20 text-white text-sm py-2 rounded-lg hover:bg-white/30 transition-colors">
              Ver Badge
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

// Componente Principal do Layout
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}