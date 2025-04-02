import { v4 as uuidv4 } from 'uuid';
import { Presentation, Slide, WebinarContent } from '../types/presentation';

/**
 * Convert generated webinar content into a complete presentation with slides
 */
export function createPresentation(webinarTitle: string, content: WebinarContent): Presentation {
  const slides: Slide[] = [
    // Title slide
    {
      id: uuidv4(),
      title: webinarTitle,
      content: "Welcome to the webinar",
      type: 'title'
    },
    
    // Main outcome slide
    {
      id: uuidv4(),
      title: "Today's Main Outcome",
      content: content.mainOutcome,
      type: 'text'
    },
    
    // Differentiation slide
    {
      id: uuidv4(),
      title: "3 Reasons Why This Webinar Is Different",
      content: content.differentReasons,
      type: 'bullets'
    },
    
    // Target audience slide
    {
      id: uuidv4(),
      title: "Who Is This For?",
      content: content.targetAudience,
      type: 'text'
    },
    
    // Pain points slide
    {
      id: uuidv4(),
      title: "Why You Are Here: Pain Points",
      content: content.painPoints,
      type: 'bullets'
    },
    
    // Secrets slide
    {
      id: uuidv4(),
      title: "3 Secrets You Are Going To Discover",
      content: content.secrets,
      type: 'bullets'
    }
  ];
  
  return {
    title: webinarTitle,
    slides
  };
} 