import type { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import LoadingError from "../components/LoadingError";
import type { Description, StrapiAttributes } from "../features/fetchAPI";
import type { Locale } from "../features/languages";

type Props = React.PropsWithoutRef<{
  locale: Locale;
  sx?: SxProps;
}>;

function Contact({ locale, sx }: Props) {
  const [data, setData] = React.useState<
    StrapiAttributes<Description> | null | undefined
  >(undefined);

  React.useEffect(() => {
    (async () => {
      try {
        // const { data } = await getAPI("description", locale);
        // setData(data?.attributes ?? null);
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
        <></>
      ) : (
        <LoadingError />
      )}
    </Box>
  );
}

export default Contact;
