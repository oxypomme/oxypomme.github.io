import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import LocaleFab from "./components/LocaleFab";
import { dayjsLocales, Locale } from "./features/languages";
import Header from "./views/Header";
import Profile from "./views/Profile";

const MainStack = styled(Stack)`
  > * {
    width: 100% !important;
    height: 100vh;
    padding: 5vh 0;
  }
`;

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
        <MainStack>
          <Header locale={locale} />
          <Profile locale={locale} />
        </MainStack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
