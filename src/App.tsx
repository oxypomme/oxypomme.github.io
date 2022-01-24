import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

function App() {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? "dark" : "light",
				},
			}),
		[prefersDarkMode]
	);

	return (
		<ThemeProvider theme={theme}>
			<Container>
				<Stack>
					<CssBaseline />
					<Header />
					<Profile />
				</Stack>
			</Container>
		</ThemeProvider>
	);
}

export default App;
