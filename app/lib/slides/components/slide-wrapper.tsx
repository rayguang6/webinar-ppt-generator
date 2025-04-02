import React from 'react';
import { SLIDE_DIMENSIONS } from '../../constants/dimensions';

interface SlideWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const SlideWrapper: React.FC<SlideWrapperProps> = ({ children, className = '' }) => {
  return (
    <div className="w-full relative" style={{ paddingTop: `${(1 / SLIDE_DIMENSIONS.aspectRatio) * 100}%` }}>
      <div 
        className={`absolute top-0 left-0 w-full h-full ${className}`}
        style={{
          maxWidth: SLIDE_DIMENSIONS.width,
          maxHeight: SLIDE_DIMENSIONS.height,
        }}
      >
        {children}
      </div>
    </div>
  );
}; 