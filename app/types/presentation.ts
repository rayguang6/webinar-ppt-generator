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
 * Individual slide structure
 */
export interface Slide {
  id: string;
  title: string;
  content: string | string[];
  type: 'title' | 'text' | 'bullets';
}

/**
 * Complete presentation structure
 */
export interface Presentation {
  title: string;
  slides: Slide[];
} 