import clsx from 'clsx';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-4',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-gray-300 border-t-primary-600',
        sizeClasses[size],
        className
      )}
      role="status"
    >
      <span className="sr-only">Carregando...</span>
    </div>
  );
}