import { Button, Dialog, Typography } from "@mui/material";
import { capitalize } from "lodash";
import Image from "next/image";
import { useState } from "react";

interface IWinnerStepProps {
    onRestart: () => void;
    gameTarget: string;
}

const WinnerStep = ({ onRestart, gameTarget }: IWinnerStepProps): React.ReactNode => {
    const [open, setOpen] = useState<boolean>(true);
    return (
        <Dialog 
            open={open} 
            onClose={() => setOpen(false)} 
            slotProps={{ 
                paper: { 
                    sx: {
                        p: 3
                    }
                }
            }}
        >
            <Typography variant="h4" fontWeight='bold' color="primary" textAlign="center" mb={2}>
                Congratulations!
            </Typography>
            <Typography variant="body1" color="textSecondary" textAlign="center" mb={2}>
                <strong>{capitalize(gameTarget)}</strong> was the target!
            </Typography>
            <Image
                src="/assets/trophy.png"
                alt="Celebration"
                width={200}
                height={200}
                priority
                style={{
                    objectFit: 'contain',
                    marginBottom: 16,
                    margin: '0 auto',
                }}
            />
            <Button color="secondary" variant="contained" onClick={onRestart} sx={{ borderRadius: 8 }}>Play again</Button>
        </Dialog>
    );
}

export default WinnerStep;