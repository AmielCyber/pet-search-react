import {IconButton} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

type Props = {
    isDarkMode: boolean;
    onToggleDarkMode: VoidFunction;
};

export default function ToggleThemeButton(props: Props){
    const toggleThemeTitle = props.isDarkMode? "Toggle Light Mode" : "Toggle Dark Mode";

    return (
        <IconButton onClick={props.onToggleDarkMode} color="inherit" title={toggleThemeTitle}>
            {props.isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
    )

}