import { Stack } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  SxProps,
  Theme,
  ThemeProvider,
} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import LocaleFab from "./components/LocaleFab";
import { dayjsLocales, Locale } from "./features/languages";
import Header from "./views/Header";
import Profile from "./views/Profile";
import Projects from "./views/Projects";

function App() {
  const [locale, setLocale] = React.useState(Locale.ENGLISH);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const sx: SxProps<Theme> = {
    width: "100% !important",
    height: { sm: "100vh" },
    padding: "5vh 0",
  };

  React.useEffect(() => {
    // Import dayjs locale
    (async () => await dayjsLocales[locale]())();
  }, [locale]);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const onLocaleClick = (e: React.MouseEvent, l: Locale) => {
    e.preventDefault();
    setLocale(l);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocaleFab locale={locale} onClick={onLocaleClick} />
      <CssBaseline />
      <Container>
        <Stack>
          <Header locale={locale} sx={sx} />
          <Profile locale={locale} sx={sx} />
          <Projects locale={locale} sx={sx} />
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
