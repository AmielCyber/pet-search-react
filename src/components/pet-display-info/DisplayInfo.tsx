import {Alert} from "@mui/material";

import useSinglePet from "../../hooks/useSinglePet.ts";
import DisplayInfoSkeleton from "./DisplayInfoSkeleton.tsx";
import PetSummary from "./PetSummary.tsx";

export const testId = "displayInfo";

type Props = {
    id: string;
};

export default function DisplayInfo(props: Props) {
    const {petData, error, isLoading} = useSinglePet(props.id);

    if (error && !isLoading)
        return (
            <div aria-busy="false" aria-live="polite" data-testid={testId}>
                <Alert severity="error"> {error.message ? error.message : "Could not fetch pet data."} </Alert>
            </div>
        );

    if (isLoading || !petData)
        return (
            <div aria-busy="true" aria-live="polite" id="loading" data-testid={testId}>
                <DisplayInfoSkeleton/>
            </div>
        );

    return (
        <div aria-busy="false" aria-live="polite" data-testid={testId}>
            <PetSummary petData={petData}/>;
        </div>
    );
}
