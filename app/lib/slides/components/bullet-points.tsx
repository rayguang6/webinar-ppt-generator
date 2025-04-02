import React from 'react';
import { z } from 'zod';
import type { SlideComponent } from '../../types/slide';
import type PptxGenJS from 'pptxgenjs';
import { SlideWrapper } from './slide-wrapper';
import { PPTX_COORDINATES } from '../../constants/dimensions';
import { SLIDE_VARIANTS } from '../../constants/slides';

// Schema for bullet points component
export const bulletPointsSchema = z.object({
  title: z.string(),
  points: z.array(z.string()).min(1).max(6),
  variant: z.enum(['vertical', 'horizontal', 'boxed']).default('vertical'),
});

type BulletPointsProps = z.infer<typeof bulletPointsSchema>;

// HTML Renderer
const BulletPointsSlideHTML = ({ title, points, variant }: BulletPointsProps): React.ReactElement => {
  const renderPoints = () => {
    switch (variant) {
      case 'horizontal':
        return (
          <div className="grid grid-cols-3 gap-6 mt-8">
            {points.map((point, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mb-4" />
                <p className="text-[2vh] text-gray-700 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        );

      case 'boxed':
        return (
          <div className="grid grid-cols-2 gap-6 mt-8">
            {points.map((point, index) => (
              <div key={index} className="border-2 border-gray-200 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-3" />
                  <span className="text-[2.2vh] font-medium text-gray-900">Point {index + 1}</span>
                </div>
                <p className="text-[2vh] text-gray-700 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        );

      default: // vertical
        return (
          <ul className="space-y-4 mt-8">
            {points.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 mt-[1.5vh] rounded-full bg-emerald-500 mr-4 flex-shrink-0" />
                <span className="text-[2.5vh] text-gray-700 leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        );
    }
  };

  return (
    <SlideWrapper className="bg-white">
      <div className="flex flex-col h-full p-[5%]">
        <h2 className="text-[4vh] font-semibold text-gray-900">{title}</h2>
        {renderPoints()}
      </div>
    </SlideWrapper>
  );
};

// PPTX Generator
const generateBulletPointsPPTX = async (props: BulletPointsProps, pptx: PptxGenJS) => {
  const slide = pptx.addSlide();
  
  // Add title
  slide.addText(props.title, {
    x: PPTX_COORDINATES.defaultMargin,
    y: '10%',
    w: PPTX_COORDINATES.contentWidth,
    fontSize: 32,
    bold: true,
    color: '1a1a1a',
  });

  // Layout-specific rendering
  switch (props.variant) {
    case 'horizontal':
      props.points.forEach((point, index) => {
        const x = 10 + (index * 30);
        slide.addShape('rectangle', {
          x: `${x}%`,
          y: '30%',
          w: '25%',
          h: '30%',
          fill: { color: 'F9FAFB' },
        });
        slide.addText(point, {
          x: `${x + 2}%`,
          y: '35%',
          w: '21%',
          fontSize: 16,
          color: '333333',
        });
      });
      break;

    case 'boxed':
      props.points.forEach((point, index) => {
        const row = Math.floor(index / 2);
        const col = index % 2;
        const x = 10 + (col * 45);
        const y = 30 + (row * 25);

        slide.addShape('rectangle', {
          x: `${x}%`,
          y: `${y}%`,
          w: '40%',
          h: '20%',
          fill: { color: 'FFFFFF' },
          line: { color: 'E5E7EB', width: 2 },
        });
        slide.addText(`Point ${index + 1}`, {
          x: `${x + 2}%`,
          y: `${y + 2}%`,
          w: '36%',
          fontSize: 14,
          bold: true,
          color: '1a1a1a',
        });
        slide.addText(point, {
          x: `${x + 2}%`,
          y: `${y + 8}%`,
          w: '36%',
          fontSize: 12,
          color: '333333',
        });
      });
      break;

    default: // vertical
      props.points.forEach((point, index) => {
        slide.addText(point, {
          x: '10%',
          y: `${30 + (index * 10)}%`,
          w: '80%',
          fontSize: 18,
          bullet: { type: 'number' },
          color: '333333',
        });
      });
  }
};

// Component Definition
export const BulletPointsComponent: SlideComponent = {
  type: 'bullets',
  render: {
    html: BulletPointsSlideHTML,
    pptx: generateBulletPointsPPTX,
  },
  schema: bulletPointsSchema,
}; 