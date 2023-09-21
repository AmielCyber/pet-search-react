import type {ReactNode} from "react";
import IconButton from "@mui/material/IconButton";

const iconButtonStyles = {
    opacity: "0.7",
    "&:hover": {
        opacity: "0.9",
    },
};

type Props = {
    onClickNavigation: VoidFunction;
    isNextImage: boolean;
    children: ReactNode;
};

export default function ImageNavigationPointerButton(props: Props) {
    const ariaLabel = props.isNextImage ? "next image" : "previous image";
    return (
        <IconButton aria-label={ariaLabel} color="primary" onClick={props.onClickNavigation} sx={iconButtonStyles}>
            {props.children}
        </IconButton>
    );
}