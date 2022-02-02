import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Diploma, getAPI, StrapiObject } from "../features/fetchAPI";
import { Locale, localizedStrings } from "../features/languages";
import Animated from "./Animated";
import MUIMarkdown from "./MUIMarkdown";

type Props = React.PropsWithoutRef<{
  locale: Locale;
}>;

function Education({ locale }: Props) {
  const [content, setContent] = React.useState<StrapiObject<Diploma>[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await getAPI("diplomes", locale);
        setContent(data);
      } catch (error) {
        setContent([]);
      }
    })();
  }, [locale]);

  return (
    <Stack spacing={2} sx={{ width: { sm: "95%", md: "75%" } }}>
      <Animated animation="fadeInDown">
        <Typography variant="h3">
          {localizedStrings.education[locale]}
        </Typography>
      </Animated>
      {content &&
        content.map(({ attributes }, i) => {
          const {
            start,
            end,
            name,
            description,
            isApprentice,
            logo,
            location,
          } = attributes;

          return (
            <Animated animation="fadeInLeft" key={i}>
              <Card variant="outlined" sx={{ display: "flex", p: 1 }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="overline">
                    {dayjs(start).locale(locale).format("YYYY")} -{" "}
                    {dayjs(end).locale(locale).format("YYYY")}
                  </Typography>
                  <Typography variant="h5">{name}</Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {location}
                  </Typography>
                  {isApprentice && (
                    <Typography variant="subtitle1" gutterBottom>
                      {localizedStrings.aprentice[locale]}
                    </Typography>
                  )}
                  {description && (
                    <ReactMarkdown components={MUIMarkdown}>
                      {description}
                    </ReactMarkdown>
                  )}
                </CardContent>
                {logo && (
                  <CardMedia
                    component="img"
                    sx={{ width: 156, height: "100%", alignSelf: "center" }}
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
