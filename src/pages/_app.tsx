import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/utils/materialTheme";
// Our components.
import { LocationProvider } from "@/hooks/LocationContext";
import NavBar from "@/components/layout/NavBar";
import Container from "@mui/material/Container";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <LocationProvider>
        <NavBar />
        <Container maxWidth="lg">
          <Component {...pageProps} />
        </Container>
      </LocationProvider>
    </ThemeProvider>
  );
}
