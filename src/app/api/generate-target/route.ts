import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';

export async function POST(req: NextRequest) {
  const { category } = await req.json();
  console.log("openai", openai)
  const prompt = `Escolha aleatoriamente um(a) ${category} a ser adivinhada e me diga apenas o nome, sem explicação. É muito importante que seja apenas o nome da coisa.`;

  const chat = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  const target = chat.choices[0].message.content?.trim();

  return NextResponse.json({ target });
}
