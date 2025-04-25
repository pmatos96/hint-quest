import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';

export async function POST(req: NextRequest) {
  const { guess, target, category } = await req.json();

  const prompt = `Me responda se "${guess}" na categoria "${category}" pode ser considerado uma resposta correta para o alvo "${target}". 
  Responda somente e exatamente a palavra "true" em caso positivo ou a palavra "false" em caso negativo. Isso é muito importante 
  para que a resposta seja interpretada em Javascript.`;

  const chat = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  const rawVerification = chat.choices[0].message.content?.trim();

  const isCorrect = rawVerification === "true";

  return NextResponse.json({ isCorrect });
}
