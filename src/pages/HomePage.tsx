import { Typography } from "@mui/material";
// Our imports.
import PetSelection from "../components/pet-selection/PetSelection.tsx";

// Styles
const titleStyles = {
  textAlign: "center",
  marginBottom: "40px",
  marginTop: "40px",
};

export default function HomePage() {

  return (
      <main>
          <Typography sx={titleStyles} variant="h2">
              Find your next companion!
          </Typography>
          <PetSelection />
      </main>
  );
}
