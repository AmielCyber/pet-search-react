import type {ReactNode} from "react";
import { createContext, useState } from "react";
import {enqueueSnackbar} from "notistack";

import {getLocationFromZipCode, getUserLocation, LocationResponse} from "./fetchLocation.ts";

export type Location = {
  zipcode: string;
  locationName: string;
}

export type LocationContextType = {
  location: Location;
  loadingNewLocation: boolean;
  setLocationFromZipCode: (newZipcode: string) => Promise<void>;
  setLocationFromGeolocation: () => Promise<void>;
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

  const setLocationFromZipCode = async (newZipcode: string) => {
    setLoadingNewLocation(true);
    const locationResponse: LocationResponse = await getLocationFromZipCode(newZipcode)
    setNewLocation(locationResponse, "Updated entered zipcode!", "Failed to update zipcode.");
    setLoadingNewLocation(false);
  }

  const setLocationFromGeolocation = async () => {
    if(loadingNewLocation){
      return;
    }
    setLoadingNewLocation(true);
    if(previousGeoLocation != undefined){
      setNewLocation(previousGeoLocation, "Updated local zipcode!", "Failed to retrieve location.");
    }else{
      const locationResponse: LocationResponse = await getUserLocation();
      if(setNewLocation(locationResponse, "Updated local zipcode!", "Failed to retrieve location.")){
        setPreviousGeoLocation(locationResponse);
      }
    }
    setLoadingNewLocation(false);
  }

  const setNewLocation = (locationResponse: LocationResponse, successMessage: string, errorMessage: string): boolean => {
    if(locationResponse.location == undefined){
      enqueueSnackbar(locationResponse.errorMessage ?? errorMessage, {variant: "error"});
      return false;
    }
    setLocation(locationResponse.location);
    enqueueSnackbar(successMessage, {variant: "success"});
    return true;
  }

  return (
      <LocationContext.Provider
          value={{ location, loadingNewLocation, setLocationFromZipCode, setLocationFromGeolocation}}
      >
        {props.children}
      </LocationContext.Provider>
  );
}