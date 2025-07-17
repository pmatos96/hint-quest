"use client";
import Box from "@mui/material/Box";
import Link from "next/link";
import Button from "@mui/material/Button";
import { IconButton, Input, Stack } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import usePlayersData from "@/hooks/usePlayersData";

export default function Home() {
  const { players: storedPlayers, setPlayersList } = usePlayersData();

  const initialPlayersState = storedPlayers?.length === 0 ? [{ name: "Player 1", id: 1 }] : storedPlayers;

  const [players, setPlayers] = React.useState(initialPlayersState);

  const handlePlayerInputChange = (id: number, name: string) => {
    const updatedPlayers = players.map((player) => {
      if (player.id === id) {
        return { ...player, name };
      }
      return player;
    });
    setPlayers(updatedPlayers);
  };

  const getMaxId = () => {
    return players.reduce((maxId, player) => Math.max(maxId, player.id), 0);
  };

  const handleNewPlayerField = () => {
    const newPlayer = { name: `Player ${players.length + 1}`, id: getMaxId() + 1 };
    setPlayers([...players, newPlayer]);
  };

  const handleRemovePlayer = (id: number) => {
    const updatedPlayers = players.filter((player) => player.id !== id);
    setPlayers(updatedPlayers);
  };

  return (
    <div>
      <Box width="40%" margin="auto">
        <Link href="/game">
          <Button color="secondary">Go to game</Button>
        </Link>
        <Stack component="form">
          {players.map((player) => (
            <Box key={player.id} width="100%" display={"flex"} justifyContent="space-between">
              <Input
                fullWidth
                value={player.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const { value } = e.target;
                  handlePlayerInputChange(player.id, value);
                }}
                color="secondary"
              />
              <IconButton color="secondary" onClick={() => handleRemovePlayer(player.id)}>
                <ClearIcon color="secondary" />
              </IconButton>
            </Box>
          ))}
          <Button color="secondary" onClick={handleNewPlayerField}>
            New player
          </Button>
          <Button color="secondary" onClick={() => setPlayersList(players)}>
            Confirm
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
