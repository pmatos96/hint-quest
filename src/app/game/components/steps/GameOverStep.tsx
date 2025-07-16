import { Button, Dialog, Typography } from "@mui/material";
import { useState } from "react";


interface IGameOverStepProps {
    onRestart: () => void;
    target: string;
}

const GameOverStep = ({ onRestart, target }: IGameOverStepProps) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Typography variant="h4" color="error" textAlign="center" margin={2}>
        Game Over! The target word was: {target}
      </Typography>
      <Button onClick={onRestart}>Play again</Button>
    </Dialog>
  );
}

export default GameOverStep;