import {Alert, AlertTitle} from "@mui/material";

import DisplaySearch from "../components/pet-search/DisplaySearch.tsx";
import usePetSearchParams from "../hooks/usePetSearchParams.ts";

export default function PetSearchPage() {
    const {locationName, searchParams, errorMessage, onPageChange} = usePetSearchParams();

    if (searchParams === null) {
        return (
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {errorMessage}
            </Alert>
        );
    }

    return (
        <DisplaySearch
            locationName={locationName}
            searchParams={searchParams}
            searchQueryURL={"pets?" + searchParams.toString()}
            onPageChange={onPageChange}
        />
    );
}
