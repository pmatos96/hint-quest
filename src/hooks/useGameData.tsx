"use client";
import { useState, useEffect } from "react";

export type GameCategory = "famousPerson" | "word" | "movie" | "animal" | "country";

interface IUseGameData {
  gameTarget: string | null;
  setGameTarget: (target: string | null) => void;
  fetchGameTarget: (category: GameCategory) => Promise<void>;
  gameCategory: GameCategory | null;
  setGameCategory: (category: GameCategory) => void;
}

const useGameData = (): IUseGameData => {
  const [gameTarget, setGameTarget] = useState<string | null>(() => {
    const storedTarget = localStorage.getItem("gameTarget");
    return storedTarget ? JSON.parse(storedTarget) : null;
  });

  const fetchGameTarget = async (category: GameCategory) => {
    const response = await fetch("/api/generate-target", {
      method: "POST",
      body: JSON.stringify({ category }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    const target = response.target as string;
    setGameTarget(target);
  };

  

  const [gameCategory, setGameCategory] = useState<GameCategory>(() => {
    const storedCategory = localStorage.getItem("gameCategory") as GameCategory;
    return storedCategory || null;
  });


  useEffect(() => {
    if (gameCategory) {
      localStorage.setItem("gameCategory", gameCategory);
    }
  }, [gameCategory]);

  return {
    gameTarget,
    setGameTarget,
    fetchGameTarget,
    gameCategory,
    setGameCategory,
  };
};

export default useGameData;
