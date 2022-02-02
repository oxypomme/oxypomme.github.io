import { Stack } from "@mui/material";
// import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, SxProps, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
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
  scrollSnapAlign: "center",
};

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
        <Header locale={locale} sx={sx} />
        <Profile locale={locale} sx={sx} />
        <Projects locale={locale} sx={sx} />
      </Stack>
    </ThemeProvider>
  );
}

export default App;
