import {Grid} from "@mui/material";

import type Pet from "../../models/pet.ts";
import PetLoadingList from "./PetLoadingList.tsx";
import PetList from "./PetList.tsx";

type Props = {
    petData: Pet[] | undefined;
    isLoading: boolean;
    itemsPerPage: number;
};
export default function DisplayPetList(props: Props) {
    if (!props.petData || props.isLoading) {
        return (
            <Grid container spacing={2} justifyContent="center" aria-live="polite" aria-busy="true"
                  data-testid="pet-list-container">
                <PetLoadingList itemsPerPage={props.itemsPerPage}/>
            </Grid>
        );
    }
    return (
        <Grid container spacing={2} justifyContent="center" aria-live="polite" aria-busy="false"
              data-testid="pet-list-container">
            <PetList petData={props.petData}/>;
        </Grid>
    );
}
