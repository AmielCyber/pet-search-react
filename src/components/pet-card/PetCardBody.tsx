import {Typography} from "@mui/material";

const textStyles = {
    marginBottom: "16px",
    textAlign: "center"
};
const headingStyles = {
    marginBottom: "6px",
    textAlign: "center"
};

type PetCardBodyProps = {
    name: string;
    age: string;
    gender: string;
    distance: number | null;
}
export function PetCardBody(props: PetCardBodyProps) {
    const distanceMessage = props.distance ? props.distance.toFixed(1) + " miles" : "nearby";

    return(
        <>
            <Typography variant="h6" noWrap sx={headingStyles}>{props.name}</Typography>
            <Typography sx={textStyles}>
                {props.age} {props.gender}
                <br/>
                {distanceMessage}
            </Typography>
        </>
    );
}