import {useContext} from "react";
import {Location, LocationContext, LocationContextType} from "./LocationContext.tsx";
import {useParams, useSearchParams} from "react-router-dom";

const petMap = new Map().set("dogs", "dog").set("cats", "cat");

type PetSearchParams = {
    locationName: string;
    searchParams: URLSearchParams | null,
    onSearchParamsChange: (name: string, value: string, resetPage: boolean) => void;
    errorMessage: string;
}

export default function usePetSearchParams(): PetSearchParams {
    const {location} = useContext(LocationContext) as LocationContextType;
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSearchPramsChange = (name: string, value: string, resetPage: boolean) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(name, value);
        if(resetPage)
            newSearchParams.set("page", "1");
        setSearchParams(newSearchParams);
    }


    const petType = params.petType ?? "";

    if (!petMap.has(petType)) {
        return {
            locationName: "",
            searchParams: null,
            errorMessage: `$Pet Type: ${petType} not supported.`,
            onSearchParamsChange: handleSearchPramsChange,
        }
    }
    return {
        locationName: location.locationName,
        searchParams: getNewSearchParams(searchParams, location, petType),
        errorMessage: "",
        onSearchParamsChange: handleSearchPramsChange,
    }
}

function getNewSearchParams(currentSearchParams: URLSearchParams, location: Location, petType: string): URLSearchParams {
    const searchParams = new URLSearchParams(currentSearchParams);
    setRequiredSearchParams(petType, location, searchParams);

    return searchParams;
}

function setRequiredSearchParams(petType: string | undefined, location: Location, searchParams: URLSearchParams) {
    if (!searchParams.has("type"))
        searchParams.set("type", petMap.get(petType));
    if (!searchParams.has("zipcode"))
        searchParams.set("zipcode", location.zipcode);
    if (!searchParams.has("page"))
        searchParams.set("page", "1");
}
