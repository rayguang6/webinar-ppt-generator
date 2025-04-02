import { Theme } from '../types/presentation';

export const defaultTheme: Theme = {
  colors: {
    primary: '#2563eb',    // Blue 600
    secondary: '#4f46e5',  // Indigo 600
    accent: '#7c3aed',     // Violet 600
    background: '#ffffff',
    text: '#1f2937',       // Gray 800
  },
  fonts: {
    heading: 'var(--font-geist-sans)',
    body: 'var(--font-geist-sans)',
  },
};

export const gradients = {
  primary: 'bg-gradient-to-br from-blue-500 to-indigo-600',
  secondary: 'bg-gradient-to-br from-indigo-500 to-violet-600',
  accent: 'bg-gradient-to-br from-violet-500 to-purple-600',
};

export const patterns = {
  dots: 'bg-dots',
  grid: 'bg-grid',
  waves: 'bg-waves',
};

// Slide-specific theme variations
export const slideThemes: Record<string, Partial<Theme>> = {
  cover: {
    colors: {
      background: '#1e1b4b', // Indigo 950
      text: '#ffffff',
    },
  },
  section: {
    colors: {
      background: '#1e293b', // Slate 800
      text: '#ffffff',
    },
  },
  quote: {
    colors: {
      background: '#f8fafc', // Slate 50
      text: '#0f172a',      // Slate 900
      accent: '#0ea5e9',    // Sky 500
    },
  },
}; 