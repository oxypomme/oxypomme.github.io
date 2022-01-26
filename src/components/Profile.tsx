import { Grid } from "@mui/material";
import React from "react";
import type { Locale } from "../features/languages";
import Education from "./Education";
import Experience from "./Experience";

type Props = React.PropsWithoutRef<{
  locale: Locale;
}>;

function Profile({ locale }: Props) {
  return (
    <Grid container spacing={24} sx={{ height: "100vh" }}>
      <Grid item xs={6}>
        <Education locale={locale} />
      </Grid>
      <Grid item xs={6}>
        <Experience locale={locale} />
      </Grid>
    </Grid>
  );
}

export default Profile;
