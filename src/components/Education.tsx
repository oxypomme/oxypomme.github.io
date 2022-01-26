import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { Diploma, getAPI, StrapiObject } from "../features/fetchAPI";
import { dayjsLocales, Locale, localizedStrings } from "../features/languages";
import Animated from "./Animated";

function Education() {
  const [locale, setLocale] = React.useState<Locale>(Locale.ENGLISH);
  const [content, setContent] = React.useState<StrapiObject<Diploma>[]>([]);

  React.useEffect(() => {
    (async () => {
      await dayjsLocales[locale]();
      try {
        const { data } = await getAPI("diplomes", locale);
        setContent(data);
      } catch (error) {
        setContent([]);
      }
    })();
  }, [locale]);

  return (
    <Stack spacing={2}>
      <Animated animation="fadeInDown">
        <Typography variant="h3">
          {localizedStrings.education[locale]}
        </Typography>
      </Animated>
      {content &&
        content.map(({ attributes }, i) => {
          const { start, end, name, description, isApprentice, logo } =
            attributes;

          return (
            <Animated animation="fadeInLeft" key={i}>
              <Card variant="outlined" sx={{ display: "flex" }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="overline">
                    {dayjs(start).locale(locale).format("YYYY")} -{" "}
                    {dayjs(end).locale(locale).format("YYYY")}
                  </Typography>
                  <Typography variant="h5">{name}</Typography>
                  {isApprentice && (
                    <Typography variant="subtitle1" gutterBottom>
                      {localizedStrings.aprentice[locale]}
                    </Typography>
                  )}
                  {description && (
                    <Typography variant="body1">{description}</Typography>
                  )}
                </CardContent>
                {logo && (
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={logo}
                    alt={name + " logo"}
                  />
                )}
              </Card>
            </Animated>
          );
        })}
    </Stack>
  );
}

export default Education;
