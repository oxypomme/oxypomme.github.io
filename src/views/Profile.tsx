import { Grid, SxProps, Theme } from "@mui/material";
import React from "react";
import Education from "../components/Education";
import Experience from "../components/Experience";
import type { Locale } from "../features/languages";

type Props = React.PropsWithoutRef<{
  locale: Locale;
  sx?: SxProps<Theme>;
}>;

function Profile({ locale, sx }: Props) {
  return (
    <Grid container sx={{ ...sx }}>
      <Grid item xs={12} sm={6}>
        <Education locale={locale} />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ textAlign: { sm: "right" } }}>
        <Experience locale={locale} />
      </Grid>
    </Grid>
  );
}

export default Profile;
