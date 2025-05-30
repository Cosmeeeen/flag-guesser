import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch('https://restcountries.com/v3.1/all');

  const countries = await response.json();
  const randomCountry = countries[Math.floor(Math.random() * countries.length)];

  const id = randomCountry.cca2 || randomCountry.cca3;
  const flagUrl = randomCountry.flags.svg || randomCountry.flags.png;
  const name = randomCountry.name.common;

  return NextResponse.json({ id, name, flag: flagUrl });
}
