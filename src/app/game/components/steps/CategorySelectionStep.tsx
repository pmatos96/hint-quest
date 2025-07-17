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
    <Stack>
      <Typography textAlign="center" variant="h1" fontWeight="800" color="textPrimary" mb={10} sx={{
          fontSize: {
            xs: "2.5rem",
            md: "5rem",
          },
        }}
      >
        Select a category
      </Typography>
      <ButtonGroup 
        orientation="horizontal" 
        variant="contained" 
        color="primary" 
        size="large" 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          boxShadow: 0, 
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: {
            xs: 0.5,
            md: 0,
          },
          px: 2,
          '.MuiButton-root': (theme) => ({
            [`${theme.breakpoints.down('md')}`]: {
              borderRadius: 8,
            },
            [`${theme.breakpoints.up('md')}`]: {
              borderRadius: 0,
              '&:first-of-type': {
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              },
              '&:last-of-type': {
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
              }
            }
          })
        }}
      >
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
