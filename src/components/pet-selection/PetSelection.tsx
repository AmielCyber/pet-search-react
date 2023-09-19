import {useContext} from "react";
import {Box} from "@mui/material";

import {LocationContext, LocationContextType} from "../../hooks/LocationContext.tsx";
import PetSelectionCard from "./PetSelectionCard.tsx";
import CatIcon from "../icons/CatIcon.tsx";
import DogIcon from "../icons/DogIcon.tsx";

const petIconStyles = {
    fontSize: "150px",
};

const petCardBoxStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "2rem",
};

export default function PetSelection() {
    const { location } = useContext(LocationContext) as LocationContextType;

    return (
        <Box sx={petCardBoxStyles}>
            <PetSelectionCard petTypePlural="cats" zipcode={location.zipcode}>
                <CatIcon sx={petIconStyles}/>
            </PetSelectionCard>
            <PetSelectionCard petTypePlural="dogs" zipcode={location.zipcode}>
                <DogIcon sx={petIconStyles}/>
            </PetSelectionCard>
        </Box>
    );
}
