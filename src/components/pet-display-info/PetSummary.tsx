import {Grid} from "@mui/material";

import type Pet from "../../models/pet.ts";
import PageTitle from "./PageTitle.tsx";
import ImageContainer from "../image-viewer/ImageContainer.tsx";
import PetAttributes from "./PetAttributes.tsx";
import Description from "./Description.tsx";

type Props = {
    petData: Pet;
};

export default function PetSummary(props: Props) {
    return (
        <Grid container justifyContent="center" columnSpacing={4} rowSpacing={3} alignItems="center" aria-busy="false">
            <Grid item xs={12} textAlign="center" mt={2}>
                <PageTitle name={props.petData.name}/>
            </Grid>
            <Grid item>
                <ImageContainer name={props.petData.name} photos={props.petData.photos}/>
            </Grid>
            <Grid item textAlign="center">
                <PetAttributes petData={props.petData}/>
            </Grid>
            <Grid item textAlign="center" xs={12}>
                <Description description={props.petData.description} url={props.petData.url}/>
            </Grid>
        </Grid>
    );
}
