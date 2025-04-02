import PptxGenJS from 'pptxgenjs';
import type { WebinarContent, SlideTemplate } from '../types/slide';
import { getComponent } from '../slides/components';

export class SlideGenerator {
  private templates: Record<string, SlideTemplate>;

  constructor(templates: SlideTemplate[]) {
    this.templates = templates.reduce((acc, template) => {
      acc[template.id] = template;
      return acc;
    }, {} as Record<string, SlideTemplate>);
  }

  async generateHTML(content: WebinarContent) {
    return content.slides.map(slide => {
      const template = this.templates[slide.templateId];
      if (!template) {
        throw new Error(`Template not found: ${slide.templateId}`);
      }

      return template.components.map(componentType => {
        const component = getComponent(componentType);
        return component.render.html(slide.content);
      });
    });
  }

  async generatePPTX(content: WebinarContent): Promise<PptxGenJS> {
    const pptx = new PptxGenJS();
    
    // Set presentation metadata
    pptx.author = content.metadata.presenter;
    pptx.title = content.metadata.title;
    
    // Generate each slide
    for (const slide of content.slides) {
      const template = this.templates[slide.templateId];
      if (!template) {
        throw new Error(`Template not found: ${slide.templateId}`);
      }

      for (const componentType of template.components) {
        const component = getComponent(componentType);
        await component.render.pptx(slide.content, pptx);
      }
    }
    
    return pptx;
  }
} 