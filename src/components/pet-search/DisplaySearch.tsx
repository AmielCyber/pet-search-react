import {ChangeEvent} from "react";
import Alert from "@mui/material/Alert";

import usePetList from "../../hooks/usePetList";
import PetSearchHeader from "./PetSearchHeader";
import DisplayPetList from "./DisplayPetList.tsx";
import PetPageNavigation from "./PetPageNavigation";

type Props = {
    locationName: string;
    searchParams: URLSearchParams;
    searchQueryURL: string;
    onPageChange: (event: ChangeEvent<unknown>, value: number) => void;
};
export default function DisplaySearch(props: Props) {
    const {petListData, error, isLoading, currentPage, totalPages, itemsPerPage} = usePetList(props.searchQueryURL);
    const petType = props.searchParams.get("type") as string;

    if (error) {
        return <Alert severity="error">Failed to retrieve {petType} data...</Alert>;
    }

    return (
        <>
            <PetSearchHeader petType={petType} locationName={props.locationName}/>
            <DisplayPetList petData={petListData} isLoading={isLoading} itemsPerPage={itemsPerPage}/>
            <PetPageNavigation
                currentPage={currentPage}
                totalPages={totalPages}
                isLoading={isLoading}
                onPageChange={props.onPageChange}
            />
        </>
    );
}
