import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

import {SelectFormType} from "./selectInput.ts";

type Props = {
    selectObject: SelectFormType<string | number>
    currentItem: string;
    onSelectChange:   (event: SelectChangeEvent) => void;
    isLoading: boolean;
}
export default function PetSearchFilter(props: Props) {
    return (
        <FormControl sx={{m: 1, minWidth: 140}} size="small" disabled={props.isLoading}>
            <InputLabel id={props.selectObject.label}>{props.selectObject.label}</InputLabel>
            <Select
                labelId={props.selectObject.label}
                id={props.selectObject.label}
                value={props.currentItem}
                label={props.selectObject.label}
                onChange={props.onSelectChange}
            >
                {props.selectObject.valueItems.map((val, i) =>
                    <MenuItem key={i} value={val}>
                        {props.selectObject.displayItems[i]}
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    );
}