import { Presentation, Slide, IconContent } from '../../types/presentation';
import pptxgen from 'pptxgenjs';

export async function exportToPPTX(presentation: Presentation) {
  // Create a new instance
  const pptx = new pptxgen();
  
  // Set global presentation properties
  pptx.layout = 'LAYOUT_16x9';
  pptx.title = presentation.title;
  
  // Convert each slide
  for (const slide of presentation.slides) {
    await addSlide(pptx, slide);
  }
  
  // Save the file
  return pptx.writeFile({ 
    fileName: `${presentation.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pptx` 
  });
}

async function addSlide(pptx: pptxgen, slideData: Slide) {
  const slide = pptx.addSlide();
  
  // Common slide properties
  const MARGINS = { x: 0.5, y: 0.5 }; // in inches
  const COLORS = {
    primary: '0088CC',
    secondary: '666666',
    accent: '9900CC',
    text: '333333',
    light: 'FFFFFF'
  };

  // Add title to all slides
  slide.addText(slideData.title, {
    x: MARGINS.x,
    y: slideData.type === 'title' ? '30%' : MARGINS.y,
    w: '95%',
    h: 1,
    fontSize: slideData.type === 'title' ? 48 : 36,
    color: COLORS.primary,
    bold: true,
    align: slideData.type === 'title' ? 'center' : 'left'
  });

  // Handle content based on slide type
  switch (slideData.type) {
    case 'title':
      if (typeof slideData.content === 'string') {
        slide.addText(slideData.content, {
          x: MARGINS.x,
          y: '50%',
          w: '95%',
          h: 1,
          fontSize: 28,
          color: COLORS.secondary,
          align: 'center'
        });
      }
      break;

    case 'text':
      if (typeof slideData.content === 'string') {
        slide.addText(slideData.content, {
          x: MARGINS.x,
          y: MARGINS.y + 1.2,
          w: '95%',
          h: 4,
          fontSize: 24,
          color: COLORS.text,
          align: 'left'
        });
      }
      break;

    case 'bullets':
      if (Array.isArray(slideData.content)) {
        slideData.content.forEach((point, index) => {
          if (typeof point === 'string') {
            slide.addText(point, {
              x: MARGINS.x + 0.5,
              y: MARGINS.y + 1.2 + (index * 0.8),
              w: '90%',
              h: 0.8,
              fontSize: 24,
              color: COLORS.text,
              bullet: true
            });
          }
        });
      }
      break;

    case 'numbered-list':
      if (Array.isArray(slideData.content)) {
        slideData.content.forEach((item, index) => {
          if (typeof item === 'string') {
            slide.addText(`${index + 1}. ${item}`, {
              x: MARGINS.x,
              y: MARGINS.y + 1.2 + (index * 0.8),
              w: '95%',
              h: 0.8,
              fontSize: 24,
              color: COLORS.text
            });
          }
        });
      }
      break;

    case 'hexagon-icons':
      if (Array.isArray(slideData.content)) {
        const content = slideData.content as IconContent[];
        const itemsPerRow = 4;
        const itemWidth = 3; // inches
        const itemHeight = 2.5; // inches
        const startY = 2; // inches from top

        content.forEach((item, index) => {
          const row = Math.floor(index / itemsPerRow);
          const col = index % itemsPerRow;
          const x = MARGINS.x + (col * (itemWidth + 0.5));
          const y = startY + (row * (itemHeight + 0.5));

          // Create hexagon using multiple shapes
          const size = 1; // size in inches
          
          // Background rectangle
          slide.addShape('rect', {
            x,
            y,
            w: size,
            h: size,
            fill: { color: COLORS.primary + '33' },
            line: { color: COLORS.primary, width: 2 }
          });

          // Add title
          slide.addText(item.title, {
            x,
            y: y + 1.5,
            w: itemWidth,
            h: 0.5,
            fontSize: 16,
            color: COLORS.primary,
            bold: true,
            align: 'center'
          });

          // Add description
          slide.addText(item.description, {
            x,
            y: y + 2,
            w: itemWidth,
            h: 1,
            fontSize: 12,
            color: COLORS.text,
            align: 'center'
          });
        });
      }
      break;

    case 'steps':
      if (Array.isArray(slideData.content)) {
        slideData.content.forEach((step, index) => {
          if (typeof step === 'string') {
            const yPos = MARGINS.y + 1.5 + (index * 1.2);
            
            // Add step number with circle
            slide.addShape('ellipse', {
              x: MARGINS.x,
              y: yPos,
              w: 0.5,
              h: 0.5,
              fill: { color: COLORS.primary }
            });

            slide.addText((index + 1).toString(), {
              x: MARGINS.x,
              y: yPos,
              w: 0.5,
              h: 0.5,
              fontSize: 16,
              color: COLORS.light,
              align: 'center',
              valign: 'middle'
            });

            // Add step content
            slide.addText(step, {
              x: MARGINS.x + 0.7,
              y: yPos,
              w: '90%',
              h: 1,
              fontSize: 24,
              color: COLORS.text
            });
          }
        });
      }
      break;
  }
} 