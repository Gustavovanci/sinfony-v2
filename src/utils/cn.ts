// src/utils/cn.ts
import { type ClassValue, clsx } from 'clsx';

/**
 * Utilitário para combinar classes CSS condicionalmente
 * Funciona similar ao classnames mas otimizado para Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Função para instalar clsx se não estiver instalada
// npm install clsx

// Exemplo de uso:
// cn('base-class', condition && 'conditional-class', { 'object-class': boolean })
// cn('px-4 py-2', isActive && 'bg-blue-500', { 'text-white': isActive })