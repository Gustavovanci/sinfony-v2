// src/pages/LandingPage.tsx
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
      <h1 className="text-5xl font-bold gradient-text mb-4">
        Bem-vindo ao Sinfony
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl">
        Sua plataforma de aprendizado e desenvolvimento contínuo. Explore módulos, acompanhe seu progresso e conquiste novos conhecimentos.
      </p>
      <div>
        <Link to="/login" className="btn-primary px-8 py-3 text-lg">
          Acessar Plataforma
        </Link>
      </div>
    </div>
  );
}