'use client';

import React from 'react';
import { SlideGenerator } from '../lib/slides/generator';
import { BulletPointsSlide } from '../lib/slides/types/bullet-points';
import { registry } from '../lib/slides/registry';
import type { Presentation } from '../lib/types/slide';

// Register slides
registry.register(BulletPointsSlide);

// Test content
const content: Presentation = {
  metadata: {
    title: "Test Presentation",
    date: new Date().toISOString(),
    presenter: "Test User"
  },
  slides: [
    {
      type: 'bullet-points',
      variant: 'vertical',
      content: {
        title: 'Key Features',
        points: [
          'Responsive design with mobile-first approach',
          'Built with modern React and TypeScript',
          'Comprehensive component library',
          'Automated testing and CI/CD pipeline',
        ],
      },
    },
    {
      type: 'bullet-points',
      variant: 'boxed',
      content: {
        title: 'Three Column Layout',
        points: [
          'Research and Analysis',
          'Strategy Development',
          'Implementation',
          'Monitoring and Evaluation',
          'Monitoring and Evaluation',
          'Monitoring and Evaluation',
        ],
      },
    },
    {
      type: 'bullet-points',
      variant: 'horizontal',
      content: {
        title: 'Three Column Layout',
        points: [
          'Research and Analysis',
          'Strategy Development',
          'Implementation',
        ],
      },
    },
    {
      type: 'bullet-points',
      variant: 'boxed',
      content: {
        title: 'Why Choose Us',
        points: [
          'Over 10 years of experience',
          'Dedicated support team',
          'Industry-leading solutions',
          'Competitive pricing',
        ],
      },
    },
  ],
};

export default function TestPage() {
  const [slides, setSlides] = React.useState<React.ReactElement[]>([]);

  React.useEffect(() => {
    const loadSlides = async () => {
      const generator = new SlideGenerator();
      const generatedSlides = await generator.generateHTML(content);
      setSlides(generatedSlides);
    };

    loadSlides();
  }, []);

  const handleExport = async () => {
    try {
      const generator = new SlideGenerator();
      const pptx = await generator.generatePPTX(content);
      await pptx.writeFile({ fileName: 'test-presentation.pptx' });
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Presentation Preview
          </h1>
          <button
            onClick={handleExport}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Export to PowerPoint
          </button>
        </div>
        <div className="space-y-8">
          {slides.map((slide, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {slide}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 