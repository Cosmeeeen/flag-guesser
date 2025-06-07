import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const continent = request.nextUrl.searchParams.get('continent');

  let url;
  if (!continent || continent === 'all') {
    url = 'https://restcountries.com/v3.1/all?fields=cca2,cca3,name,flags';
  } else {
    url = `https://restcountries.com/v3.1/region/${continent}?fields=cca2,cca3,name,flags`;
  }

  const response = await fetch(url);

  const countries = await response.json();
  const randomCountry = countries[Math.floor(Math.random() * countries.length)];

  const id = randomCountry.cca2 || randomCountry.cca3;
  const flagUrl = randomCountry.flags.svg || randomCountry.flags.png;
  const name = randomCountry.name.common;

  return NextResponse.json({ id, name, flag: flagUrl });
}
