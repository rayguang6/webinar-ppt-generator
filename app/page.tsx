'use client';

import { useState } from 'react';
import WebinarForm from './components/WebinarForm';
import SlideViewer from './components/SlideViewer';
import { generateWebinarContent } from './lib/services/contentGenerator';
import { createPresentation } from './templates/webinarTemplate';
import { WebinarInput, Presentation } from './types/presentation';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [webinarTitle, setWebinarTitle] = useState('Perfect Webinar Template');

  const handleGenerateContent = async (input: WebinarInput) => {
    setIsLoading(true);
    
    try {
      // Generate content using our service with mock toggle
      const content = await generateWebinarContent(input);
      
      // Create presentation from the content
      const newPresentation = createPresentation(webinarTitle, content);
      
      // Update state
      setPresentation(newPresentation);
    } catch (error) {
      console.error('Error generating content:', error);
      alert('Failed to generate presentation content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPresentation(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">AI Webinar PPT Generator</h1>
          {presentation && (
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Start Over
            </button>
          )}
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {presentation ? (
          <SlideViewer presentation={presentation} onReset={handleReset} />
        ) : (
          <div>
            <div className="max-w-3xl mx-auto mb-10 text-center">
              <h2 className="text-2xl font-bold mb-3 text-gray-900">Create Your Perfect Webinar Presentation</h2>
              <p className="text-gray-700">
                Enter what you do and the results you help clients achieve. Our AI will generate a complete webinar 
                presentation following the Perfect Webinar format.
              </p>
            </div>
            <WebinarForm onSubmit={handleGenerateContent} isLoading={isLoading} />
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-white mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} AI Webinar PPT Generator
          </p>
        </div>
      </footer>
    </div>
  );
}
