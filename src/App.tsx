import {useMemo, useState} from "react";
import {Container, CssBaseline, responsiveFontSizes, SxProps, Theme, ThemeProvider} from "@mui/material";
import {SnackbarProvider} from "notistack";
import {Outlet, ScrollRestoration} from "react-router-dom";
// Our imports.
import {darkModeTheme, lightModeTheme} from "./theme/materialTheme";
import useMediaQuery from '@mui/material/useMediaQuery';
import {LocationProvider} from "./hooks/LocationContext";
import TopNavigationBar from "./components/navbar/TopNavigationBar.tsx";

const containerSx: SxProps<Theme> = {
    paddingBottom: "2rem"
}

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(
        useMediaQuery('(prefers-color-scheme: dark)')
    );

    const handleToggleDarkMode = () => {
        setIsDarkMode((currIsDarkMode) => !currIsDarkMode);
    };

    const theme =
        useMemo(() => isDarkMode ? responsiveFontSizes(darkModeTheme) : responsiveFontSizes(lightModeTheme), [isDarkMode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <SnackbarProvider autoHideDuration={3000} dense={true} maxSnack={2}/>
            <LocationProvider>
                <TopNavigationBar isDarkMode={isDarkMode} onToggleDarkMode={handleToggleDarkMode}/>
                <Container maxWidth="xl" sx={containerSx}>
                    <ScrollRestoration/>
                    <Outlet/>
                </Container>
            </LocationProvider>
        </ThemeProvider>
    );
}
