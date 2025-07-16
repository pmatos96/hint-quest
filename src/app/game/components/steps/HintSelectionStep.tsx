import FaceIcon from "@mui/icons-material/Face";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import MovieIcon from "@mui/icons-material/Movie";
import PetsIcon from "@mui/icons-material/Pets";
import FlagIcon from "@mui/icons-material/Flag";
import { GameCategory } from "@/hooks/useGameData";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import useManageHints, { IHint } from "@/hooks/useManageHints";
import { useEffect } from "react";

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

interface IHintSelectionStep {
  gameCategory: GameCategory;
  onRestart: () => void;
  hints: IHint[];
  onSelectHint: (id: number) => void;
  onOutOfHints: () => void;
}

const HintSelectionStep = ({ gameCategory, onRestart, hints, onSelectHint, onOutOfHints }: IHintSelectionStep) => {

  useEffect(() => {
    console.log("Hints updated:", hints);
    if (hints.every(hint => hint.isUsed)) {
      onOutOfHints();
    }
  }, [hints, onOutOfHints]);

  return (
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
        <Grid width={320} container rowSpacing={2} columnSpacing={2}>
          {hints.map((hint, index) => (
            <Grid key={hint.id}>
              <Button
                disabled={hint.isUsed}
                variant="contained"
                color="secondary"
                key={hint.id}
                onClick={() => onSelectHint(hint.id)}
              >
                {index + 1}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Button variant="contained" color="secondary" onClick={onRestart}>
        Restart
      </Button>
    </>
  );
};

export default HintSelectionStep;
