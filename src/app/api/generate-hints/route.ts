import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';

export async function POST(req: NextRequest) {
  const { category, target } = await req.json();

  const prompt = `Gere 20 dicas de no máximo 18 palavras para adivinhar o(a) seguinte ${category}: "${target}". Retorne somente as dicas organizadas em 
  um array de strings para ser interpretado em Javascript. Não retorne mais nada além do array.`;

  const chat = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  const rawHints = chat.choices[0].message.content;

  const hintsList: unknown = JSON.parse(rawHints || '[]');

  return NextResponse.json({ hints: hintsList });
}
