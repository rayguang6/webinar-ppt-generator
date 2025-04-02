/**
 * Input collected from the user
 */
export interface WebinarInput {
  whatIDo: string;
  resultsIBring: string;
}

/**
 * Generated content for the webinar
 */
export interface WebinarContent {
  mainOutcome: string;
  differentReasons: string[];
  targetAudience: string;
  painPoints: string[];
  secrets: string[];
}

/**
 * Content with icon
 */
export interface IconContent {
  icon: string;
  title: string;
  description: string;
}

/**
 * Available slide types
 */
export type SlideType = 
  | 'cover'        // Main title slide
  | 'section'      // Section divider slide
  | 'content'      // Regular content slide
  | 'bullets'      // Bullet points
  | 'steps'        // Numbered steps
  | 'grid'         // Grid layout with icons
  | 'comparison'   // Side by side comparison
  | 'quote';       // Featured quote or highlight

/**
 * Theme configuration
 */
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

/**
 * Individual slide structure
 */
export interface Slide {
  id: string;
  type: SlideType;
  title: string;
  subtitle?: string;
  content: string | string[] | IconContent[];
  layout?: 'left' | 'right' | 'center' | 'split';
  theme?: Partial<Theme>;
  background?: {
    color?: string;
    gradient?: string;
    pattern?: string;
  };
}

/**
 * Complete presentation structure
 */
export interface Presentation {
  title: string;
  slides: Slide[];
  theme: Theme;
} 