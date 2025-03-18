"use client";
import { useState, useEffect, useCallback } from "react";

type Player = {
  id: number;
  name: string;
};

type PlayerList = Player[];

export type GameCategory = "famousPerson" | "word" | "movie" | "animal" | "country";

const useManageLocalStorage = () => {
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
    removePlayer,
    clearPlayers,
    setPlayersList,
    checkExistingPlayer,
    gameCategory,
    setGameCategory,
  };
};

export default useManageLocalStorage;
