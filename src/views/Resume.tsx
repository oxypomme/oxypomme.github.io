import { DoDisturbAltSharp, Download } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  SxProps,
  Typography,
  Zoom,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import Hexagon from "react-hexagon";
import LoadingError from "../components/LoadingError";
import type {
  Description,
  ProgConcept,
  StrapiAttributes,
  StrapiObject,
} from "../features/fetchAPI";
import getAPI from "../features/fetchAPI";
import { Locale, localizedStrings } from "../features/languages";

type Props = React.PropsWithoutRef<{
  locale: Locale;
  sx?: SxProps;
}>;

function Resume({ locale, sx }: Props) {
  const [data, setData] = React.useState<
    StrapiAttributes<Description> | null | undefined
  >(undefined);

  const [langs, setLangs] = React.useState<
    StrapiObject<ProgConcept>[] | null | undefined
  >(undefined);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await getAPI("languages", locale, {
          populate: ["logo"],
        });
        setLangs(data.filter(({ attributes }) => attributes.featured) ?? null);
      } catch (error) {
        setLangs(null);
      }
      try {
        const { data } = await getAPI("description", locale);
        setData(data?.attributes ?? null);
      } catch (error) {
        setData(null);
      }
    })();
  }, [locale]);

  return (
    <Container sx={{ ...sx, alignItems: "center", display: "flex" }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={6}
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
            "& > :nth-of-type(5)": {
              ml: "65px",
            },
            "& > :nth-of-type(n+5)": {
              mt: "-25px",
            },
            flexWrap: "wrap",
          }}
        >
          {langs === undefined ? (
            <CircularProgress
              sx={{ alignSelf: "center", justifySelf: "center" }}
            />
          ) : langs ? (
            langs.map(({ attributes }, i) => (
              <Zoom
                key={i}
                in
                style={{ transitionDelay: (i + 1) * 250 + "ms" }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: "115px",
                    width: "100px",
                    m: 1,
                    "& > svg image": {
                      x: -93.75,
                      y: -55,
                    },
                  }}
                >
                  <Box
                    sx={{
                      zIndex: -1,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      color: attributes.color ?? "secondary",
                    }}
                  >
                    {attributes.name}
                  </Box>
                  <Hexagon
                    backgroundImage={
                      attributes.logo?.data?.attributes.url ?? undefined
                    }
                    backgroundScale={1.25}
                    style={{
                      stroke: attributes.color ?? "transparent",
                    }}
                  />
                </Box>
              </Zoom>
            ))
          ) : (
            <LoadingError />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            my: "auto",
          }}
        >
          {DoDisturbAltSharp === undefined ? (
            <CircularProgress
              sx={{ alignSelf: "center", justifySelf: "center" }}
            />
          ) : data ? (
            <>
              <Typography>{data.resume}</Typography>
              <Button
                sx={{ pt: 2 }}
                href={`https://oxypomme.fr/CV/SUBLET.${locale}.pdf`}
                target="_blank"
              >
                <Download /> {localizedStrings.openCV[locale]}
              </Button>
            </>
          ) : (
            <LoadingError />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Resume;
