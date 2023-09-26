import {Box, Grid, SelectChangeEvent} from "@mui/material";

import PetSearchFilter from "./PetSearchFilter.tsx";
import {distanceDefaultValue, selectDistance, selectSort, sortDefaultValue} from "./selectInput.ts";

type Props = {
    searchParams: URLSearchParams;
    onQueryChange: (name: string, value: string) => void;
    isLoading: boolean;
}
export default function PetSearchFilterList(props: Props) {
    const sort = props.searchParams.get("sort") ?? sortDefaultValue;
    const distance = props.searchParams.get("distance") ?? distanceDefaultValue;

    const handleSortChange = (event: SelectChangeEvent<string>): void => props.onQueryChange("sort", event.target.value)
    const handleDistanceChange = (event: SelectChangeEvent<string>): void => props.onQueryChange("distance", event.target.value)

    return (
        <Grid sx={{display: "flex", justifyContent: "center"}}>
            <Box>
                <PetSearchFilter
                    selectObject={selectSort}
                    currentItem={sort}
                    onSelectChange={handleSortChange}
                    isLoading={props.isLoading}
                />
                <PetSearchFilter
                    selectObject={selectDistance}
                    currentItem={distance}
                    onSelectChange={handleDistanceChange}
                    isLoading={props.isLoading}
                />
            </Box>
        </Grid>
    );
}