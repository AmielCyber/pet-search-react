import IconButton from "@mui/material/IconButton";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

const outlinedCircleStyle = {
    "&:hover": {
        backgroundColor: "rgb(189,189,189,0.4)",
    },
};

type Props = {
    isCurrentImage: boolean;
    imageNumber: number;
    onNavigateImage: (index: number) => void;
};

export default function ImageNavigationButton(props: Props) {
    const ariaLabel = props.isCurrentImage ?
        `Current image ${props.imageNumber + 1}` : `Select image ${props.imageNumber + 1}`
    return (
        <li>
            <IconButton
                aria-label={ariaLabel}
                disabled={props.isCurrentImage}
                onClick={!props.isCurrentImage ? () => props.onNavigateImage(props.imageNumber) : undefined}
                sx={!props.isCurrentImage ? outlinedCircleStyle : undefined}
            >
                {props.isCurrentImage ? (
                    <CircleIcon fontSize="medium" color="primary"/>
                ) : (
                    <CircleOutlinedIcon fontSize="medium" color="primary"/>
                )}
            </IconButton>
        </li>
    );
}
