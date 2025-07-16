import { GameCategory } from "@/hooks/useGameData";
import { NextRequest, NextResponse } from "next/server";
// import openai from "@/lib/openai";

export async function POST(req: NextRequest, res: NextResponse) {
  const { category }: { category: GameCategory } = await req.json();

  // const prompt = `Escolha aleatoriamente um(a) ${category} a ser adivinhada e me diga apenas o nome, sem explicação. É muito importante que seja apenas o nome da coisa.`;

  // const chat = await openai.chat.completions.create({
  //   model: "gpt-3.5-turbo",
  //   messages: [{ role: "user", content: prompt }],
  // });

  // const target = chat.choices[0].message.content?.trim();

  const TARGET_BY_CATEGORY: Record<GameCategory, string[]> = {
    famousPerson: ["Queen Elizabeth II", "Albert Einstein", "Marie Curie", "Isaac Newton", "Leonardo da Vinci"],
    word: ["apple", "banana", "cherry", "date", "elderberry"],
    movie: ["Inception", "Titanic", "Avatar", "The Matrix", "The Godfather"],
    animal: ["dog", "cat", "elephant", "giraffe", "lion"],
    country: ["Brazil", "Canada", "Japan", "Australia", "Germany"],
  };

  const target = TARGET_BY_CATEGORY[category][0]; // For testing purposes
  return NextResponse.json({ target });
}
