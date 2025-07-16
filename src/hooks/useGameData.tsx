"use client";
import { useState, useEffect, useCallback } from "react";

type Player = {
  id: number;
  name: string;
};

type PlayerList = Player[];

export type GameCategory = "famousPerson" | "word" | "movie" | "animal" | "country";

const useGameData = () => {
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

  const [players, setPlayers] = useState<PlayerList>(() => {
    const storedPlayers = localStorage.getItem("players");
    return storedPlayers ? JSON.parse(storedPlayers) : [];
  });

  const [gameCategory, setGameCategory] = useState<GameCategory>(() => {
    const storedCategory = localStorage.getItem("gameCategory") as GameCategory;
    return storedCategory || null;
  });

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    if (gameCategory) {
      localStorage.setItem("gameCategory", gameCategory);
    }
  }, [gameCategory]);

  const addPlayer = useCallback((name: string) => {
    setPlayers((prevPlayers) => [...prevPlayers, { id: prevPlayers.length, name }]);
  }, []);

  const removePlayer = useCallback((id: number) => {
    setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
  }, []);

  const clearPlayers = useCallback(() => {
    setPlayers([]);
  }, []);

  const setPlayersList = useCallback((playersList: PlayerList) => {
    setPlayers(playersList);
  }, []);

  const checkExistingPlayer = useCallback(
    (name: string) => {
      return players.some((player) => player.name === name);
    },
    [players]
  );

  return {
    players,
    addPlayer,
    gameTarget,
    setGameTarget,
    fetchGameTarget,
    removePlayer,
    clearPlayers,
    setPlayersList,
    checkExistingPlayer,
    gameCategory,
    setGameCategory,
  };
};

export default useGameData;
