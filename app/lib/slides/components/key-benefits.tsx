import React from 'react';
import { z } from 'zod';
import type { SlideComponent } from '../../types/slide';
import type PptxGenJS from 'pptxgenjs';
import { SlideWrapper } from './slide-wrapper';
import { PPTX_COORDINATES } from '../../constants/dimensions';
import { ICON_MAP } from '../../icons';

// Schema for a single benefit
const benefitSchema = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string(),
});

// Schema for the key benefits component
export const keyBenefitsSchema = z.object({
  benefits: z.array(benefitSchema).min(1).max(4),
});

type KeyBenefitsProps = z.infer<typeof keyBenefitsSchema>;

// HTML Renderer
const KeyBenefitsSlideHTML = ({ benefits }: KeyBenefitsProps): React.ReactElement => {
  return (
    <SlideWrapper className="bg-white">
      <div className="flex items-center justify-center h-full p-[5%]">
        <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
          {benefits.map((benefit, index) => {
            const Icon = ICON_MAP[benefit.icon] || ICON_MAP.default;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-[2.5vh] font-semibold mb-2 text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-[1.8vh] text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </SlideWrapper>
  );
};

// PPTX Generator
const generateKeyBenefitsPPTX = async (props: KeyBenefitsProps, pptx: PptxGenJS) => {
  const slide = pptx.addSlide();
  
  // Calculate grid positions
  const positions = {
    2: [[25, 40], [75, 40]],  // 2 items
    3: [[25, 30], [75, 30], [50, 70]],  // 3 items
    4: [[25, 30], [75, 30], [25, 70], [75, 70]]  // 4 items
  };

  const pos = positions[props.benefits.length as 2 | 3 | 4] || positions[4];

  props.benefits.forEach((benefit, index) => {
    const [x, y] = pos[index];
    
    // Add icon circle
    slide.addShape('ellipse', {
      x: `${x - 5}%`,
      y: `${y - 5}%`,
      w: '10%',
      h: '10%',
      fill: { color: 'E5F5F0' },
    });

    // Add title
    slide.addText(benefit.title, {
      x: `${x - 15}%`,
      y: `${y + 7}%`,
      w: '30%',
      fontSize: 16,
      bold: true,
      align: 'center',
      color: '1a1a1a',
    });

    // Add description
    slide.addText(benefit.description, {
      x: `${x - 20}%`,
      y: `${y + 15}%`,
      w: '40%',
      fontSize: 12,
      align: 'center',
      color: '666666',
    });
  });
};

// Component Definition
export const KeyBenefitsComponent: SlideComponent = {
  type: 'keyBenefits',
  render: {
    html: KeyBenefitsSlideHTML,
    pptx: generateKeyBenefitsPPTX,
  },
  schema: keyBenefitsSchema,
}; 