import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

// Componente de Header
const Header = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white shadow-sm">
      <div className="container-app flex justify-between items-center p-4">
        <h1 className="text-xl font-bold text-primary-600">Sinfony</h1>
        <div className="flex items-center space-x-4">
          <span>Olá, {user?.displayName}</span>
          <button onClick={logout} className="btn-outline text-sm">
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

// Componente da Barra Lateral
const Sidebar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? 'bg-primary-100 text-primary-700'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-5">
      <nav className="space-y-2">
        <NavLink to="/dashboard" className={navLinkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/progress" className={navLinkClass}>
          Meu Progresso
        </NavLink>
        <NavLink to="/profile" className={navLinkClass}>
          Meu Perfil
        </NavLink>
      </nav>
    </aside>
  );
};

// Componente Principal do Layout
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="container-app">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}