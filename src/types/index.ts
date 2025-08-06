// src/types/index.ts

import { Timestamp } from 'firebase/firestore';

// ===== USER & ORGANIZATION =====
export interface Organization {
  id: string;
  name: string;
  domain: string;
  logoUrl?: string;
  primaryColor: string;
  createdAt: Timestamp;
  isActive: boolean;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  organizationId: string;
  role: 'employee' | 'coordinator' | 'admin';
  profession?: string;
  department?: string;
  points: number;
  badges: string[];
  status: 'active' | 'inactive';
  profileCompleted: boolean;
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
  avatarUrl?: string;
}

// ===== MODULES & CONTENT =====
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
  createdAt: Timestamp;
  createdBy: string;
  stats?: ModuleStats;
}

export type ModuleCategory = 
  | 'enfermagem' 
  | 'medicina' 
  | 'administracao' 
  | 'seguranca' 
  | 'geral';

export interface Topic {
  id: string;
  title: string;
  type: TopicType;
  order: number;
  content?: string; // HTML para tipo 'text'
  videoUrl?: string; // YouTube embed para tipo 'video'
  imageUrl?: string; // URL da imagem para tipo 'image'
  quizId?: string; // ID do quiz para tipo 'quiz'
}

export type TopicType = 'video' | 'text' | 'image' | 'quiz';

export interface ModuleStats {
  totalCompletions: number;
  averageRating: number;
  totalViews: number;
  averageTimeSpent: number; // em minutos
}

// ===== PROGRESS =====
export interface ModuleProgress {
  moduleId: string;
  status: ProgressStatus;
  completedTopics: string[];
  quizScore?: number;
  startedAt?: Timestamp;
  completedAt?: Timestamp;
  lastAccessedAt: Timestamp;
  timeSpent: number; // em minutos
}

export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';

// ===== QUIZ =====
export interface Quiz {
  id: string;
  title: string;
  moduleId: string;
  questions: Question[];
  createdAt: Timestamp;
  timeLimit?: number; // em minutos
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface QuizAttempt {
  quizId: string;
  userId: string;
  answers: number[]; // índices das respostas selecionadas
  score: number; // 0-100
  completedAt: Timestamp;
  timeSpent: number; // em segundos
}

// ===== FEEDBACK =====
export interface Feedback {
  id: string;
  userId: string;
  organizationId: string;
  moduleId: string;
  nps: number; // 0-10
  satisfaction: number; // 1-5
  comment?: string;
  createdAt: Timestamp;
}

// ===== NOTIFICATIONS =====
export interface Notification {
  id: string;
  title: string;
  message: string;
  organizationId?: string; // se vazio, é global
  targetRole?: UserRole; // se vazio, é para todos
  createdAt: Timestamp;
  createdBy: string;
  isActive: boolean;
  expiresAt?: Timestamp;
}

export interface UserNotificationStatus {
  notificationId: string;
  read: boolean;
  readAt?: Timestamp;
  dismissed: boolean;
}

export type UserRole = 'employee' | 'coordinator' | 'admin';

// ===== CERTIFICATES =====
export interface Certificate {
  id: string;
  userId: string;
  moduleId: string;
  organizationId: string;
  issuedAt: Timestamp;
  certificateUrl?: string; // se salvarmos o PDF
}

// ===== ANALYTICS =====
export interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalModules: number;
  completionRate: number;
  averageEngagement: number;
  topModules: Array<{
    moduleId: string;
    title: string;
    completions: number;
  }>;
  userProgress: Array<{
    userId: string;
    displayName: string;
    completedModules: number;
    totalPoints: number;
  }>;
}

// ===== FORM TYPES =====
export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  email: string;
  password: string;
  displayName: string;
  profession?: string;
  department?: string;
}

export interface ProfileForm {
  displayName: string;
  profession: string;
  department: string;
}

// ===== API RESPONSES =====
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ===== UTILITY TYPES =====
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AppError {
  code: string;
  message: string;
  details?: unknown;
}

// ===== CLOUDINARY =====
export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}