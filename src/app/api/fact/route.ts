import { NextRequest, NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const country = searchParams.get('country');

  if (!country) {
    return NextResponse.json({ error: 'Country name is required' }, { status: 400 });
  }

  try {
    const res = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        input: `Provide a brief fun fact about the country of ${country}, starting the response with the country name.`,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('OpenAI API error:', errorText);
      return NextResponse.json({ error: 'OpenAI API error' }, { status: 500 });
    }

    const json = await res.json();
    const content = json.output[0]?.content[0]?.text;

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

