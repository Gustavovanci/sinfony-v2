// src/components/layout/Header.tsx
import { useState } from 'react';
import { Menu, Bell, User, LogOut, Settings } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleProfile = () => {
    navigate('/profile');
    setUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Botão menu móvel */}
          <button
            type="button"
            className="lg:hidden p-2 text-gray-500 hover:text-gray-600"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo/Título no mobile */}
          <div className="lg:hidden">
            <h1 className="text-xl font-bold text-primary-600">Sinfony</h1>
          </div>

          {/* Lado direito */}
          <div className="flex items-center space-x-4">
            {/* Pontos de gamificação */}
            <div className="hidden sm:flex items-center space-x-2 bg-yellow-50 px-3 py-1 rounded-full">
              <span className="text-yellow-600 font-medium text-sm">
                ⭐ {user?.points || 0} pontos
              </span>
            </div>

            {/* Notificações */}
            <button className="relative p-2 text-gray-500 hover:text-gray-600">
              <Bell className="h-6 w-6" />
              {/* Badge de notificações não lidas */}
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
            </button>

            {/* Menu do usuário */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center space-x-3 p-2 text-sm text-gray-500 hover:text-gray-600"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="font-medium text-gray-900">{user?.displayName}</p>
                    <p className="text-xs text-gray-500">{user?.profession}</p>
                  </div>
                </div>
              </button>

              {/* Dropdown do usuário */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <button
                    onClick={handleProfile}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Meu Perfil
                  </button>
                  
                  <hr className="my-1" />
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay para fechar dropdown */}
      {userMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </header>
  );
}