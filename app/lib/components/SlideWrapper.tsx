import React from 'react';
import { SLIDE_DIMENSIONS, SPACING } from '../constants/dimensions';

interface SlideWrapperProps {
  children: React.ReactNode;
  slideNumber?: number;
  variant?: 'light' | 'dark';
  className?: string;
}

export const SlideWrapper: React.FC<SlideWrapperProps> = ({
  children,
  slideNumber,
  variant = 'light',
  className = ''
}) => {
  const bgColor = variant === 'light' ? 'bg-white' : 'bg-gray-900';
  const textColor = variant === 'light' ? 'text-gray-900' : 'text-white';

  return (
    <div className="relative w-full max-w-[1920px] mx-auto">
      {/* Aspect ratio container */}
      <div 
        className="relative w-full"
        style={{ paddingTop: `${(1 / SLIDE_DIMENSIONS.aspectRatio) * 100}%` }}
      >
        {/* Slide content container */}
        <div 
          className={`absolute inset-0 ${bgColor} ${textColor} overflow-hidden rounded-lg shadow-lg ${className}`}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {/* Grid background */}
          <div 
            className="absolute inset-0 opacity-[0.02]" 
            style={{
              backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
              backgroundSize: '48px 48px'
            }}
          />
          
          {/* Content */}
          <div className="relative z-10 h-full">
            {children}
          </div>

          {/* Slide number */}
          {slideNumber !== undefined && (
            <div className="absolute bottom-4 right-4 text-sm text-gray-400">
              {slideNumber}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 