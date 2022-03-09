import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { orange } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import Footer from "./components/Footer";
import HomeFab from "./components/HomeFab";
import LocaleFab from "./components/LocaleFab";
import { dayjsLocales, Locale } from "./features/languages";
import BlogPage from "./pages/BlogPage";
import HomePage from "./pages/HomePage";

const ProjectPage = React.lazy(() => import("./pages/ProjectPage"));

function PageLoader() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItms: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

function App() {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [locale, setLocale] = React.useState(Locale.FRENCH);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  React.useEffect(() => {
    // Import dayjs locale
    (async () => await dayjsLocales[locale]())();
  }, [locale]);

  React.useEffect(() => {
    const searchLocale = searchParams.get("l");

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
    setSearchParams({ ...searchParams, l }, { replace: true });

    setLocale(l);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <LocaleFab locale={locale} onClick={onLocaleClick} />
      <HomeFab show={pathname !== "/"} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          "> :first-of-type": {
            flex: 1,
            pb: 2,
          },
        }}
      >
        <Routes>
          <Route index element={<HomePage locale={locale} />} />
          <Route
            path="/projects"
            element={
              <React.Suspense fallback={<PageLoader />}>
                <ProjectPage locale={locale} />
              </React.Suspense>
            }
          />
          <Route
            path="/blog"
            element={
              <React.Suspense fallback={<PageLoader />}>
                <BlogPage locale={locale} />
              </React.Suspense>
            }
          />
        </Routes>
        <Box>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
