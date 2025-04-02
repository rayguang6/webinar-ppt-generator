import { z } from 'zod';
import type { Slide as PptxSlide } from 'pptxgenjs';
import { SLIDE_DIMENSIONS } from '../constants/dimensions';

// Base types for all slides
export type SlideRenderer = {
  toHTML: (content: any) => JSX.Element;
  toPPTX: (content: any, pptx: PptxSlide) => void;
};

export type SlideDefinition = {
  id: string;
  name: string;
  description: string;
  schema: z.ZodType<any>;
  variants: {
    [key: string]: {
      id: string;
      name: string;
      render: SlideRenderer;
    };
  };
};

// Helper to create slide definitions
export function defineSlide<T extends z.ZodType<any>>(config: {
  id: string;
  name: string;
  description: string;
  schema: T;
  variants: {
    [K: string]: {
      name: string;
      render: SlideRenderer;
    };
  };
}): SlideDefinition {
  return {
    ...config,
    variants: Object.fromEntries(
      Object.entries(config.variants).map(([key, variant]) => [
        key,
        {
          id: key,
          ...variant,
        },
      ])
    ),
  };
}

// Registry of all slides
export const slideRegistry = new Map<string, SlideDefinition>();

// Register a slide type
export function registerSlide(slide: SlideDefinition) {
  slideRegistry.set(slide.id, slide);
}

// Get a slide definition
export function getSlide(id: string): SlideDefinition | undefined {
  return slideRegistry.get(id);
}

// Types for slide content
export type SlideContent = {
  type: string;
  variant: string;
  content: any;
};

// Main slide generator
export class SlideRenderer {
  static async generateHTML(slides: SlideContent[]): Promise<JSX.Element[]> {
    return slides.map(slide => {
      const definition = getSlide(slide.type);
      if (!definition) throw new Error(`Unknown slide type: ${slide.type}`);
      
      const variant = definition.variants[slide.variant];
      if (!variant) throw new Error(`Unknown variant ${slide.variant} for slide type ${slide.type}`);

      // Validate content against schema
      definition.schema.parse(slide.content);
      
      return variant.render.toHTML(slide.content);
    });
  }

  static async generatePPTX(pptx: any, slides: SlideContent[]): Promise<void> {
    for (const slide of slides) {
      const definition = getSlide(slide.type);
      if (!definition) throw new Error(`Unknown slide type: ${slide.type}`);
      
      const variant = definition.variants[slide.variant];
      if (!variant) throw new Error(`Unknown variant ${slide.variant} for slide type ${slide.type}`);

      // Validate content against schema
      definition.schema.parse(slide.content);
      
      const pptxSlide = pptx.addSlide();
      await variant.render.toPPTX(slide.content, pptxSlide);
    }
  }
} 