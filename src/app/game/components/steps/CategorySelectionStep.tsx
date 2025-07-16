"use client";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FaceIcon from "@mui/icons-material/Face";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import MovieIcon from "@mui/icons-material/Movie";
import PetsIcon from "@mui/icons-material/Pets";
import FlagIcon from "@mui/icons-material/Flag";
import { GameCategory } from "@/hooks/useGameData";
import { Stack } from "@mui/material";

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

interface ICategorySelectionStepProps {
  onSetCategory: (category: GameCategory) => void;
}

const CategorySelectionStep = ({ onSetCategory }: ICategorySelectionStepProps) => {
  return (
    <Stack width="100%">
      <Typography variant="h1" fontWeight="bold" color="secondary">
        Select a category
      </Typography>
      <ButtonGroup variant="contained" color="secondary" size="large">
        {Object.entries(GAME_CATEGORIES_MAP).map(([key, { label, icon }]) => (
          <Button key={key} startIcon={icon} onClick={() => onSetCategory(key as GameCategory)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>
    </Stack>
  );
};

export default CategorySelectionStep;
