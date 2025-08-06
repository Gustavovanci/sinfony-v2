import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, LogIn } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Efeitos de fundo sutis */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-900 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center flex flex-col items-center">
        {/* Ícone Animado */}
        

        {/* Nome "Sinfony" com animação de surgimento */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-7xl md:text-9xl font-black mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
        >
          Sinfony
        </motion.h1>

        {/* Descrição com animação */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          A plataforma de treinamento hospitalar que transforma conhecimento em performance.
        </motion.p>

        {/* Botões de Login com animação */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col items-center gap-4"
        >
          <Link to="/login">
            <button className="flex items-center w-64 justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <LogIn className="h-5 w-5 mr-2" />
              Acesso Cliente
            </button>
          </Link>
          
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
