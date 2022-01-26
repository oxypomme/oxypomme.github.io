import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import Animated from "./Animated";
import {
  Experience as ExperienceData,
  getAPI,
  StrapiObject,
} from "../features/fetchAPI";
import dayjs from "dayjs";
import { Locale, localizedStrings } from "../features/languages";

type Props = React.PropsWithoutRef<{
  locale: Locale;
}>;

function Experience({ locale }: Props) {
  const [content, setContent] = React.useState<StrapiObject<ExperienceData>[]>(
    []
  );

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await getAPI("experiences", locale);
        setContent(data);
      } catch (error) {
        setContent([]);
      } finally {
      }
    })();
  }, [locale]);

  return (
    <Stack spacing={2}>
      <Animated animation="fadeInDown">
        <Typography variant="h3">
          {localizedStrings.experience[locale]}
        </Typography>
      </Animated>
      {content &&
        content.map(({ attributes }, i) => {
          const { start, end, name, description, role, logo } = attributes;

          return (
            <Animated animation="fadeInRight" key={i}>
              <Card variant="outlined" sx={{ display: "flex" }}>
                {logo && (
                  <CardMedia
                    component="img"
                    sx={{ width: 156 }}
                    image={logo}
                    alt={name + " logo"}
                  />
                )}
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="overline">
                    {dayjs(start).locale(locale).format("MMMM YYYY")}{" "}
                    {end &&
                      `- ${dayjs(end).locale(locale).format("MMMM YYYY")}`}
                  </Typography>
                  <Typography variant="h5">{name}</Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {role}
                  </Typography>
                  {description && (
                    <Typography variant="body1">{description}</Typography>
                  )}
                </CardContent>
              </Card>
            </Animated>
          );
        })}
    </Stack>
  );
}

export default Experience;
