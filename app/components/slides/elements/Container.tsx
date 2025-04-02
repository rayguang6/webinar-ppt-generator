import { cn } from '../../../lib/utils';
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  layout?: 'left' | 'right' | 'center' | 'split';
  padding?: 'none' | 'small' | 'normal' | 'large';
}

export function Container({ 
  children, 
  className,
  layout = 'center',
  padding = 'normal'
}: ContainerProps) {
  return (
    <div className={cn(
      // Base styles
      'h-full flex',
      
      // Layout variations
      layout === 'center' && 'items-center justify-center',
      layout === 'left' && 'items-center justify-start',
      layout === 'right' && 'items-center justify-end',
      layout === 'split' && 'items-center justify-between',
      
      // Padding variations
      padding === 'none' && 'p-0',
      padding === 'small' && 'p-6',
      padding === 'normal' && 'p-12',
      padding === 'large' && 'p-16',
      
      // Custom classes
      className
    )}>
      {children}
    </div>
  );
} 