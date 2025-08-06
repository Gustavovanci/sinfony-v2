// src/pages/DashboardPage.tsx
import { useAuthStore } from '../stores/authStore';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Play, 
  CheckCircle,
  Star,
  Users,
  Target,
  ArrowRight,
  Calendar,
  Flame
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuthStore();

  // Mock data para demonstração
  const recentModules = [
    {
      id: 1,
      title: "Protocolo de Segurança em UTI",
      category: "Enfermagem",
      progress: 75,
      timeLeft: "15 min",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
      lastAccessed: "2 horas atrás"
    },
    {
      id: 2,
      title: "Farmacologia Básica",
      category: "Medicina",
      progress: 30,
      timeLeft: "45 min",
      image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=300&h=200&fit=crop",
      lastAccessed: "1 dia atrás"
    },
    {
      id: 3,
      title: "Comunicação Empática",
      category: "Soft Skills",
      progress: 100,
      timeLeft: "Concluído",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=200&fit=crop",
      lastAccessed: "3 dias atrás"
    }
  ];

  const achievements = [
    { icon: Flame, title: "Sequência de 7 dias", description: "Continue assim!", color: "text-orange-500" },
    { icon: Target, title: "Meta mensal", description: "5/8 módulos", color: "text-blue-500" },
    { icon: Star, title: "Avaliação 5 estrelas", description: "Último módulo", color: "text-yellow-500" },
  ];

  const stats = [
    { label: "Módulos Concluídos", value: "12", change: "+3", icon: CheckCircle, color: "text-green-500" },
    { label: "Horas de Estudo", value: "45", change: "+8", icon: Clock, color: "text-blue-500" },
    { label: "Pontos Totais", value: user?.points?.toString() || "0", change: "+150", icon: Award, color: "text-purple-500" },
    { label: "Ranking", value: "#15", change: "+5", icon: TrendingUp, color: "text-orange-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Olá, {user?.displayName?.split(' ')[0]} 👋
              </h1>
              <p className="text-blue-100 text-lg mb-6">
                Pronto para continuar sua jornada de aprendizado?
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-200" />
                  <span className="text-blue-100">Hoje é {new Date().toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Flame className="h-5 w-5 text-orange-300" />
                  <span className="text-blue-100">Sequência de 7 dias</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-50">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <span className="text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded">
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Continue Aprendendo</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
              Ver todos <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            {recentModules.map((module) => (
              <div key={module.id} className="bg-white rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <div className="flex">
                  <div className="w-48 h-32 relative overflow-hidden">
                    <img 
                      src={module.image} 
                      alt={module.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                    <div className="absolute bottom-2 left-2">
                      <span className="text-white text-xs bg-black/50 px-2 py-1 rounded">
                        {module.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {module.title}
                      </h3>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Play className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Clock className="h-4 w-4 mr-1" />
                      {module.timeLeft} restante · Acessado {module.lastAccessed}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Progresso</span>
                          <span className="text-gray-900 font-medium">{module.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${module.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        {module.progress === 100 ? 'Revisar' : 'Continuar'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <div className="bg-white rounded-xl p-6 border border-gray-200/50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conquistas Recentes</h3>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-50 ${achievement.color}`}>
                    <achievement.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">{achievement.title}</div>
                    <div className="text-gray-500 text-xs">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
              Ver todas as conquistas
            </button>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-xl p-6 border border-gray-200/50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ranking da Semana</h3>
            <div className="space-y-3">
              {[
                { name: "Ana Silva", points: 850, position: 1 },
                { name: "Carlos Santos", points: 720, position: 2 },
                { name: user?.displayName || "Você", points: user?.points || 0, position: 3, isUser: true },
                { name: "Maria Costa", points: 580, position: 4 },
              ].map((person, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${person.isUser ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'} transition-colors`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      person.position === 1 ? 'bg-yellow-500 text-white' :
                      person.position === 2 ? 'bg-gray-400 text-white' :
                      person.position === 3 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {person.position}
                    </div>
                    <span className={`text-sm ${person.isUser ? 'font-semibold text-blue-700' : 'text-gray-900'}`}>
                      {person.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{person.points} pts</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
              Ver ranking completo
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Ação Rápida</h3>
            <p className="text-purple-100 text-sm mb-4">
              Explore novos módulos disponíveis para sua área
            </p>
            <button className="w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors">
              Explorar Módulos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}