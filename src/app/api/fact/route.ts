import { NextRequest, NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const country = searchParams.get('country');

  if (!country) {
    return NextResponse.json({ error: 'Country name is required' }, { status: 400 });
  }

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that provides short, fun facts about countries. You will be given just the name of a country, and you should respond with an interesting fact about it.',
          },
          {
            role: 'user',
            content: country,
          },
        ],
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('OpenAI API error:', errorText);
      return NextResponse.json({ error: 'OpenAI API error' }, { status: 500 });
    }

    const json = await res.json();
    const content = json.choices?.[0]?.message?.content;

    if (content) {
      return NextResponse.json({ country, info: content });
    } else {
      return NextResponse.json({ error: 'No content returned from OpenAI' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

