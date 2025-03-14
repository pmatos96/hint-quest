import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FaceIcon from "@mui/icons-material/Face";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import MovieIcon from "@mui/icons-material/Movie";
import PetsIcon from "@mui/icons-material/Pets";
import FlagIcon from "@mui/icons-material/Flag";
import { Container } from "@mui/material";

export default function Game() {
  return (
    <div>
      <Container sx={{ backgroundColor: "secondary" }}>
        <Box>
          <Typography variant="h1" fontWeight="bold" color="secondary">
            Select a category
          </Typography>
          <ButtonGroup variant="contained" color="secondary" size="large">
            <Button startIcon={<FaceIcon />}>Famous person</Button>
            <Button startIcon={<SpellcheckIcon />}>Word</Button>
            <Button startIcon={<MovieIcon />}>Movie</Button>
            <Button startIcon={<PetsIcon />}>Animal</Button>
            <Button startIcon={<FlagIcon />}>Country</Button>
          </ButtonGroup>
        </Box>
      </Container>
    </div>
  );
}
