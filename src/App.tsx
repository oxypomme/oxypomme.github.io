import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { dayjsLocales, Locale } from "./features/languages";
import LocaleFab from "./components/LocaleFab";

function App() {
  const [locale, setLocale] = React.useState(Locale.ENGLISH);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

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
          <Header locale={locale} />
          <Profile locale={locale} />
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
