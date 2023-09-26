import {Grid} from "@mui/material";

import type Pet from "../../models/pet.ts";
import PetListLoading from "./PetListLoading.tsx";
import PetList from "./PetList.tsx";

type Props = {
    petData: Pet[] | undefined;
    itemsPerPage: number;
    isLoading: boolean;
};
export default function DisplayPetList(props: Props) {
    return (
        <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="flex-start"
            spacing={2}
            aria-live="polite"
            aria-busy={props.isLoading}
            data-testid="pet-list-container"
        >
            {props.isLoading ? (
                <PetListLoading itemsPerPage={props.itemsPerPage}/>
            ) : (
                <PetList petData={props.petData as Pet[]}/>
            )}
        </Grid>
    );
}
