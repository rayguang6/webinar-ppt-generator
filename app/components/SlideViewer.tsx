'use client';

import { Presentation, Slide } from '../types/presentation';

interface SlideViewerProps {
  presentation: Presentation;
  onReset: () => void;
}

export default function SlideViewer({ presentation, onReset }: SlideViewerProps) {
  return (
    <div className="max-w-4xl mx-auto pb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{presentation.title}</h2>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
        >
          Create New Presentation
        </button>
      </div>
      
      {/* All slides shown vertically */}
      <div className="space-y-8">
        {presentation.slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
          >
            <div className="bg-blue-50 px-4 py-2 border-b border-blue-100">
              <span className="text-blue-800 font-medium">Slide {index + 1}</span>
            </div>
            <div className="p-8">
              <RenderSlide slide={slide} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper component to render different slide types
function RenderSlide({ slide }: { slide: Slide }) {
  switch (slide.type) {
    case 'title':
      return (
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">{slide.title}</h1>
          <p className="text-xl text-gray-800">{slide.content as string}</p>
        </div>
      );
      
    case 'text':
      return (
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{slide.title}</h2>
          <p className="text-xl text-gray-800">{slide.content as string}</p>
        </div>
      );
      
    case 'bullets':
      return (
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{slide.title}</h2>
          <ul className="list-disc pl-8 space-y-3">
            {Array.isArray(slide.content) && slide.content.map((item, index) => (
              <li key={index} className="text-xl text-gray-800">{item}</li>
            ))}
          </ul>
        </div>
      );
      
    default:
      return (
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">{slide.title}</h2>
          <p className="text-xl text-gray-800">Unknown slide type</p>
        </div>
      );
  }
} 