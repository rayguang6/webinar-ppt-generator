import PptxGenJS from 'pptxgenjs';
import { registry } from './registry';
import type { Presentation } from '../types/slide';

export class SlideGenerator {
  async generateHTML(presentation: Presentation) {
    return presentation.slides.map(slide => {
      const slideType = registry.get(slide.type);
      if (!slideType) throw new Error(`Unknown slide type: ${slide.type}`);

      const variant = slideType.variants[slide.variant];
      if (!variant) throw new Error(`Unknown variant ${slide.variant} for slide type ${slide.type}`);

      // Validate content against schema
      slideType.schema.parse(slide.content);

      return variant.render.html(slide.content);
    });
  }

  async generatePPTX(presentation: Presentation) {
    const pptx = new PptxGenJS();

    // Set presentation properties
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = presentation.metadata.presenter;
    pptx.title = presentation.metadata.title;
    pptx.subject = presentation.metadata.title;
    pptx.company = presentation.metadata.presenter;
    
    // Set default slide properties
    pptx.defineLayout({
      name: 'LAYOUT_16x9',
      width: 10,
      height: 5.625
    });

    // Generate each slide
    for (const slide of presentation.slides) {
      const slideType = registry.get(slide.type);
      if (!slideType) throw new Error(`Unknown slide type: ${slide.type}`);

      const variant = slideType.variants[slide.variant];
      if (!variant) throw new Error(`Unknown variant ${slide.variant} for slide type ${slide.type}`);

      // Validate content against schema
      slideType.schema.parse(slide.content);

      const pptxSlide = pptx.addSlide({ masterName: 'LAYOUT_16x9' });
      await variant.render.pptx(slide.content, pptxSlide);
    }

    return pptx;
  }
} 