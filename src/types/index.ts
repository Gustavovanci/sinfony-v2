// src/types/index.ts

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'super_admin';
  department?: string;
  position?: string;
  avatar?: string;
  createdAt: Date;
  lastAccess: Date;
  totalPoints: number;
  completedModules: number;
  badges: number;
  level: number;
  isActive: boolean;
}

// Module Types
export type ModuleCategory = 
  | 'seguranca' 
  | 'tecnologia' 
  | 'compliance' 
  | 'lideranca' 
  | 'soft-skills' 
  | 'geral';

export interface Module {
  id: string;
  title: string;
  description: string;
  category: ModuleCategory;
  coverImageUrl: string;
  estimatedMinutes: number;
  isActive: boolean;
  order: number;
  topics: Topic[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[];
  learningObjectives?: string[];
}

// Topic Types
export type TopicType = 'text' | 'video' | 'image' | 'quiz' | 'document' | 'interactive';

export interface Topic {
  id: string;
  title: string;
  type: TopicType;
  order: number;
  content: string;
  description?: string;
  estimatedMinutes?: number;
  quiz?: Quiz;
  resources?: Resource[];
  isOptional?: boolean;
}

export interface Resource {
  id: string;
  title: string;
  type: 'link' | 'file' | 'video';
  url: string;
  description?: string;
}

// Quiz Types
export interface Quiz {
  id?: string;
  title: string;
  description: string;
  questions: Question[];
  passingScore: number;
  timeLimit?: number;
  allowRetakes: boolean;
  randomizeQuestions: boolean;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizResult {
  id: string;
  userId: string;
  moduleId: string;
  topicId: string;
  score: number;
  passed: boolean;
  answers: Record<string, any>;
  timeSpent: number;
  submittedAt: Date;
  attempt: number;
}

// Progress Tracking Types
export interface UserProgress {
  id: string;
  userId: string;
  moduleId: string;
  topicsCompleted: TopicCompletion[];
  completedAt: Date | null;
  startedAt: Date;
  lastAccessedAt: Date;
  points: number;
  averageScore: number;
  timeSpentMinutes: number;
  certificateEarned?: boolean;
  notes?: string;
}

export interface TopicCompletion {
  topicId: string;
  completedAt: Date;
  timeSpentSeconds: number;
  score?: number;
}

export interface LearningStreak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date | null;
  streakType?: 'daily' | 'weekly';
}

export interface TimeSpent {
  id: string;
  userId: string;
  date: Date;
  minutes: number;
  moduleId?: string;
  topicId?: string;
  activity?: 'learning' | 'quiz' | 'review' | 'discussion';
}

// Gamification Types
export interface Badge {
  id: string;
  name: string;
  description: string;
  type: 'completion' | 'streak' | 'points' | 'speed' | 'perfectScore' | 'engagement' | 'security' | 'leadership';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  criteria: Record<string, any>;
  isActive: boolean;
  iconUrl?: string;
  color?: string;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  earnedAt: Date;
  notificationSent?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  targetValue: number;
  badgeId?: string;
  type: 'completion' | 'points' | 'streak' | 'speed' | 'engagement';
  isUnlocked: boolean;
  isClaimed: boolean;
  currentProgress: number;
  unlockedAt: Date | null;
  claimedAt: Date | null;
  iconUrl?: string;
  category?: string;
}

export interface Leaderboard {
  userId: string;
  name: string;
  totalPoints: number;
  level: number;
  badges: number;
  completedModules: number;
  lastActivity: Date;
  position?: number;
  avatar?: string;
  department?: string;
}

export interface PointsTransaction {
  id: string;
  userId: string;
  points: number;
  description: string;
  type: 'earned' | 'spent' | 'bonus' | 'penalty';
  createdAt: Date;
  moduleId?: string;
  achievementId?: string;
  relatedEntity?: string;
}

export interface GamificationStats {
  totalPoints: number;
  level: number;
  experiencePoints: number;
  totalBadges: number;
  completedModules: number;
  currentStreak: number;
  longestStreak: number;
  rank?: number;
  nextLevelPoints?: number;
}

// Analytics Types
export interface PlatformAnalytics {
  totalUsers: number;
  activeUsers: number;
  totalModules: number;
  completionRate: number;
  averageSessionTime: number;
  topCategories: CategoryStats[];
  userGrowth: GrowthData[];
  engagementMetrics: EngagementMetrics;
}

export interface CategoryStats {
  category: ModuleCategory;
  totalModules: number;
  enrollments: number;
  completions: number;
  averageRating: number;
  avgCompletionTime: number;
}

export interface GrowthData {
  date: Date;
  newUsers: number;
  activeUsers: number;
  completions: number;
}

export interface EngagementMetrics {
  dailyActiveUsers: number;
  weeklyActiveUsers: number;
  monthlyActiveUsers: number;
  averageSessionsPerUser: number;
  bounceRate: number;
  retentionRate: number;
}

export interface SuperAdminMetrics {
  totalUsers: number;
  activeUsers: number;
  totalModules: number;
  completedModules: number;
  averageCompletionRate: number;
  totalHoursLearned: number;
  badgesEarned: number;
  avgTimePerModule: number;
  userGrowth: number;
  moduleCompletionTrend: number[];
  categoryPerformance: CategoryPerformance[];
  topPerformers: TopPerformer[];
  recentActivity: Activity[];
}

export interface CategoryPerformance {
  category: string;
  totalModules: number;
  completionRate: number;
  avgRating: number;
  enrollments: number;
  averageTimeSpent: number;
}

export interface TopPerformer {
  id: string;
  name: string;
  email: string;
  completedModules: number;
  totalPoints: number;
  badges: number;
  lastActivity: Date;
  department?: string;
  level: number;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  moduleTitle?: string;
  timestamp: Date;
  points?: number;
  description?: string;
  type: 'completion' | 'quiz' | 'badge' | 'achievement' | 'login';
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'achievement' | 'reminder';
  isRead: boolean;
  createdAt: Date;
  readAt?: Date;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

// Certificate Types
export interface Certificate {
  id: string;
  userId: string;
  moduleId: string;
  certificateNumber: string;
  issuedAt: Date;
  validUntil?: Date;
  templateId: string;
  metadata: CertificateMetadata;
}

export interface CertificateMetadata {
  userName: string;
  moduleTitle: string;
  completionDate: Date;
  score: number;
  timeSpent: number;
  issuer: string;
  signatories: string[];
}

// Discussion/Social Types
export interface Discussion {
  id: string;
  moduleId: string;
  topicId?: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
  replies: Reply[];
  likes: number;
  views: number;
  isLocked: boolean;
  isPinned: boolean;
  tags?: string[];
}

export interface Reply {
  id: string;
  discussionId: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
  parentReplyId?: string;
  likes: number;
  isModerated: boolean;
}

// Search Types
export interface SearchResult {
  id: string;
  type: 'module' | 'topic' | 'discussion' | 'user';
  title: string;
  description: string;
  url: string;
  relevanceScore: number;
  category?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface SearchFilters {
  categories?: ModuleCategory[];
  difficulty?: string[];
  duration?: {
    min: number;
    max: number;
  };
  tags?: string[];
  type?: TopicType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// Reporting Types
export interface Report {
  id: string;
  title: string;
  type: 'user_progress' | 'module_analytics' | 'engagement' | 'completion' | 'gamification';
  generatedBy: string;
  generatedAt: Date;
  parameters: ReportParameters;
  data: any;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  status: 'pending' | 'generating' | 'completed' | 'error';
}

export interface ReportParameters {
  dateRange: {
    start: Date;
    end: Date;
  };
  users?: string[];
  modules?: string[];
  categories?: ModuleCategory[];
  departments?: string[];
  includeDetails?: boolean;
}

// Integration Types
export interface Integration {
  id: string;
  name: string;
  type: 'sso' | 'lms' | 'hr' | 'calendar' | 'notification' | 'analytics';
  isEnabled: boolean;
  configuration: Record<string, any>;
  lastSyncAt?: Date;
  status: 'active' | 'inactive' | 'error' | 'syncing';
}

// Settings Types
export interface PlatformSettings {
  id: string;
  general: GeneralSettings;
  authentication: AuthSettings;
  gamification: GamificationSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
  branding: BrandingSettings;
}

export interface GeneralSettings {
  platformName: string;
  description: string;
  supportEmail: string;
  timezone: string;
  language: string;
  allowSelfRegistration: boolean;
  requireEmailVerification: boolean;
  maintenanceMode: boolean;
}

export interface AuthSettings {
  enableSSO: boolean;
  ssoProvider?: string;
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
  };
  sessionTimeout: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
}

export interface GamificationSettings {
  enabled: boolean;
  pointsSystem: {
    topicCompletion: number;
    moduleCompletion: number;
    quizPassing: number;
    perfectScore: number;
    dailyLogin: number;
  };
  leaderboardEnabled: boolean;
  badgesEnabled: boolean;
  achievementsEnabled: boolean;
  levelSystem: {
    enabled: boolean;
    pointsPerLevel: number;
  };
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  inAppNotifications: boolean;
  digestFrequency: 'daily' | 'weekly' | 'monthly' | 'never';
  types: {
    achievements: boolean;
    reminders: boolean;
    announcements: boolean;
    social: boolean;
  };
}

export interface SecuritySettings {
  enforceHttps: boolean;
  contentSecurityPolicy: string;
  allowedDomains: string[];
  ipWhitelist: string[];
  auditLogging: boolean;
  dataRetentionDays: number;
}

export interface BrandingSettings {
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  customCss?: string;
  footerText?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    hasMore?: boolean;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
    totalPages: number;
  };
}

// Form Types
export interface ModuleFormData {
  title: string;
  description: string;
  category: ModuleCategory;
  coverImageUrl: string;
  estimatedMinutes: number;
  isActive: boolean;
  order: number;
  topics: Topic[];
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  learningObjectives: string[];
}

export interface UserFormData {
  email: string;
  name: string;
  role: 'user' | 'admin';
  department?: string;
  position?: string;
  password?: string;
}

export interface QuizFormData {
  title: string;
  description: string;
  questions: Question[];
  passingScore: number;
  timeLimit?: number;
  allowRetakes: boolean;
  randomizeQuestions: boolean;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  userId?: string;
  context?: Record<string, any>;
}

// Theme/UI Types
export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Export all types for easy importing
export type {
  // Re-export main types for convenience
  User,
  Module,
  Topic,
  Quiz,
  Question,
  UserProgress,
  Badge,
  Achievement,
  Notification,
  Report
};