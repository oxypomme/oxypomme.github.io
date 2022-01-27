import { Grid } from "@mui/material";
import React from "react";
import Education from "../components/Education";
import Experience from "../components/Experience";
import type { Locale } from "../features/languages";

type Props = React.PropsWithoutRef<{
  locale: Locale;
}>;

function Profile({ locale }: Props) {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Education locale={locale} />
      </Grid>
      <Grid item xs={6} sx={{ textAlign: "right" }}>
        <Experience locale={locale} />
      </Grid>
    </Grid>
  );
}

export default Profile;
