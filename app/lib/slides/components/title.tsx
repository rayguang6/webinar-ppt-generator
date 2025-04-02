import React from 'react';
import { z } from 'zod';
import type { SlideComponent } from '../../types/slide';
import type PptxGenJS from 'pptxgenjs';
import { PPTX_COORDINATES } from '../../constants/dimensions';
import { SlideWrapper } from './slide-wrapper';

// Schema for title component
export const titleSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
});

type TitleProps = z.infer<typeof titleSchema>;

// HTML Renderer
const TitleSlideHTML = ({ title, subtitle }: TitleProps): React.ReactElement => {
  return (
    <SlideWrapper className="bg-white">
      <div className="flex flex-col items-center justify-center h-full p-[5%] text-center">
        <h1 
          className="text-[5vh] font-bold mb-[2vh] text-gray-900 w-[90%] mx-auto"
          style={{ lineHeight: 1.2 }}
        >
          {title}
        </h1>
        {subtitle && (
          <h2 
            className="text-[3vh] text-gray-600 w-[90%] mx-auto"
            style={{ lineHeight: 1.3 }}
          >
            {subtitle}
          </h2>
        )}
      </div>
    </SlideWrapper>
  );
};

// PPTX Generator
const generateTitleSlidePPTX = async (props: TitleProps, pptx: PptxGenJS) => {
  const slide = pptx.addSlide();
  
  slide.addText(props.title, {
    x: PPTX_COORDINATES.defaultMargin,
    y: PPTX_COORDINATES.titleY,
    w: PPTX_COORDINATES.contentWidth,
    fontSize: 44,
    bold: true,
    align: 'center',
    color: '1a1a1a',
  });

  if (props.subtitle) {
    slide.addText(props.subtitle, {
      x: PPTX_COORDINATES.defaultMargin,
      y: PPTX_COORDINATES.subtitleY,
      w: PPTX_COORDINATES.contentWidth,
      fontSize: 24,
      color: '666666',
      align: 'center',
    });
  }
};

// Component Definition
export const TitleComponent: SlideComponent = {
  type: 'title',
  render: {
    html: TitleSlideHTML,
    pptx: generateTitleSlidePPTX,
  },
  schema: titleSchema,
}; 