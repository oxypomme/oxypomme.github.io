import React from "react";
import { Avatar, Box, Typography, Container } from "@mui/material";
import ReactMarkdown from "react-markdown";
import Animated from "./Animated";
import { getAPI, StrapiAttributes, Description } from "../features/fetchAPI";
import MUIMarkdown from "./MUIMarkdown";
import { Locale } from "../features/languages";

type Props = React.PropsWithoutRef<{
  locale: Locale;
}>;

function Header({ locale }: Props) {
  const [data, setData] = React.useState<StrapiAttributes<Description> | null>(
    null
  );

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await getAPI("description", locale);
        setData(data?.attributes ?? null);
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
      {data && (
        <Animated animation="fadeInUp" delay={1.75}>
          <Box sx={{ display: "flex" }}>
            {data.avatar && (
              <Avatar
                sx={{ width: "156px", height: "auto", marginRight: "24px" }}
                variant="rounded"
                src={data.avatar}
              />
            )}
            <div>
              {data.description && (
                <ReactMarkdown components={MUIMarkdown}>
                  {data.description}
                </ReactMarkdown>
              )}
            </div>
          </Box>
        </Animated>
      )}
    </Box>
  );
}

export default Header;
