import type {ReactNode} from "react";
import { Link } from "react-router-dom";
import { Link as MuiLink, Paper, Typography } from "@mui/material";

import {path} from "../../router/Routes.tsx";

const petCardPaperStyles = {
  padding: "3rem",
  borderRadius: "30px",
  borderStyle: "solid",
  borderColor: "transparent",
  borderWidth: "4px",
  "&:hover": {
    borderColor: "#00a693",
  },
};
const petTextLabelStyles = {
  fontSize: "2rem",
  color: "primary",
  textAlign: "center",
  paddingTop: "10px",
  textTransform: "capitalize",
};

type Props = {
  petTypePlural: string;
  zipcode: string;
  children: ReactNode;
};

export default function PetSelectionCard(props: Props) {
  const petSearchUrlPath = `${path.search}/${props.petTypePlural}?location=${props.zipcode}`;

  return (
    <MuiLink sx={{ textDecoration: "none" }} component={Link} to={petSearchUrlPath}>
      <Paper sx={petCardPaperStyles} elevation={10}>
        {props.children}
        <Typography sx={petTextLabelStyles}>{props.petTypePlural}</Typography>
      </Paper>
    </MuiLink>
  );
}
