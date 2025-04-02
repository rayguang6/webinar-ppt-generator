import { cn } from '../../../lib/utils';
import { IconType } from 'react-icons';
import { ReactNode } from 'react';

interface IconBoxProps {
  icon: IconType;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'gradient' | 'light';
  hover?: boolean;
}

export function IconBox({ 
  icon: Icon,
  className,
  size = 'md',
  variant = 'solid',
  hover = true
}: IconBoxProps) {
  return (
    <div className={cn(
      // Base styles
      'flex items-center justify-center rounded-2xl transition-all duration-300',
      
      // Size variations
      size === 'sm' && 'w-12 h-12',
      size === 'md' && 'w-16 h-16',
      size === 'lg' && 'w-20 h-20',
      
      // Variant styles
      variant === 'solid' && 'bg-blue-600 text-white',
      variant === 'outline' && 'border-2 border-blue-600 text-blue-600',
      variant === 'gradient' && 'bg-gradient-to-br from-blue-500 to-violet-500 text-white',
      variant === 'light' && 'bg-blue-50 text-blue-600',
      
      // Hover effects
      hover && [
        variant === 'solid' && 'hover:bg-blue-700',
        variant === 'outline' && 'hover:bg-blue-50',
        variant === 'gradient' && 'hover:from-blue-600 hover:to-violet-600',
        variant === 'light' && 'hover:bg-blue-100'
      ],
      
      // Custom classes
      className
    )}>
      <Icon 
        size={size === 'sm' ? 20 : size === 'md' ? 24 : 32}
        className={cn(
          'transition-transform duration-300',
          hover && 'group-hover:scale-110'
        )}
      />
    </div>
  );
} 