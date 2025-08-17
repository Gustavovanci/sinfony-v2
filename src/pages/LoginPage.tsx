import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';

const LoginWithRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = () => {
    console.log('Login:', { email: formData.email, password: formData.password });
    alert(`Login realizado!\nEmail: ${formData.email}\nPassword: ${formData.password}`);
    // Aqui você integraria com seu sistema de autenticação
  };

  const handleRegister = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Senhas não coincidem!');
      return;
    }
    console.log('Register:', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    });
    alert(`Conta criada com sucesso!\nNome: ${formData.name}\nEmail: ${formData.email}`);
    // Aqui você integraria com seu sistema de registro
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: '',
      rememberMe: false
    });
  };

  const handleSubmit = () => {
    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md p-8 border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Entre com suas credenciais para continuar' : 'Crie sua conta'}
          </h1>
          <p className="text-purple-200">
            {isLogin ? 'Acesse sua conta' : 'Junte-se à nossa plataforma'}
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Name (apenas no registro) */}
          {!isLogin && (
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Seu nome completo"
                  className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="seu@email.com"
                className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Phone (apenas no registro) */}
          {!isLogin && (
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Telefone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(11) 99999-9999"
                  className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password (apenas no registro) */}
          {!isLogin && (
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {/* Remember Me / Terms (apenas no login) */}
          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white/20 border-white/30 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-white text-sm">Lembrar de mim</span>
              </label>
              <button
                type="button"
                className="text-blue-300 hover:text-blue-100 text-sm font-medium"
              >
                Esqueci minha senha
              </button>
            </div>
          )}

          {/* Terms (apenas no registro) */}
          {!isLogin && (
            <div className="flex items-start">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-white/20 border-white/30 rounded focus:ring-blue-500 mt-1"
              />
              <span className="ml-2 text-white text-sm">
                Concordo com os{' '}
                <button type="button" className="text-blue-300 hover:text-blue-100 font-medium">
                  Termos de Uso
                </button>{' '}
                e{' '}
                <button type="button" className="text-blue-300 hover:text-blue-100 font-medium">
                  Política de Privacidade
                </button>
              </span>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </button>
        </div>

        {/* Toggle Mode */}
        <div className="mt-8 text-center">
          <p className="text-white mb-4">
            {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
          </p>
          <button
            onClick={toggleMode}
            className="text-blue-300 hover:text-blue-100 font-semibold text-lg underline transition-colors"
          >
            {isLogin ? 'Criar nova conta' : 'Fazer login'}
          </button>
        </div>

        {/* Demo Credentials (apenas no modo login) */}
        {isLogin && (
          <div className="mt-8 p-4 bg-black/30 rounded-lg border border-white/20">
            <h3 className="text-white font-semibold mb-2">Credenciais de Demo:</h3>
            <p className="text-purple-200 text-sm">
              <strong>Email:</strong> demo@sinfony.com<br />
              <strong>Senha:</strong> demo123<br />
              <span className="text-xs text-gray-300">
                Use error@test.com para testar erro de login
              </span>
            </p>
          </div>
        )}

        {/* Contact */}
        <div className="mt-6 text-center">
          <p className="text-purple-200 text-sm">
            Precisa de ajuda?{' '}
            <button className="text-blue-300 hover:text-blue-100 font-medium">
              Entre em contato com seu administrador
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginWithRegister;