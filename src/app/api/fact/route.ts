import { NextRequest, NextResponse } from 'next/server';
import OpenAI from '@/lib/openai';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const country = searchParams.get('country');

  if (!country) {
    return NextResponse.json({ error: 'Country name is required' }, { status: 400 });
  }

  try {
    const response = await OpenAI.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that provides short, fun facts about countries. You will be given just the name of a country, and you should respond with an interesting fact about it.',
        },
        {
          role: 'user',
          content: `${country}`,
        },
      ],
    });

    const message = response.choices[0].message;
    if (message && message.content) {
      return NextResponse.json({ country, info: message.content });
    } else {
      return NextResponse.json({ error: 'No information found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching country information:', error);
    return NextResponse.json({ error: 'Failed to fetch country information' }, { status: 500 });
  }
}

