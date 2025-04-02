import { SlideDefinition } from '../types/slide';

class SlideRegistry {
  private slides: Map<string, SlideDefinition<any>> = new Map();

  register<T>(slide: SlideDefinition<T>) {
    this.slides.set(slide.id, slide);
  }

  get(id: string): SlideDefinition<any> | undefined {
    return this.slides.get(id);
  }

  getAll(): SlideDefinition<any>[] {
    return Array.from(this.slides.values());
  }

  getVariant(slideId: string, variantId: string) {
    const slide = this.slides.get(slideId);
    if (!slide) throw new Error(`Slide type '${slideId}' not found`);
    
    const variant = slide.variants[variantId];
    if (!variant) throw new Error(`Variant '${variantId}' not found for slide type '${slideId}'`);
    
    return variant;
  }
}

export const registry = new SlideRegistry(); 