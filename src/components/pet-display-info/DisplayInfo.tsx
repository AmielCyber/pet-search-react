import {Alert} from "@mui/material";

import useSinglePet from "../../hooks/useSinglePet.ts";
import DisplayInfoSkeleton from "./DisplayInfoSkeleton.tsx";
import PetSummary from "./PetSummary.tsx";

type Props = {
    id: string;
};

export default function DisplayInfo(props: Props) {
    const {petData, error, isLoading} = useSinglePet(props.id);

    if (error && !isLoading)
        return <Alert severity="error"><link>{error.message ? error.message : "Could not fetch pet data."}</link></Alert>;

    if (isLoading || !petData)
        return <DisplayInfoSkeleton/>;

    return <PetSummary petData={petData}/>;
}
