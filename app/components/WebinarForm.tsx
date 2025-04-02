'use client';

import { useState } from 'react';
import { WebinarInput } from '../types/presentation';

// Example inputs to help users get started
const EXAMPLES = [
  {
    label: "AI Automation",
    data: {
      whatIDo: "build AI automation agents",
      resultsIBring: "save 20+ hours per week on repetitive tasks"
    }
  },
  {
    label: "Digital Marketing",
    data: {
      whatIDo: "implement performance marketing strategies",
      resultsIBring: "double your conversion rates in 30 days"
    }
  },
  {
    label: "Personal Finance",
    data: {
      whatIDo: "create passive income streams",
      resultsIBring: "achieve financial freedom within 5 years"
    }
  }
];

interface WebinarFormProps {
  onSubmit: (input: WebinarInput) => void;
  isLoading: boolean;
}

export default function WebinarForm({ onSubmit, isLoading }: WebinarFormProps) {
  const [formData, setFormData] = useState<WebinarInput>({
    whatIDo: '',
    resultsIBring: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Function to fill form with example data
  const fillWithExample = (example: WebinarInput) => {
    setFormData(example);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Create Your Webinar Presentation</h2>
      
      {/* Examples section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Try an example:</h3>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((example, index) => (
            <button
              key={index}
              onClick={() => fillWithExample(example.data)}
              className="px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="whatIDo" className="block text-sm font-medium text-gray-800 mb-1">
            What I Do (e.g., "AI agent automation")
          </label>
          <textarea
            id="whatIDo"
            name="whatIDo"
            value={formData.whatIDo}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            rows={3}
            required
          />
        </div>
        
        <div>
          <label htmlFor="resultsIBring" className="block text-sm font-medium text-gray-800 mb-1">
            Results I Bring (e.g., "earn extra income")
          </label>
          <textarea
            id="resultsIBring"
            name="resultsIBring"
            value={formData.resultsIBring}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            rows={3}
            required
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 text-lg font-medium rounded-md transition-colors ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
            }`}
          >
            {isLoading ? 'Generating...' : 'Generate Presentation'}
          </button>
        </div>
      </form>
    </div>
  );
} 