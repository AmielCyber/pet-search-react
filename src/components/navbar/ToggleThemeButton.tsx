import {IconButton} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

type Props = {
    isDarkMode: boolean;
    onToggleDarkMode: VoidFunction;
};

export default function ToggleThemeButton(props: Props){
    const toggleDarkModeTitle = props.isDarkMode? "Light Mode" : "Dark Mode";

    return (
        <IconButton onClick={props.onToggleDarkMode} color="inherit" title={toggleDarkModeTitle}>
            {props.isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
    )

}