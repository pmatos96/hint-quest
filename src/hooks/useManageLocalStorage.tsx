"use client";
import { useState, useEffect, useCallback } from "react";

type Player = {
  id: number;
  name: string;
};

type PlayerList = Player[];

const useManageLocalStorage = () => {
  const [players, setPlayers] = useState<PlayerList>(() => {
    const storedPlayers = localStorage.getItem("players");
    return storedPlayers ? JSON.parse(storedPlayers) : [];
  });

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

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
  };
};

export default useManageLocalStorage;
