import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Box, CircularProgress, SxProps, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import Animated from "../components/Animated";
import LoadingError from "../components/LoadingError";
import ProfileElement from "../components/ProfileElement";
import {
  Diploma,
  Experience,
  getAPI,
  StrapiObject,
} from "../features/fetchAPI";
import { Locale, localizedStrings } from "../features/languages";

type Props = React.PropsWithoutRef<{
  locale: Locale;
  sx?: SxProps;
}>;

const INIT_DELAY = 1;

function Profile({ locale, sx }: Props) {
  const [data, setData] = React.useState<
    StrapiObject<Diploma | Experience>[] | null | undefined
  >(undefined);
  const lastData = React.useMemo(
    () => (data && data.length > 0 ? data[data.length - 1].attributes : null),
    [data]
  );

  React.useEffect(() => {
    (async () => {
      let timeline: Array<StrapiObject<Diploma> | StrapiObject<Experience>> =
        [];
      try {
        const { data } = await getAPI("diplomes", locale);
        timeline = [...timeline, ...data];
      } catch (error) {}

      try {
        const { data } = await getAPI("experiences", locale);
        timeline = [...timeline, ...data];
      } catch (error) {}

      if (timeline.length > 0) {
        setData(
          timeline.sort(
            (a, b) =>
              // Duration of a
              dayjs(a.attributes.end).diff(dayjs(b.attributes.start)) -
              // Duration of b
              dayjs(b.attributes.end).diff(dayjs(b.attributes.start))
          )
        );
      } else {
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
      }}
    >
      {data === undefined ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <CircularProgress />
        </Box>
      ) : data ? (
        <>
          <Typography variant="h3" sx={{ textAlign: "center" }} gutterBottom>
            {localizedStrings.timeline[locale]}
          </Typography>
          <Timeline sx={{ flexGrow: 0 }}>
            {data.length && (
              <>
                <Animated animation="fadeInUp">
                  <TimelineItem sx={{ minHeight: 0 }}>
                    <TimelineSeparator>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent />
                  </TimelineItem>
                </Animated>
                {data.map(({ attributes }, i) => (
                  <ProfileElement
                    key={i}
                    delay={i * 0.25 + INIT_DELAY}
                    locale={locale}
                    d={attributes}
                  />
                ))}
                <Animated
                  animation="fadeInUp"
                  delay={data.length * 0.25 + INIT_DELAY}
                >
                  <TimelineItem>
                    <TimelineOppositeContent
                      variant="overline"
                      color="text.secondary"
                    >
                      {lastData && lastData.end
                        ? dayjs(lastData.end)
                            .add(1, "month")
                            .locale(locale)
                            .format("MMMM YYYY")
                        : "?"}{" "}
                      - ?
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot color="success">
                        <QuestionMarkIcon />
                      </TimelineDot>
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="h5">
                        {localizedStrings.timelineNext[locale]}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                </Animated>
              </>
            )}
          </Timeline>
        </>
      ) : (
        <LoadingError />
      )}
    </Box>
  );
}

export default Profile;
