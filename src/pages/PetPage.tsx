import {useParams} from "react-router-dom";
import {Alert} from "@mui/material";

import BackToSearchResultsButton from "../components/pet-display-info/BackToSearchResultsButton.tsx";
import DisplayInfo from "../components/pet-display-info/DisplayInfo.tsx";


export default function PetPage() {
    const params = useParams();

    const id = params.id ?? "error";

    return (
        <main>
            {id === "error" || Number.isNaN(parseInt(id)) ? (
                <Alert severity="error">Invalid pet id entered.</Alert>
            ) : (
                <>
                    <BackToSearchResultsButton/>
                    <DisplayInfo id={id}/>
                </>
            )}
        </main>
    );
}