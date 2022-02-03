import { Stack } from "@mui/material";
import { orange } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, SxProps, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import LazyPanel from "./components/LazyPanel";
import LocaleFab from "./components/LocaleFab";
import { dayjsLocales, Locale } from "./features/languages";
import Header from "./views/Header";
import Profile from "./views/Profile";
import Projects from "./views/Projects";

const sx: SxProps = {
  width: "100% !important",
  minHeight: { sm: "100vh" },
  py: "5vh",
  px: {
    xs: 2,
    sm: 3,
  },
};

function App() {
  const [locale, setLocale] = React.useState(Locale.FRENCH);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  React.useEffect(() => {
    // Import dayjs locale
    (async () => await dayjsLocales[locale]())();
  }, [locale]);

  React.useEffect(() => {
    const searchLocale = new URLSearchParams(window.location.search).get("l");

    if (searchLocale && Object.values<string>(Locale).includes(searchLocale)) {
      setLocale(searchLocale as Locale);
    }
  }, []);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: {
            main: orange[800], // "#ef6c00"
          },
          secondary: {
            main: "#007dff",
          },
        },
      }),
    [prefersDarkMode]
  );

  const onLocaleClick = (e: React.MouseEvent, l: Locale) => {
    e.preventDefault();

    // Set locale in URL
    const search = new URLSearchParams(window.location.search);
    search.set("l", l);
    window.history.replaceState(
      null,
      "",
      window.location.pathname + "?" + search.toString()
    );

    setLocale(l);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocaleFab locale={locale} onClick={onLocaleClick} />
      <CssBaseline />
      <Stack
        sx={{
          scrollSnapType: "y mandatory",
          height: "100vh",
          overflow: "auto",
          px: {
            xs: 2,
            sm: 3,
          },
        }}
        className="mandatory-scroll-container"
      >
        <LazyPanel overflow>
          <Header locale={locale} sx={sx} />
        </LazyPanel>
        <LazyPanel overflow>
          <Profile locale={locale} sx={sx} />
        </LazyPanel>
        <LazyPanel align="start" overflow>
          <Projects locale={locale} sx={sx} />
        </LazyPanel>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
