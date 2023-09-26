import Typography from "@mui/material/Typography";

const titleStyles = {
    textAlign: "center",
    marginBottom: "1rem",
    marginTop: "2rem",
};

const bodyStyles = {
    textAlign: "center",
};

const zipStyles = {
    textAlign: "center",
    marginBottom: "20px",
};

type Props = {
    locationName: string;
    petType: string;
    totalCount: number
};
export default function PetSearchHeader(props: Props) {
    return (
        <>
            <Typography sx={titleStyles} variant="h2" >
                Adoptable {props.petType}s near
            </Typography>
            <Typography sx={zipStyles} variant="subtitle1">
                {props.locationName}
            </Typography>
            {props.totalCount > 0 && (
                <Typography sx={bodyStyles} variant="body1">
                    Displaying {props.totalCount} {props.petType}s
                </Typography>
            )}
        </>
    );
}
