"use client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FaceIcon from "@mui/icons-material/Face";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import MovieIcon from "@mui/icons-material/Movie";
import PetsIcon from "@mui/icons-material/Pets";
import FlagIcon from "@mui/icons-material/Flag";
import Grid from "@mui/material/Grid2";
import React from "react";
import useManageLocalStorage, { GameCategory } from "@/hooks/useManageLocalStorage";
import HintsBoard from "./components/HintsBoard";
import { Container, Stack } from "@mui/material";

const GAME_CATEGORIES_MAP: Record<GameCategory, { label: string; icon: React.ReactNode }> = {
  famousPerson: {
    label: "Famous person",
    icon: <FaceIcon />,
  },
  word: {
    label: "Word",
    icon: <SpellcheckIcon />,
  },
  movie: {
    label: "Movie",
    icon: <MovieIcon />,
  },
  animal: {
    label: "Animal",
    icon: <PetsIcon />,
  },
  country: {
    label: "Country",
    icon: <FlagIcon />,
  },
};

export default function Game() {
  const { gameCategory, setGameCategory } = useManageLocalStorage();

  return (
    <Stack width="100%">
      {!gameCategory ? (
        <>
          <Typography variant="h1" fontWeight="bold" color="secondary">
            Select a category
          </Typography>
          <ButtonGroup variant="contained" color="secondary" size="large">
            {Object.entries(GAME_CATEGORIES_MAP).map(([key, { label, icon }]) => (
              <Button key={key} startIcon={icon} onClick={() => setGameCategory(key)}>
                {label}
              </Button>
            ))}
          </ButtonGroup>
        </>
      ) : (
        <>
          <Button
            variant="contained"
            color="secondary"
            disabled
            startIcon={GAME_CATEGORIES_MAP[gameCategory as GameCategory].icon}
          >
            {GAME_CATEGORIES_MAP[gameCategory as GameCategory].label}
          </Button>
          <Box display="flex" justifyContent="center" width={"100%"}>
            <HintsBoard />
          </Box>
        </>
      )}
    </Stack>
  );
}
