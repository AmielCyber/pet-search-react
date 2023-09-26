export interface SelectFormType<T> {
    label: string;
    defaultDisplayItem: string;
    valueItems: T[];
    displayItems: string[];
}

const distanceLabel = "Distance";
const distanceValues = [5, 10, 25, 50];
export const distanceDefaultValue = distanceValues[2].toString();
const distanceTextItems = distanceValues.map(val => val + " miles");

export const selectDistance: SelectFormType<number> =  {
    label: distanceLabel,
    defaultDisplayItem: distanceDefaultValue,
    valueItems: distanceValues,
    displayItems: distanceTextItems,
}

const sortLabel = "Sort By";
const sortValues = ["distance", "-distance", "recent", "-recent"];
export const sortDefaultValue = sortValues[0];
const sortTextItems = ["Nearest", "Furthest", "Recent" ,"Recent Desc"];

export const selectSort: SelectFormType<string> = {
    label: sortLabel,
    defaultDisplayItem: sortDefaultValue,
    valueItems: sortValues,
    displayItems: sortTextItems,
}