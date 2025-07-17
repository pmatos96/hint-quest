import { Button, Grid2, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface IGuessStepProps {
  hintText: string;
  onSubmitGuess: (guess: string) => void;
  hintNumber: number;
}

const GuessStep = ({ hintText, onSubmitGuess, hintNumber }: IGuessStepProps) => {
  const [guess, setGuess] = useState<string>("");
  const handleGuessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value);
  };

  return (
    <Stack justifyContent="space-between"  component={Paper} elevation={3} borderRadius={3} sx={{ p: 3, maxWidth: 400, height: 320, mx: "auto", width: {
      xs: "calc(100% - 100px)", // Full width minus 8px on each side
      sm: 400 // Fixed width on larger screens
    } }}>
      <Typography variant="h4" fontWeight='bold' color="primary" textAlign="center" mb={2}>
        Hint {hintNumber}
      </Typography>
      <Typography variant="body1" color="textSecondary" fontSize={20} textAlign="center">
        {hintText}
      </Typography>
      <Grid2 gap={2} container flexWrap="nowrap">  
        <TextField sx={{ '.MuiInputBase-root': { height: "100%", borderRadius: 8, flex: 1 } }} value={guess} onChange={handleGuessChange} />
        <Button disabled={guess === ""} variant="contained" color="secondary" onClick={() => onSubmitGuess(guess)} sx={{ height: "100%", flex: 1, color: 'text.secondary', borderRadius: 8, minWidth: 90 }}>
          Guess
        </Button>
      </Grid2>
    </Stack>
  );
};

export default GuessStep;
