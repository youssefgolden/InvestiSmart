import { NextResponse } from 'next/server';

export async function GET() {
    console.log('TEST------')
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();

  return NextResponse.json({ data });
}
