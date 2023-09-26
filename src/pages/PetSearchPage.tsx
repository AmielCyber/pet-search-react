import {ChangeEvent} from "react";
import {Alert, AlertTitle} from "@mui/material";

import usePetSearchParams from "../hooks/usePetSearchParams.ts";
import DisplaySearch from "../components/pet-search/DisplaySearch.tsx";

export default function PetSearchPage() {
    const {locationName, searchParams, errorMessage, onSearchParamsChange} = usePetSearchParams();

    if (searchParams === null) {
        return (
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {errorMessage}
            </Alert>
        );
    }

    const handlePageChange = (_: ChangeEvent<unknown>, page: number) => onSearchParamsChange("page", page.toString(), false);
    const handleQueryChange = (name: string, value: string) => onSearchParamsChange(name, value, true);

    return (
        <DisplaySearch
            locationName={locationName}
            searchParams={searchParams}
            searchQueryURL={"pets?" + searchParams.toString()}
            onPageChange={handlePageChange}
            onQueryChange={handleQueryChange}
        />
    );
}
