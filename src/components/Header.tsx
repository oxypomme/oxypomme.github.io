import React from "react";
import { Box, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import Animated from "./Animated";
import { getAPI, StrapiAttributes, Description } from "../features/fetchAPI";
import MUIMarkdown from "./MUIMarkdown";
import { Locale } from "../features/languages";

function Header() {
  const [locale, setLocale] = React.useState<Locale>(Locale.ENGLISH);
  const [data, setData] = React.useState<StrapiAttributes<Description> | null>(
    null
  );

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await getAPI("description", locale);
        setData(data.attributes);
      } catch (error) {
        setData(null);
      }
    })();
  }, [locale]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Animated animation="fadeInUp">
        <Typography variant="h1">SUBLET Tom</Typography>
      </Animated>
      {data && (
        <Animated animation="fadeInUp" delay={1}>
          <Typography variant="subtitle2" sx={{ fontSize: "3em" }}>
            {data.role}
          </Typography>
        </Animated>
      )}
      {data && data.description && (
        <Animated animation="fadeInUp" delay={1.75}>
          <ReactMarkdown components={MUIMarkdown}>
            {data.description}
          </ReactMarkdown>
        </Animated>
      )}
    </Box>
  );
}

export default Header;
