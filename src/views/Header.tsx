import { Avatar, Box, Grid, SxProps, Typography } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import Animated from "../components/Animated";
import MUIMarkdown from "../components/MUIMarkdown";
import { Description, getAPI, StrapiAttributes } from "../features/fetchAPI";
import { Locale } from "../features/languages";

type Props = React.PropsWithoutRef<{
  locale: Locale;
  sx?: SxProps;
}>;

function Header({ locale, sx }: Props) {
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
        ...sx,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Animated animation="fadeInUp" delay={0.5}>
        <Typography variant="h2" component="h1">
          SUBLET Tom
        </Typography>
      </Animated>
      {data && (
        <>
          <Animated animation="fadeInUp" delay={1}>
            <Typography variant="subtitle2" sx={{ fontSize: "3em" }}>
              {data.role}
            </Typography>
          </Animated>

          <Animated animation="fadeInUp" delay={1.75}>
            <Grid container spacing={3}>
              {data.avatar && (
                <Grid item xs={12} sm={4} md={2}>
                  <Avatar
                    sx={{ width: "100%", height: "auto" }}
                    variant="rounded"
                    src={data.avatar}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={8} md={10}>
                {data.description && (
                  <ReactMarkdown components={MUIMarkdown}>
                    {data.description}
                  </ReactMarkdown>
                )}
              </Grid>
            </Grid>
          </Animated>
        </>
      )}
    </Box>
  );
}

export default Header;
