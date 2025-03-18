import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import range from "lodash/range";
const HintsBoard = (): React.ReactNode => {
  const hintsPositions = Array.from(Array(20).keys());

  return (
    <Grid width={320} container rowSpacing={2} columnSpacing={2}>
      {range(1, 21).map((index) => (
        <Grid>
          <Button variant="contained" color="secondary" key={index}>
            {index}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default HintsBoard;
