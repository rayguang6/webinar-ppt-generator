import { z } from 'zod';
import type { Slide as PptxSlide } from 'pptxgenjs';
import type { ReactElement } from 'react';

// Base renderer interface
export interface SlideRenderer<T> {
  html: (props: T) => ReactElement;
  pptx: (props: T, slide: PptxSlide) => Promise<void>;
}

// Base slide definition
export interface SlideDefinition<T> {
  id: string;
  name: string;
  description: string;
  schema: z.ZodType<T>;
  variants: {
    [key: string]: {
      name: string;
      render: SlideRenderer<T>;
    };
  };
}

// Presentation content types
export interface PresentationMetadata {
  title: string;
  date: string;
  presenter: string;
}

export interface SlideContent {
  type: string;
  variant: string;
  content: any;
}

export interface Presentation {
  metadata: PresentationMetadata;
  slides: SlideContent[];
}

// Helper to create slide definitions with proper typing
export function defineSlide<T>(config: {
  id: string;
  name: string;
  description: string;
  schema: z.ZodType<T>;
  variants: {
    [key: string]: {
      name: string;
      render: SlideRenderer<T>;
    };
  };
}): SlideDefinition<T> {
  return config;
}

// Basic slide component types
export type SlideComponentType = 
  | 'title' 
  | 'bullets' 
  | 'image' 
  | 'keyBenefits';

export type SlideLayout = 
  | 'default'
  | 'section'
  | 'bullets'
  | 'imageLeft'
  | 'imageRight';

// PPTX configuration type
export interface PptxSlideConfig {
  layout: SlideLayout;
  content: Record<string, any>;
}

// Base component interface
export interface SlideComponent {
  type: SlideComponentType;
  render: {
    html: (props: any) => ReactElement;
    pptx: (props: any, pptx: PptxGenJS) => Promise<void>;
  };
  schema: z.ZodSchema;
}

// Template interface
export interface SlideTemplate {
  id: string;
  name: string;
  components: SlideComponentType[];
  layout: SlideLayout;
}

// Content structure
export interface WebinarContent {
  metadata: {
    title: string;
    date: string;
    presenter: string;
  };
  slides: {
    templateId: string;
    content: Record<string, any>;
  }[];
} 