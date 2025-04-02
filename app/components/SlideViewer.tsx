'use client';

import { Presentation, Slide, IconContent } from '../types/presentation';
import { IconType } from 'react-icons';
import { 
  FiTarget, 
  FiSettings, 
  FiTrendingUp, 
  FiBriefcase,
  FiAward,
  FiUsers,
  FiCheckCircle,
  FiFlag,
  FiDownload
} from 'react-icons/fi';
import { exportToPPTX } from '../lib/services/pptxExporter';
import { ReactNode } from 'react';

const ICON_MAP: { [key: string]: IconType } = {
  target: FiTarget,
  settings: FiSettings,
  trending: FiTrendingUp,
  briefcase: FiBriefcase,
  award: FiAward,
  users: FiUsers,
  check: FiCheckCircle,
  flag: FiFlag,
};

interface SlideViewerProps {
  presentation: Presentation;
  onReset: () => void;
}

// Helper function to render content based on type
function renderContent(content: string | string[] | IconContent[]): ReactNode {
  if (typeof content === 'string') {
    return <p>{content}</p>;
  }
  
  if (!Array.isArray(content)) {
    return null;
  }
  
  // Check if it's an array of IconContent
  if (content.length > 0 && typeof content[0] === 'object' && 'icon' in content[0]) {
    const iconContent = content as IconContent[];
    return (
      <div className="grid grid-cols-4 gap-8">
        {iconContent.map((item, index) => {
          const Icon = ICON_MAP[item.icon] || FiTarget;
          return (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-teal-100 group-hover:bg-teal-200 transition-colors duration-300 transform rotate-45 rounded-2xl flex items-center justify-center">
                  <div className="-rotate-45 text-3xl text-teal-600">
                    <Icon size={32} />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          );
        })}
      </div>
    );
  }
  
  // It's a string array
  const stringContent = content as string[];
  return (
    <div className="space-y-4">
      {stringContent.map((item, index) => (
        <div key={index} className="flex items-start space-x-4">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold">
            {index + 1}
          </span>
          <span className="text-xl text-gray-700 leading-relaxed pt-1">{item}</span>
        </div>
      ))}
    </div>
  );
}

export default function SlideViewer({ presentation, onReset }: SlideViewerProps) {
  const handleExport = async () => {
    try {
      await exportToPPTX(presentation);
    } catch (error) {
      console.error('Error exporting presentation:', error);
      alert('Failed to export presentation. Please try again.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{presentation.title}</h2>
        <div className="flex gap-4">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2"
          >
            <FiDownload className="w-4 h-4" />
            Export to PowerPoint
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
          >
            Create New Presentation
          </button>
        </div>
      </div>
      
      {/* All slides shown vertically */}
      <div className="space-y-8">
        {presentation.slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 aspect-[16/9]"
          >
            <div className="bg-blue-50 px-4 py-2 border-b border-blue-100">
              <span className="text-blue-800 font-medium">Slide {index + 1}</span>
            </div>
            <div className="p-8 h-full">
              <div className="mb-4">
                <h2 className="text-3xl font-bold text-gray-900">{slide.title}</h2>
              </div>
              <div className="text-xl text-gray-700">
                {renderContent(slide.content)}
              </div>
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
        <div className="flex flex-col justify-center items-center h-full text-center py-8 bg-gradient-to-br from-blue-50 to-white">
          <h1 className="text-5xl font-bold mb-6 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            {slide.title}
          </h1>
          <p className="text-2xl text-gray-700 max-w-2xl">{slide.content as string}</p>
        </div>
      );
      
    case 'text':
      return (
        <div className="flex flex-col h-full justify-center max-w-4xl mx-auto">
          <div className="bg-blue-50 w-24 h-2 mb-6 rounded-full" />
          <h2 className="text-4xl font-bold mb-8 text-gray-900">{slide.title}</h2>
          <p className="text-xl leading-relaxed text-gray-700">{slide.content as string}</p>
        </div>
      );

    case 'hexagon-icons':
      return (
        <div className="flex flex-col h-full justify-center max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">{slide.title}</h2>
          <div className="grid grid-cols-4 gap-8">
            {(slide.content as IconContent[]).map((item, index) => {
              const Icon = ICON_MAP[item.icon] || FiTarget;
              return (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className="relative mb-6">
                    {/* Hexagon shape */}
                    <div className="w-24 h-24 bg-teal-100 group-hover:bg-teal-200 transition-colors duration-300 transform rotate-45 rounded-2xl flex items-center justify-center">
                      <div className="-rotate-45 text-3xl text-teal-600">
                        <Icon size={32} />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      );

    case 'numbered-list':
      return (
        <div className="flex flex-col h-full justify-center max-w-5xl mx-auto">
          <div className="flex items-center mb-12">
            <div className="flex-1 h-1 bg-gradient-to-r from-blue-200 to-blue-500" />
            <h2 className="text-4xl font-bold px-8 text-gray-900">{slide.title}</h2>
            <div className="flex-1 h-1 bg-gradient-to-l from-blue-200 to-blue-500" />
          </div>
          <div className="grid grid-cols-1 gap-6">
            {(slide.content as string[]).map((item, index) => (
              <div key={index} className="flex items-start group hover:bg-blue-50 p-4 rounded-lg transition-colors">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-xl mr-6 group-hover:bg-blue-600 transition-colors">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <div className="flex-1">
                  <p className="text-xl text-gray-700 leading-relaxed">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'steps':
      return (
        <div className="flex flex-col h-full justify-center max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">{slide.title}</h2>
          <div className="relative">
            <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-blue-200" />
            <div className="space-y-8">
              {(slide.content as string[]).map((item, index) => (
                <div key={index} className="flex items-center group">
                  <div className="relative z-10 flex-shrink-0 w-24 h-24 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center mr-8 group-hover:bg-blue-50 transition-colors">
                    <span className="text-2xl font-bold text-blue-500">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
                    <p className="text-xl text-gray-700">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
      
    case 'bullets':
      return (
        <div className="flex flex-col h-full justify-center max-w-4xl mx-auto">
          <div className="bg-purple-50 w-24 h-2 mb-6 rounded-full" />
          <h2 className="text-4xl font-bold mb-8 text-gray-900">{slide.title}</h2>
          <ul className="space-y-4">
            {Array.isArray(slide.content) && slide.content.map((item, index) => (
              <li key={index} className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold">
                  {index + 1}
                </span>
                <span className="text-xl text-gray-700 leading-relaxed pt-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
      
    default:
      return (
        <div className="flex flex-col h-full justify-center items-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">{slide.title}</h2>
          <p className="text-xl text-gray-700">Unknown slide type</p>
        </div>
      );
  }
} 