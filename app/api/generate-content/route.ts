import { NextResponse } from 'next/server';
import { WebinarInput, WebinarContent } from '../../types/presentation';

export async function POST(request: Request) {
  try {
    // Parse request body
    const input: WebinarInput = await request.json();
    
    // Get API key from environment variables (server-side)
    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
    
    if (!DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { message: 'Deepseek API key is not configured in environment variables' },
        { status: 500 }
      );
    }
    
    // Simple language detection for debug logging
    const hasChineseChars = /[\u4e00-\u9fff]/.test(input.whatIDo) || /[\u4e00-\u9fff]/.test(input.resultsIBring);
    console.log('Input contains Chinese characters:', hasChineseChars);
    
    // Create a prompt that instructs the LLM to detect and respond in the same language
    const prompt = `
IMPORTANT: First, analyze the language of this input: "${input.whatIDo}" and "${input.resultsIBring}".
- If the input contains ANY Chinese characters, respond ENTIRELY in Chinese.
- If the input is in English, respond in English.

${hasChineseChars ? '请注意：输入文本包含中文，因此你必须用中文回复！' : ''}

Create content for a "Perfect Webinar" presentation about: ${input.whatIDo} that helps people ${input.resultsIBring}.

Please generate content for the following sections of the webinar:

1. The main outcome of the webinar (a single compelling sentence)
2. Three reasons why this webinar is different from others (three bullet points)
3. Who this webinar is for (a single compelling sentence)
4. Three pain points of the audience (three bullet points)
5. Three secrets the audience will discover (three bullet points)

Format your response as a valid JSON object with these keys:
- mainOutcome: string
- differentReasons: array of 3 strings
- targetAudience: string
- painPoints: array of 3 strings
- secrets: array of 3 strings

Do not include any explanations or text outside of the JSON object.
`;
    
    // Call Deepseek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: hasChineseChars 
              ? '你是一名专业的文案撰写人，专门从事网络研讨会内容创作。请务必使用中文回复。' 
              : 'You are a professional copywriter specializing in webinar content. Detect the language of the input and respond in the same language.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' }
      })
    });

    // Handle error response from Deepseek
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: `Deepseek API error: ${errorData.error?.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

    // Parse response
    const data = await response.json();
    const contentString = data.choices[0]?.message?.content;
    
    if (!contentString) {
      return NextResponse.json(
        { message: 'Empty response from Deepseek API' },
        { status: 500 }
      );
    }
    
    try {
      // Parse the JSON response
      const parsedContent = JSON.parse(contentString);
      
      // Return the content
      return NextResponse.json(parsedContent);
    } catch (error) {
      return NextResponse.json(
        { message: 'Failed to parse LLM response as JSON' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in generate-content API route:', error);
    return NextResponse.json(
      { message: 'Error processing request' },
      { status: 500 }
    );
  }
} 