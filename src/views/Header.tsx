import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  SxProps,
  Typography,
} from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import Animated from "../components/Animated";
import LoadingError from "../components/LoadingError";
import MUIMarkdown from "../components/MUIMarkdown";
import ShyText from "../components/ShyText";
import { Description, getAPI, StrapiAttributes } from "../features/fetchAPI";
import { Locale } from "../features/languages";

type Props = React.PropsWithoutRef<{
  locale: Locale;
  sx?: SxProps;
}>;

function Header({ locale, sx }: Props) {
  const [data, setData] = React.useState<
    StrapiAttributes<Description> | null | undefined
  >(undefined);

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
        position: "relative",
      }}
    >
      {data === undefined ? (
        <CircularProgress sx={{ alignSelf: "center", justifySelf: "center" }} />
      ) : data ? (
        <>
          <Animated animation="fadeInUp" delay={0.5}>
            <Typography variant="h2" component="h1">
              {data.name}
            </Typography>
          </Animated>
          <Animated animation="fadeInUp" delay={1}>
            <Typography variant="subtitle2" sx={{ fontSize: "3em" }}>
              {data.role}
            </Typography>
          </Animated>

          <Grid container spacing={3}>
            {data.avatar && (
              <Grid item xs={12} sm={4} md={2}>
                <Animated animation="fadeInUp" delay={0.5}>
                  <Avatar
                    sx={{ width: "100%", height: "auto" }}
                    variant="rounded"
                    src={data.avatar}
                  />
                </Animated>
              </Grid>
            )}
            {data.description && (
              <Grid item xs={12} sm={8} md={10}>
                <Animated animation="fadeInUp" delay={1.75}>
                  <ReactMarkdown components={MUIMarkdown}>
                    {data.description}
                  </ReactMarkdown>
                </Animated>
              </Grid>
            )}
          </Grid>
          <ShyText animation={{ animation: "fadeInDown", delay: 3 }}>
            <DoubleArrowIcon
              sx={{ mx: 1, color: "#222", transform: "rotateZ(90deg)" }}
            />
            See more
            <DoubleArrowIcon
              sx={{ mx: 1, color: "#222", transform: "rotateZ(90deg)" }}
            />
          </ShyText>
        </>
      ) : (
        <LoadingError />
      )}
    </Box>
  );
}

export default Header;
