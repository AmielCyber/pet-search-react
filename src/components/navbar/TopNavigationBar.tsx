import {AppBar, Box, Toolbar,} from "@mui/material";

import HomeLink from "./HomeLink.tsx";
import LocationButtons from "./LocationButtons.tsx";
import ToggleThemeButton from "./ToggleThemeButton.tsx";

type Props = {
    isDarkMode: boolean;
    onToggleDarkMode: VoidFunction;
};

export default function TopNavigationBar(props: Props) {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <HomeLink/>
                    <LocationButtons/>
                    <ToggleThemeButton isDarkMode={props.isDarkMode} onToggleDarkMode={props.onToggleDarkMode}/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
