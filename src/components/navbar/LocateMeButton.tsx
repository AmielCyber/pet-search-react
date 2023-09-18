import {IconButton} from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";

type Props = {
    onLocateMe: VoidFunction;
    loadingNewZipcode: boolean;
}
export default function LocateMeButton(props: Props) {
    return (
        <IconButton color="inherit" title="Locate Me!" onClick={props.onLocateMe} disabled={props.loadingNewZipcode}>
            <NearMeIcon/>
        </IconButton>
    );
}