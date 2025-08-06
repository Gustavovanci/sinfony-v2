// src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, BookOpen, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="text-center relative z-10 max-w-2xl mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
            <BookOpen className="h-7 w-7 text-white" />
          </div>
          <span className="text-3xl font-bold text-white">Sinfony</span>
        </div>

        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-9xl md:text-[12rem] font-black text-white/10 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center animate-pulse">
                <Search className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Página não encontrada
          </h2>
          <p className="text-xl text-gray-300 max-w-lg mx-auto leading-relaxed">
            Ops! A página que você está procurando não existe ou foi movida para outro lugar.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/" 
            className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center shadow-2xl shadow-blue-500/25"
          >
            <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Voltar ao Início
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-white px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Página Anterior
          </button>
        </div>

        {/* Help Links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-gray-400 text-sm mb-4">Precisa de ajuda? Tente estes links:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/dashboard" 
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              to="/modules" 
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              Módulos
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              to="/progress" 
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              Meu Progresso
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              to="/profile" 
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              Perfil
            </Link>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-8">
          <p className="text-gray-400 text-xs">
            Ainda com problemas?{' '}
            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              Entre em contato com o suporte
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}