import {ChangeEvent, useContext} from "react";
import {Location, LocationContext, LocationContextType} from "./LocationContext.tsx";
import {useParams, useSearchParams} from "react-router-dom";

const petMap = new Map().set("dogs", "dog").set("cats", "cat");

type PetSearchParams = {
    locationName: string;
    searchParams: URLSearchParams | null,
    onPageChange: (_: ChangeEvent<unknown>, value: number) => void;
    errorMessage: string;
}

export default function usePetSearchParams(): PetSearchParams {
    const {location} = useContext(LocationContext) as LocationContextType;
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("page", value.toString());
        setSearchParams(newSearchParams);
    };

    const petType = params.petType ?? "";

    if (!petMap.has(petType)) {
        return {
            locationName: "",
            searchParams: null,
            errorMessage: `$Pet Type: ${petType} not supported.`,
            onPageChange: handlePageChange,
        }
    }
    return {
        locationName: location.locationName,
        searchParams: getNewSearchParams(searchParams, location, petType),
        errorMessage: "",
        onPageChange: handlePageChange,
    }
}

function getNewSearchParams(currentSearchParams: URLSearchParams, location: Location, petType: string): URLSearchParams {
    const zipCode = currentSearchParams.get("location") ?? location.zipcode;
    const page = currentSearchParams.get("page") ?? "1";

    const apiSearchParams = new URLSearchParams();
    apiSearchParams.append("type", petMap.get(petType));
    apiSearchParams.append("location", zipCode);
    apiSearchParams.append("page", page);

    return apiSearchParams;
}
