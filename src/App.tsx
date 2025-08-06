// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './stores/authStore';

// Páginas
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ModulePage from './pages/ModulePage';
import ProgressPage from './pages/ProgressPage';
import ProfilePage from './pages/ProfilePage';
import CoordinatorPage from './pages/CoordinatorPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

// Componentes
import LoadingSpinner from './components/ui/LoadingSpinner';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// A linha 'import ./App.css' foi removida para evitar conflitos de estilo.
// A estilização principal agora é controlada exclusivamente pelo Tailwind CSS via 'src/index.css'.

function App() {
  const { isLoading, isAuthenticated, setLoading } = useAuthStore();

  // Verificar se há usuário logado ao inicializar
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        // Simula uma verificação de autenticação
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const savedUser = localStorage.getItem('sinfony-user');
        if (savedUser) {
          console.log('Usuário encontrado no localStorage');
          // Aqui você normalmente faria a validação do token/usuário
          // e chamaria o setUser do authStore.
        }
        
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
  }, [setLoading]);

  // Tela de Loading inicial
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Carregando Sinfony...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      {/* A div externa foi removida pois o Layout já controla a tela cheia */}
      <Routes>
        {/* Rotas Públicas */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />} 
        />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
        />

        {/* Rotas Protegidas com Layout */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/progress" element={
          <ProtectedRoute>
            <Layout>
              <ProgressPage />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Layout>
              <ProfilePage />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Página de módulo sem o Layout principal */}
        <Route path="/module/:moduleId" element={
          <ProtectedRoute>
            <ModulePage />
          </ProtectedRoute>
        } />

        {/* Rotas para Coordenadores */}
        <Route path="/coordinator" element={
          <ProtectedRoute requiredRole="coordinator">
            <Layout>
              <CoordinatorPage />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Rotas para Admins */}
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <Layout>
              <AdminPage />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Rota 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
