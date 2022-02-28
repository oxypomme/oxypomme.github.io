import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import React from "react";
import ReactMarkdown from "react-markdown";
import Animated from "../components/Animated";
import MUIMarkdown from "../components/MUIMarkdown";
import type {
  Diploma,
  Experience,
  StrapiAttributes,
} from "../features/fetchAPI";
import type { Locale } from "../features/languages";
import { localizedStrings } from "../features/languages";

type Props = React.PropsWithoutRef<{
  locale: Locale;
  data: StrapiAttributes<Diploma> | StrapiAttributes<Experience>;
  delay: number;
}>;

/**
 * Timeline element representing a profile element (Diploma or Experience)
 *
 * @param locale The current locale
 * @param data The profile element (Diploma or Experience)
 * @param delay The delay of the animation
 */
function ProfileElement({ locale, data, delay }: Props) {
  const isWork = "role" in data;
  const dateTemplate = isWork ? "MMMM YYYY" : "YYYY";

  return (
    <Animated animation="fadeInUp" delay={delay}>
      <TimelineItem>
        {/* Date */}
        <TimelineOppositeContent variant="overline" color="text.secondary">
          {dayjs(data.start).locale(locale).format(dateTemplate)}-{" "}
          {data.end ? dayjs(data.end).locale(locale).format(dateTemplate) : "?"}
        </TimelineOppositeContent>
        {/* Separator */}
        <TimelineSeparator>
          <TimelineDot color={isWork ? "primary" : "secondary"}>
            {isWork ? <WorkIcon /> : <SchoolIcon />}
          </TimelineDot>
          {data.end ? <TimelineConnector /> : <></>}
        </TimelineSeparator>
        {/* Content */}
        <TimelineContent>
          <Typography variant="h5">
            {data.name}
            {data.isApprentice && (
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
            {data.location}
          </Typography>

          {data.description && (
            <ReactMarkdown components={MUIMarkdown}>
              {data.description}
            </ReactMarkdown>
          )}
        </TimelineContent>
      </TimelineItem>
    </Animated>
  );
}

export default ProfileElement;
