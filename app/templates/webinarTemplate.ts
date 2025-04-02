import { v4 as uuidv4 } from 'uuid';
import { Presentation, Slide, WebinarContent, IconContent } from '../types/presentation';

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
    
    // Main outcome slide with icon layout
    {
      id: uuidv4(),
      title: "Key Benefits",
      content: [
        {
          icon: 'target',
          title: 'Clear Outcome',
          description: content.mainOutcome
        },
        {
          icon: 'trending',
          title: 'Proven Results',
          description: 'Transform your approach with proven strategies'
        },
        {
          icon: 'award',
          title: 'Expert Guidance',
          description: 'Learn from real-world experience'
        },
        {
          icon: 'check',
          title: 'Actionable Steps',
          description: 'Get clear, implementable action items'
        }
      ],
      type: 'hexagon-icons'
    },
    
    // Differentiation slide with numbered list
    {
      id: uuidv4(),
      title: "Why This Webinar Is Different",
      content: content.differentReasons,
      type: 'numbered-list'
    },
    
    // Target audience slide
    {
      id: uuidv4(),
      title: "Who Is This For?",
      content: content.targetAudience,
      type: 'text'
    },
    
    // Pain points slide with steps
    {
      id: uuidv4(),
      title: "Common Challenges We'll Address",
      content: content.painPoints,
      type: 'steps'
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