import { Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface IGuessStepProps {
  hintText: string;
  onSubmitGuess: (guess: string) => void;
}

const GuessStep = ({ hintText, onSubmitGuess }: IGuessStepProps) => {
  const [guess, setGuess] = useState<string>("");
  const handleGuessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value);
  };

  return (
    <Paper>
      <Typography variant="body1" color="secondary" fontSize={20} textAlign="center">
        {hintText}
      </Typography>
      <TextField value={guess} onChange={handleGuessChange} />
      <Button disabled={guess === ""} variant="contained" color="success" onClick={() => onSubmitGuess(guess)}>
        Submit Guess
      </Button>
    </Paper>
  );
};

export default GuessStep;
