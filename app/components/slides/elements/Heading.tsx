import { cn } from '../../../lib/utils';
import { ReactNode } from 'react';
import { gradients } from '../../../styles/theme';

interface HeadingProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  gradient?: keyof typeof gradients;
  withLine?: boolean;
  align?: 'left' | 'center' | 'right';
}

export function Heading({ 
  children, 
  className,
  size = 'xl',
  gradient,
  withLine = false,
  align = 'left'
}: HeadingProps) {
  const content = (
    <h2 className={cn(
      // Base styles
      'font-bold tracking-tight',
      
      // Size variations
      size === 'sm' && 'text-2xl',
      size === 'md' && 'text-3xl',
      size === 'lg' && 'text-4xl',
      size === 'xl' && 'text-5xl',
      size === '2xl' && 'text-6xl',
      
      // Gradient text if specified
      gradient && [
        'bg-clip-text text-transparent',
        gradients[gradient]
      ],
      
      // Alignment
      align === 'center' && 'text-center',
      align === 'right' && 'text-right',
      
      // Custom classes
      className
    )}>
      {children}
    </h2>
  );

  if (withLine) {
    return (
      <div className="flex items-center gap-6">
        {align !== 'right' && <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-200" />}
        {content}
        {align !== 'left' && <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-200" />}
      </div>
    );
  }

  return content;
} 