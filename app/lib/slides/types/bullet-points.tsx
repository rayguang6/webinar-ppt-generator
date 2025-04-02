import React from 'react';
import { z } from 'zod';
import { defineSlide } from '../../types/slide';
import { SLIDE_DIMENSIONS, PPTX_COORDINATES } from '../../constants/dimensions';
import { SlideWrapper } from '../../components/SlideWrapper';

// Schema
const schema = z.object({
  title: z.string(),
  points: z.array(z.string()).min(1).max(6),
});

type BulletPointsContent = z.infer<typeof schema>;

// Vertical variant component
const VerticalLayout: React.FC<BulletPointsContent> = ({ title, points }) => (
  <SlideWrapper>
    <div className="h-full flex flex-col p-16">
      <h2 className="text-4xl font-bold mb-12 text-gray-900">{title}</h2>
      <ul className="space-y-6 flex-1">
        {points.map((point, index) => (
          <li key={index} className="flex items-start group">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4">
              {index + 1}
            </span>
            <span className="text-xl text-gray-700 leading-relaxed pt-1">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </SlideWrapper>
);

// Horizontal variant component
const HorizontalLayout: React.FC<BulletPointsContent> = ({ title, points }) => {
  if (points.length !== 3) {
    console.warn('Horizontal layout requires exactly 3 points. Consider using boxed layout for different numbers of points.');
    return <BoxedLayout title={title} points={points} />;
  }

  return (
    <SlideWrapper>
      <div className="h-full flex flex-col p-16">
        <h2 className="text-4xl font-bold mb-12 text-gray-900">{title}</h2>
        <div className="grid grid-cols-3 gap-8 flex-1">
          {points.map((point, index) => (
            <div 
              key={index} 
              className="p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-semibold">
                  {index + 1}
                </span>
              </div>
              <p className="text-xl text-gray-700">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
};

// Boxed variant component
const BoxedLayout: React.FC<BulletPointsContent> = ({ title, points }) => {
  const useWideLayout = points.length <= 4;
  const gridCols = useWideLayout ? "grid-cols-2" : "grid-cols-3";
  const itemClass = useWideLayout 
    ? "p-8 border-2 border-gray-200 rounded-xl hover:border-blue-200 transition-colors" 
    : "p-6 border-2 border-gray-200 rounded-xl hover:border-blue-200 transition-colors";

  return (
    <SlideWrapper>
      <div className="h-full flex flex-col p-16">
        <h2 className="text-4xl font-bold mb-12 text-gray-900">{title}</h2>
        <div className={`grid ${gridCols} gap-6 flex-1`}>
          {points.map((point, index) => (
            <div key={index} className={itemClass}>
              <div className="flex items-center mb-4">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-semibold">
                  {index + 1}
                </span>
              </div>
              <p className="text-xl text-gray-700">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
};

// PPTX rendering functions
const generateVerticalPPTX = async (content: BulletPointsContent, slide: any) => {
  // Add title
  slide.addText(content.title, {
    x: '10%',
    y: '10%',
    w: '80%',
    h: '10%',
    fontSize: 40,
    bold: true,
    color: '1a1a1a',
    align: 'left',
    valign: 'middle',
  });

  // Add points
  content.points.forEach((point, index) => {
    const yPos = 25 + (index * 12);
    
    // Add number circle
    slide.addShape('ellipse', {
      x: '10%',
      y: `${yPos}%`,
      w: '3%',
      h: '5%',
      fill: { color: 'EBF5FF' },
    });

    // Add number
    slide.addText((index + 1).toString(), {
      x: '10%',
      y: `${yPos}%`,
      w: '3%',
      h: '5%',
      fontSize: 14,
      color: '2563EB',
      align: 'center',
      valign: 'middle',
    });

    // Add point text
    slide.addText(point, {
      x: '15%',
      y: `${yPos}%`,
      w: '75%',
      h: '5%',
      fontSize: 24,
      color: '374151',
      valign: 'middle',
    });
  });
};

const generateHorizontalPPTX = async (content: BulletPointsContent, slide: any) => {
  // Add title
  slide.addText(content.title, {
    x: '10%',
    y: '10%',
    w: '80%',
    h: '10%',
    fontSize: 40,
    bold: true,
    color: '1a1a1a',
    align: 'left',
    valign: 'middle',
  });

  // Add points in a grid
  content.points.forEach((point, index) => {
    const col = index % 3;
    const xPos = 10 + (col * 28);
    const yPos = 25;  // Fixed position for single row

    // Add card background - taller cards
    slide.addShape('rect', {
      x: `${xPos}%`,
      y: `${yPos}%`,
      w: '25%',
      h: '60%',  // Much taller cards
      fill: { color: 'F9FAFB' },
      line: { color: 'E5E7EB', width: 1 },
      radius: 8,
    });

    // Add number circle - positioned at top
    slide.addShape('ellipse', {
      x: `${xPos + 2}%`,
      y: `${yPos + 2}%`,
      w: '4%',
      h: '7%',
      fill: { color: 'EBF5FF' },
    });

    // Add number
    slide.addText((index + 1).toString(), {
      x: `${xPos + 2}%`,
      y: `${yPos + 2}%`,
      w: '4%',
      h: '7%',
      fontSize: 14,
      color: '2563EB',
      align: 'center',
      valign: 'middle',
    });

    // Add point text - more space for text
    slide.addText(point, {
      x: `${xPos + 2}%`,
      y: `${yPos + 12}%`,
      w: '21%',
      h: '45%',  // More height for text
      fontSize: 18,  // Slightly larger font
      color: '374151',
      valign: 'top',
      wrap: true,
    });
  });
};

const generateBoxedPPTX = async (content: BulletPointsContent, slide: any) => {
  // Add title
  slide.addText(content.title, {
    x: '10%',
    y: '10%',
    w: '80%',
    h: '10%',
    fontSize: 40,
    bold: true,
    color: '1a1a1a',
    align: 'left',
    valign: 'middle',
  });

  // Dynamic layout calculations
  const useWideLayout = content.points.length <= 4;
  const cols = useWideLayout ? 2 : 3;
  const boxWidth = useWideLayout ? 38 : 25;
  const boxHeight = useWideLayout ? 30 : 25;
  const xSpacing = useWideLayout ? 42 : 28;
  const ySpacing = useWideLayout ? 35 : 30;
  const fontSize = useWideLayout ? 18 : 16;

  // Add points in a dynamic grid
  content.points.forEach((point, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const xPos = 10 + (col * xSpacing);
    const yPos = 25 + (row * ySpacing);

    // Add card background
    slide.addShape('rect', {
      x: `${xPos}%`,
      y: `${yPos}%`,
      w: `${boxWidth}%`,
      h: `${boxHeight}%`,
      fill: { color: 'F9FAFB' },
      line: { color: 'E5E7EB', width: 1 },
      radius: 8,
    });

    // Add number circle
    slide.addShape('ellipse', {
      x: `${xPos + 2}%`,
      y: `${yPos + 2}%`,
      w: '4%',
      h: '7%',
      fill: { color: 'EBF5FF' },
    });

    // Add number
    slide.addText((index + 1).toString(), {
      x: `${xPos + 2}%`,
      y: `${yPos + 2}%`,
      w: '4%',
      h: '7%',
      fontSize: 14,
      color: '2563EB',
      align: 'center',
      valign: 'middle',
    });

    // Add point text
    slide.addText(point, {
      x: `${xPos + 2}%`,
      y: `${yPos + 12}%`,
      w: `${boxWidth - 4}%`,
      h: `${boxHeight - 14}%`,
      fontSize: fontSize,
      color: '374151',
      valign: 'top',
      wrap: true,
    });
  });
};

// Define the slide with all its variants
export const BulletPointsSlide = defineSlide({
  id: 'bullet-points',
  name: 'Bullet Points',
  description: 'A slide with bullet points in different layouts',
  schema,
  variants: {
    vertical: {
      name: 'Vertical List',
      render: {
        html: (content) => <VerticalLayout {...content} />,
        pptx: generateVerticalPPTX,
      },
    },
    horizontal: {
      name: 'Horizontal Cards',
      render: {
        html: (content) => <HorizontalLayout {...content} />,
        pptx: generateHorizontalPPTX,
      },
    },
    boxed: {
      name: 'Boxed Grid',
      render: {
        html: (content) => <BoxedLayout {...content} />,
        pptx: generateBoxedPPTX,
      },
    },
  },
}); 