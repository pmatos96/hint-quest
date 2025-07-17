import FaceIcon from "@mui/icons-material/Face";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import MovieIcon from "@mui/icons-material/Movie";
import PetsIcon from "@mui/icons-material/Pets";
import FlagIcon from "@mui/icons-material/Flag";
import { GameCategory } from "@/hooks/useGameData";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { IHint } from "@/hooks/useManageHints";
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
    if (hints.every(hint => hint.isUsed)) {
      onOutOfHints();
    }
  }, [hints, onOutOfHints]);

  return (
    <Stack width={320} margin="auto" spacing={2} alignItems="center">
      <Typography variant="h6" color="textSecondary">Choose a hint and guess the: </Typography>
      <Button
        variant="contained"
        color="primary"
        disabled
        startIcon={GAME_CATEGORIES_MAP[gameCategory as GameCategory].icon}
        fullWidth
        sx={{ borderRadius: 8}}
      >
        {GAME_CATEGORIES_MAP[gameCategory as GameCategory].label}
      </Button>
      <Box display="flex" justifyContent="center" width={"100%"}>
        <Grid width={320} container justifyContent="center" rowSpacing={2} columnSpacing={2}>
          {hints.map((hint, index) => (
            <Grid key={hint.id}>
              <Button
                disabled={hint.isUsed}
                variant="contained"
                color="info"
                key={hint.id}
                onClick={() => onSelectHint(hint.id)}
                sx={{ borderRadius: 8 }}
              >
                {index + 1}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Button fullWidth variant="contained" color="primary" onClick={onRestart} sx={{ borderRadius: 8}}>
        Restart
      </Button>
    </Stack>
  );
};

export default HintSelectionStep;
