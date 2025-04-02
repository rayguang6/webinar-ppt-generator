import { WebinarInput, WebinarContent } from '../../types/presentation';

// ========================================
// SIMPLE TOGGLE: Set to true to use LLM, false to use mock content
// ========================================
export const USE_REAL_LLM = false;
// ========================================

/**
 * Generate webinar content based on user input
 */
export async function generateWebinarContent(
  input: WebinarInput,
  forceMock: boolean = false
): Promise<WebinarContent> {
  try {
    // Use mock content if toggle is off or forceMock is true
    if (!USE_REAL_LLM || forceMock) {
      return generateMockContent(input);
    }

    // Generate real content with LLM
    const content = await generateContentWithLLM(input);
    return content;
  } catch (error) {
    console.error('Error generating webinar content:', error);
    // Fall back to mock content if an error occurs
    return generateMockContent(input);
  }
}

/**
 * Generate mock webinar content (no API call)
 */
export async function generateMockContent(input: WebinarInput): Promise<WebinarContent> {
  // Mock delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    mainOutcome: `Learn how to ${input.whatIDo} and ${input.resultsIBring} (mock)`,
    
    differentReasons: [
      `You'll discover practical strategies to ${input.whatIDo} more effectively`,
      `Actionable insights to help you ${input.resultsIBring} faster than ever before`,
      `Simple framework that anyone can implement, regardless of experience level`
    ],
    
    targetAudience: `This webinar is for anyone looking to ${input.resultsIBring} through ${input.whatIDo}`,
    
    painPoints: [
      `Struggling to find effective methods for ${input.whatIDo}`,
      `Not seeing desired results despite your efforts`,
      `Wasting time and resources on approaches that don't work`
    ],
    
    secrets: [
      `The #1 mistake people make when trying to ${input.whatIDo} and how to avoid it`,
      `A proven 3-step system to ${input.resultsIBring} within weeks`,
      `How to leverage automation to scale your results with minimal effort`
    ]
  };
}

/**
 * Generate webinar content using Deepseek API
 */
async function generateContentWithLLM(
  input: WebinarInput
): Promise<WebinarContent> {
  try {
    // Call our API route instead of Deepseek directly
    const response = await fetch('/api/generate-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to generate content with LLM');
    }

    const contentData = await response.json();
    
    // Validate the content structure
    const validatedContent = validateWebinarContent(contentData);
    return validatedContent;
  } catch (error) {
    console.error('Error generating content with LLM:', error);
    throw error;
  }
}

/**
 * Validate the response from the LLM has the expected structure
 */
function validateWebinarContent(content: any): WebinarContent {
  // Ensure all required fields are present
  const validatedContent: WebinarContent = {
    mainOutcome: content.mainOutcome || 'Default Main Outcome',
    differentReasons: Array.isArray(content.differentReasons) && content.differentReasons.length === 3
      ? content.differentReasons
      : ['Reason 1', 'Reason 2', 'Reason 3'],
    targetAudience: content.targetAudience || 'Default Target Audience',
    painPoints: Array.isArray(content.painPoints) && content.painPoints.length === 3
      ? content.painPoints
      : ['Pain Point 1', 'Pain Point 2', 'Pain Point 3'],
    secrets: Array.isArray(content.secrets) && content.secrets.length === 3
      ? content.secrets
      : ['Secret 1', 'Secret 2', 'Secret 3'],
  };
  
  return validatedContent;
} 