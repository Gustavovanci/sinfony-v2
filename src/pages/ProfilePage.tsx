// src/pages/ProfilePage.tsx
import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { 
  User, 
  Mail, 
  Briefcase, 
  MapPin, 
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
  Award,
  BookOpen,
  Clock,
  Target,
  Star,
  Settings,
  Shield,
  Bell
} from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data para demonstração
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    profession: user?.profession || '',
    department: user?.department || '',
    bio: 'Enfermeira especializada em UTI com 5 anos de experiência. Apaixonada por aprendizado contínuo e melhoria da qualidade do atendimento.',
    location: 'São Paulo, SP',
    joinDate: '2023-01-15'
  });

  const stats = [
    { label: 'Módulos Concluídos', value: '12', icon: BookOpen, color: 'text-blue-500' },
    { label: 'Horas de Estudo', value: '45', icon: Clock, color: 'text-green-500' },
    { label: 'Pontos Totais', value: user?.points?.toString() || '0', icon: Target, color: 'text-purple-500' },
    { label: 'Avaliação Média', value: '4.8', icon: Star, color: 'text-yellow-500' }
  ];

  const achievements = [
    { name: 'Primeira Semana', date: '2024-01-20', icon: '🎯' },
    { name: 'Especialista', date: '2024-02-15', icon: '🏆' },
    { name: 'Velocista', date: '2024-03-01', icon: '⚡' },
    { name: 'Dedicado', date: '2024-03-10', icon: '💎' }
  ];

  const recentActivity = [
    { action: 'Completou módulo "Protocolo de Segurança"', date: '2 horas atrás', type: 'completion' },
    { action: 'Recebeu badge "Especialista"', date: '1 dia atrás', type: 'achievement' },
    { action: 'Iniciou módulo "Farmacologia Básica"', date: '3 dias atrás', type: 'start' }
  ];

  const handleSave = () => {
    // Aqui você salvaria os dados no backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset aos dados originais
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
                {user?.displayName?.charAt(0)}
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold">{profileData.displayName}</h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-1 text-blue-100">
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4" />
                  <span>{profileData.profession} • {profileData.department}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Membro desde {new Date(profileData.joinDate).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.slice(0, 2).map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </div>
              ))}
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

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { id: 'overview', label: 'Visão Geral' },
          { id: 'activity', label: 'Atividade' },
          { id: 'achievements', label: 'Conquistas' },
          { id: 'settings', label: 'Configurações' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Bio Section */}
              <div className="bg-white rounded-xl p-6 border border-gray-200/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Sobre</h3>
                  {isEditing && (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
                
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                      <input
                        type="text"
                        value={profileData.displayName}
                        onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Profissão</label>
                      <input
                        type="text"
                        value={profileData.profession}
                        onChange={(e) => setProfileData({...profileData, profession: e.target.value})}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                      <input
                        type="text"
                        value={profileData.department}
                        onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        rows={4}
                        className="input resize-none"
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 leading-relaxed">{profileData.bio}</p>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-gray-200/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'activity' && (
            <div className="bg-white rounded-xl p-6 border border-gray-200/50">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Atividade Recente</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      activity.type === 'completion' ? 'bg-green-100 text-green-600' :
                      activity.type === 'achievement' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {activity.type === 'completion' ? '✓' : activity.type === 'achievement' ? '🏆' : '▶'}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="bg-white rounded-xl p-6 border border-gray-200/50">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Conquistas</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-900">{achievement.name}</h4>
                        <p className="text-sm text-gray-500">
                          Conquistado em {new Date(achievement.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200/50">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Configurações da Conta</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">Email</div>
                        <div className="text-sm text-gray-500">{profileData.email}</div>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Alterar
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">Senha</div>
                        <div className="text-sm text-gray-500">••••••••</div>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Alterar
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200/50">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Notificações</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bell className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">Novos módulos</div>
                        <div className="text-sm text-gray-500">Receber notificações sobre novos conteúdos</div>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">Conquistas</div>
                        <div className="text-sm text-gray-500">Receber notificações sobre badges e conquistas</div>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 border border-gray-200/50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                📊 Ver Relatório de Progresso
              </button>
              <button className="w-full p-3 text-left bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                📜 Baixar Certificados
              </button>
              <button className="w-full p-3 text-left bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                🎯 Definir Nova Meta
              </button>
            </div>
          </div>

          {/* Recent Badges */}
          <div className="bg-white rounded-xl p-6 border border-gray-200/50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Badges Recentes</h3>
            <div className="space-y-3">
              {achievements.slice(0, 3).map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-xl">{achievement.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{achievement.name}</div>
                    <div className="text-xs text-gray-500">{achievement.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}