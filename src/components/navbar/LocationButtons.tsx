import {useContext, useEffect} from "react";
import {useSearchParams} from "react-router-dom";

import {LocationContext, LocationContextType} from "../../hooks/LocationContext.tsx";
import SetZipCodeButton from "./SetZipCodeButton.tsx";
import LocateMeButton from "./LocateMeButton.tsx";

export default function LocationButtons() {
    const {location, loadingNewLocation, setLocationFromZipCode, setLocationFromGeolocation} = useContext(LocationContext) as LocationContextType;
    const [searchParams , setSearchParams] = useSearchParams();

    useEffect(() => {
        const newSearchParams = getNewSearchParamsLocation(location.zipcode, searchParams);
        setSearchParams(newSearchParams);
    }, [location])

    const handleZipCodeChange = async (newZipcode: string): Promise<void> => await setLocationFromZipCode(newZipcode);

    const handleLocateMe = async (): Promise<void> => await setLocationFromGeolocation();

    return (
        <>
            <SetZipCodeButton location={location} loadingNewZipcode={loadingNewLocation}
                              onZipcodeChange={handleZipCodeChange}/>
            <LocateMeButton onLocateMe={handleLocateMe} loadingNewZipcode={loadingNewLocation}/>
        </>
    );
}

function getNewSearchParamsLocation(zipcode: string, searchParams: URLSearchParams): URLSearchParams {
    const newParams = new URLSearchParams(searchParams);
    if (searchParams.has("page")) {
        newParams.set("page", "1");
    }
    newParams.set("location", zipcode);

    return newParams;
}
