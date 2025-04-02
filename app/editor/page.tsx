'use client';

import React from 'react';
import { SLIDE_TYPES, SLIDE_VARIANTS } from '../lib/constants/slides';
import { SlideGenerator } from '../lib/generators/slide-generator';
import { basicTemplate } from '../lib/templates/basic';
import type { WebinarContent } from '../lib/types/slide';

const DEFAULT_CONTENT: WebinarContent = {
  metadata: {
    title: "My Presentation",
    date: new Date().toISOString(),
    presenter: "Presenter Name"
  },
  slides: [
    {
      templateId: 'title-slide',
      content: {
        title: "My Presentation",
        subtitle: "Click to edit"
      }
    }
  ]
};

export default function EditorPage() {
  const [content, setContent] = React.useState<WebinarContent>(DEFAULT_CONTENT);
  const [slides, setSlides] = React.useState<React.ReactElement[][]>([]);

  // Generate preview whenever content changes
  React.useEffect(() => {
    const generator = new SlideGenerator(basicTemplate);
    generator.generateHTML(content).then(setSlides);
  }, [content]);

  // Add a new slide
  const addSlide = (typeId: string) => {
    const newSlide = {
      templateId: typeId,
      content: getDefaultContent(typeId)
    };
    
    setContent(prev => ({
      ...prev,
      slides: [...prev.slides, newSlide]
    }));
  };

  // Get default content for a slide type
  const getDefaultContent = (typeId: string) => {
    switch (typeId) {
      case 'title-slide':
        return {
          title: "New Title Slide",
          subtitle: "Click to edit",
          variant: 'center'
        };
      case 'bullet-points':
        return {
          title: "New Section",
          points: ["Point 1", "Point 2", "Point 3"],
          variant: 'vertical'
        };
      case 'key-benefits':
        return {
          benefits: [
            {
              icon: 'target',
              title: 'Benefit 1',
              description: 'Description here'
            },
            {
              icon: 'check',
              title: 'Benefit 2',
              description: 'Description here'
            }
          ],
          variant: 'grid'
        };
      default:
        return {};
    }
  };

  // Change slide variant
  const changeVariant = (slideIndex: number, variant: string) => {
    setContent(prev => ({
      ...prev,
      slides: prev.slides.map((slide, i) => 
        i === slideIndex 
          ? { ...slide, content: { ...slide.content, variant } }
          : slide
      )
    }));
  };

  const handleExport = async () => {
    try {
      const generator = new SlideGenerator(basicTemplate);
      const pptx = await generator.generatePPTX(content);
      await pptx.writeFile({ fileName: 'presentation.pptx' });
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 bg-white rounded-lg shadow-sm p-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Presentation Editor</h1>
            <p className="text-gray-500">Add and edit slides</p>
          </div>
          <button
            onClick={handleExport}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Export to PowerPoint
          </button>
        </div>

        {/* Add Slide Button */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SLIDE_TYPES.map(type => (
              <button
                key={type.id}
                onClick={() => addSlide(type.id)}
                className="p-4 border rounded-lg hover:bg-white hover:shadow-sm transition-all text-left"
              >
                <h3 className="font-medium mb-1">{type.name}</h3>
                <p className="text-sm text-gray-500">{type.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Slides Preview */}
        <div className="space-y-8">
          {slides.map((slideComponents, slideIndex) => {
            const currentSlide = content.slides[slideIndex];
            const slideType = currentSlide.templateId;
            const variants = SLIDE_VARIANTS[slideType as keyof typeof SLIDE_VARIANTS] || {};

            return (
              <div key={slideIndex} className="relative group">
                <div className="absolute -left-20 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => {
                      setContent(prev => ({
                        ...prev,
                        slides: prev.slides.filter((_, i) => i !== slideIndex)
                      }));
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    Delete
                  </button>
                </div>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-gray-50 px-6 py-3 border-b flex justify-between items-center">
                    <div className="text-sm text-gray-500">Slide {slideIndex + 1}</div>
                    <div className="flex gap-4">
                      {Object.values(variants).map(variant => (
                        <button
                          key={variant.id}
                          onClick={() => changeVariant(slideIndex, variant.id)}
                          className={`text-sm px-3 py-1 rounded ${
                            currentSlide.content.variant === variant.id
                              ? 'bg-blue-100 text-blue-700'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {variant.name}
                        </button>
                      ))}
                      <button 
                        className="text-sm text-blue-500 hover:text-blue-600"
                        onClick={() => {
                          // TODO: Add edit modal
                          console.log('Edit slide:', content.slides[slideIndex]);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  <div>
                    {slideComponents.map((component, componentIndex) => (
                      <div key={componentIndex}>
                        {component}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 