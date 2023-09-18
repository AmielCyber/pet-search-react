import type {ReactNode} from "react";
import {createContext, useCallback, useState} from "react";
import {enqueueSnackbar} from "notistack";

import {getLocationFromZipCode, getUserLocation, LocationResponse} from "./fetchLocation.ts";

export type Location = {
    zipcode: string;
    locationName: string;
}

export type LocationContextType = {
    location: Location;
    loadingNewLocation: boolean;
    setLocationFromZipCode: (newZipcode: string) => Promise<string | undefined>;
    setLocationFromGeolocation: () => Promise<string | undefined>;
};

export const LocationContext = createContext<LocationContextType | null>(null);

const defaultLocation: Location = {
    zipcode: "92101",
    locationName: "San Diego, California 92101, United States",
};

type Props = {
    children: ReactNode;
};

export function LocationProvider(props: Props) {
    const [location, setLocation] = useState(defaultLocation);
    const [loadingNewLocation, setLoadingNewLocation] = useState(false);
    const [previousGeoLocation, setPreviousGeoLocation] = useState<LocationResponse | undefined>()

    const setLocationFromZipCode = useCallback(async (newZipcode: string): Promise<string | undefined> => {
        setLoadingNewLocation(true);
        const locationResponse: LocationResponse = await getLocationFromZipCode(newZipcode)
        const success = setNewLocation(locationResponse, "Updated entered zipcode!", "Failed to update zipcode.");
        setLoadingNewLocation(false);
        return success ? newZipcode : undefined;
    }, []);

    const setLocationFromGeolocation = useCallback(async (): Promise<string | undefined> => {
        setLoadingNewLocation(true);
        let updatedZipcode;
        if (previousGeoLocation != undefined) {
            const success = setNewLocation(previousGeoLocation, "Updated zipcode from previous geolocation!", "Failed to retrieve location.");
            if (success) {
                updatedZipcode = previousGeoLocation.location?.zipcode;
            }
        } else {
            const locationResponse: LocationResponse = await getUserLocation();
            const success = setNewLocation(locationResponse, "Updated local zipcode!", "Failed to retrieve location.");
            if (success) {
                setPreviousGeoLocation(locationResponse);
                updatedZipcode = locationResponse.location?.zipcode;
            }
        }
        setLoadingNewLocation(false);
        return updatedZipcode;
    }, [previousGeoLocation]);

    const setNewLocation = useCallback((locationResponse: LocationResponse, successMessage: string, errorMessage: string): boolean => {
        if (locationResponse.location === undefined) {
            enqueueSnackbar(locationResponse.errorMessage ?? errorMessage, {variant: "error"});
            return false;
        }
        setLocation(locationResponse.location);
        enqueueSnackbar(successMessage, {variant: "success"});
        return true;
    },[]);

    return (
        <LocationContext.Provider
            value={{location, loadingNewLocation, setLocationFromZipCode, setLocationFromGeolocation}}
        >
            {props.children}
        </LocationContext.Provider>
    );
}