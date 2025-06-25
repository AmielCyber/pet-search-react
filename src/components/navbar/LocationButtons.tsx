import {useContext} from "react";
import {useSearchParams} from "react-router-dom";

import {LocationContext, LocationContextType} from "../../hooks/LocationContext.tsx";
import SetZipCodeButton from "./SetZipCodeButton.tsx";
import LocateMeButton from "./LocateMeButton.tsx";

export default function LocationButtons() {
    const {location, loadingNewLocation, setLocationFromZipCode, setLocationFromGeolocation} = useContext(LocationContext) as LocationContextType;
    const [searchParams , setSearchParams] = useSearchParams();

    const handleZipCodeChange = async (newZipcode: string): Promise<void> => {
        const updatedZipcode = await setLocationFromZipCode(newZipcode);
        if(updatedZipcode !== undefined){
            const newSearchParams = getNewSearchParamsLocation(updatedZipcode, searchParams);
            setSearchParams(newSearchParams);
        }
    }

    const handleLocateMe = async (): Promise<void> => {
        const updatedZipcode = await setLocationFromGeolocation();
        if(updatedZipcode !== undefined){
            const newSearchParams = getNewSearchParamsLocation(updatedZipcode, searchParams);
            setSearchParams(newSearchParams);
        }
    }

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
    newParams.set("zipcode", zipcode);

    return newParams;
}
