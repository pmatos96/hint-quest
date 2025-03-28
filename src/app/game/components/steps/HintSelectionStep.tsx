import FaceIcon from "@mui/icons-material/Face";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import MovieIcon from "@mui/icons-material/Movie";
import PetsIcon from "@mui/icons-material/Pets";
import FlagIcon from "@mui/icons-material/Flag";
import { GameCategory } from "@/hooks/useManageLocalStorage";
import { Box, Button } from "@mui/material";
import HintsBoard from "../HintsBoard";

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
}

const HintSelectionStep = ({ gameCategory, onRestart }: IHintSelectionStep) => {
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
        <HintsBoard />
      </Box>
      <Button variant="contained" color="secondary" onClick={onRestart}>
        Restart
      </Button>
    </>
  );
};

export default HintSelectionStep;
