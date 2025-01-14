import OpenAI from 'openai';
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  console.log('API route called');
  
  if (!process.env.OPENAI_API_KEY) {
    console.error('OpenAI API key is not set');
    return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 })
  }

  try {
    const { field } = await req.json()
    console.log('Received field:', field);

    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: generatePrompt(field),
      max_tokens: 100,
      temperature: 0.6,
    });

    console.log('OpenAI API response received');
    return NextResponse.json({ topic: completion.choices[0].text.trim() })
  } catch(error: any) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'An error occurred during your request.' }, { status: 500 })
  }
}

function generatePrompt(field: string) {
  return `Suggest an innovative research topic in the field of ${field}. The topic should be specific, current, and have potential for significant impact.`
}

