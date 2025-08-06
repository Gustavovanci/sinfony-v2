// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './stores/authStore';

// Páginas - TODOS SEM CHAVES (export default)
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ModulePage from './pages/ModulePage';
import ProgressPage from './pages/ProgressPage';      // SEM CHAVES
import ProfilePage from './pages/ProfilePage';        // SEM CHAVES
import CoordinatorPage from './pages/CoordinatorPage'; // SEM CHAVES
import AdminPage from './pages/AdminPage';            // SEM CHAVES
import NotFoundPage from './pages/NotFoundPage';

// Componentes
import LoadingSpinner from './components/ui/LoadingSpinner';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const { isLoading, isAuthenticated, setLoading } = useAuthStore();

  // Verificar se há usuário logado ao inicializar
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const savedUser = localStorage.getItem('sinfony-user');
        if (savedUser) {
          console.log('Usuário encontrado no localStorage');
        }
        
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
  }, [setLoading]);

  // Loading inicial
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
      <div className="min-h-screen bg-gray-50">
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

          {/* Rotas Protegidas */}
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

          {/* Página de módulo sem layout */}
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

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;