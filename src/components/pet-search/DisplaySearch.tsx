import {ChangeEvent} from "react";
import Alert from "@mui/material/Alert";

import usePetList from "../../hooks/usePetList";
import PetSearchHeader from "./PetSearchHeader";
import DisplayPetList from "./DisplayPetList.tsx";
import PetPageNavigation from "./PetPageNavigation";
import PetSearchFilterList from "../pet-filter/PetSearchFilterList.tsx";

type Props = {
    locationName: string;
    searchParams: URLSearchParams;
    searchQueryURL: string;
    onPageChange: (_: ChangeEvent<unknown>, page: number) => void;
    onQueryChange: (name: string, value: string) => void;
};
export default function DisplaySearch(props: Props) {
    const {petListData, error, isLoading, currentPage, totalPages, itemsPerPage, totalCount} = usePetList(props.searchQueryURL);

    const petType = props.searchParams.get("type") as string;

    if (error) {
        return <Alert severity="error">Failed to retrieve {petType} data...</Alert>;
    }

    const loading = isLoading || !petListData;
    return (
        <>
            <PetSearchHeader
                petType={petType}
                locationName={props.locationName}
                totalCount={totalCount}
            />
            <PetSearchFilterList
                searchParams={props.searchParams}
                onQueryChange={props.onQueryChange}
                isLoading={loading}
            />
            <DisplayPetList
                petData={petListData}
                itemsPerPage={itemsPerPage}
                isLoading={loading}
            />
            <PetPageNavigation
                currentPage={currentPage}
                totalPages={totalPages}
                isLoading={loading}
                onPageChange={props.onPageChange}
            />
        </>
    );
}
