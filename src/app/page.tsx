import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <div>
      <Box>
        <Typography variant="h1">Home</Typography>
        <Link href="/game">
          <Button>Go to game</Button>
        </Link>
      </Box>
    </div>
  );
}
