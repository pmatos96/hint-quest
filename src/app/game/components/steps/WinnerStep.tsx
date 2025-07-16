import { Button, Dialog, Typography } from "@mui/material";
import { useState } from "react";

interface IWinnerStepProps {
    onRestart: () => void;
}

const WinnerStep = ({ onRestart }: IWinnerStepProps): React.ReactNode => {
    const [open, setOpen] = useState<boolean>(true);
    return (
    <Dialog open={open} onClose={() => setOpen(false)}>
        <Typography variant="h4" color="primary" textAlign="center" margin={2}>
            Congratulations! You guessed the word!
        </Typography>
        <Button onClick={onRestart}>Play again</Button>
    </Dialog>
  );
}

export default WinnerStep;