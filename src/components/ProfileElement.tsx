import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import ReactMarkdown from "react-markdown";
import Animated from "../components/Animated";
import MUIMarkdown from "../components/MUIMarkdown";
import { Diploma, Experience, StrapiAttributes } from "../features/fetchAPI";
import { Locale, localizedStrings } from "../features/languages";

type Props = React.PropsWithoutRef<{
  locale: Locale;
  d: StrapiAttributes<Diploma> | StrapiAttributes<Experience>;
  delay: number;
}>;

function ProfileElement({ locale, d, delay }: Props) {
  const isWork = "role" in d;
  const dateTemplate = isWork ? "MMMM YYYY" : "YYYY";

  return (
    <Animated animation="fadeInUp" delay={delay}>
      <TimelineItem>
        <TimelineOppositeContent variant="overline" color="text.secondary">
          {dayjs(d.start).locale(locale).format(dateTemplate)} -{" "}
          {dayjs(d.end).locale(locale).format(dateTemplate)}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color={isWork ? "primary" : "secondary"}>
            {isWork ? <WorkIcon /> : <SchoolIcon />}
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="h5">
            {d.name}
            {d.isApprentice && (
              <Typography
                sx={{ ml: 2 }}
                variant="subtitle1"
                component="span"
                color="text.secondary"
              >
                {localizedStrings.aprentice[locale]}
              </Typography>
            )}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {d.location}
          </Typography>

          {d.description && (
            <ReactMarkdown components={MUIMarkdown}>
              {d.description}
            </ReactMarkdown>
          )}
        </TimelineContent>
      </TimelineItem>
    </Animated>
  );
}

export default ProfileElement;
