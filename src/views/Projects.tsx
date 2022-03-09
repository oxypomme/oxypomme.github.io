import { ArrowRight } from "@mui/icons-material";
import Masonry from "@mui/lab/Masonry";
import type { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Animated from "../components/Animated";
import LoadingError from "../components/LoadingError";
import Project from "../components/Project";
import ShyText from "../components/ShyText";
import type {
  Project as ProjectType,
  StrapiObject,
} from "../features/fetchAPI";
import getAPI from "../features/fetchAPI";
import type { Locale } from "../features/languages";
import { localizedStrings } from "../features/languages";

type Props = React.PropsWithoutRef<{
  locale: Locale;
  sx?: SxProps;
}>;

function Projects({ locale, sx }: Props) {
  const [searchParams] = useSearchParams();

  const [projects, setProjects] = React.useState<
    StrapiObject<ProjectType>[] | null | undefined
  >(undefined);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await getAPI("projects", locale, {
          populate: ["languages", "technologies", "git", "image"],
        });

        if (data.length) {
          data.reverse();
          setProjects(data.filter((p) => p.attributes.featured));
        } else {
          throw new Error("No Data");
        }
      } catch (error) {
        setProjects(null);
      }
    })();
  }, [locale]);

  return (
    <Stack
      sx={{
        ...sx,
        justifyContent: "center",
      }}
    >
      {projects === undefined ? (
        // Loading
        <CircularProgress sx={{ alignSelf: "center" }} />
      ) : projects ? (
        // Projects
        <>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            {localizedStrings.projects[locale]}
          </Typography>

          <Box sx={{ marginTop: 1, marginBottom: 2 }}>
            <Masonry
              columns={{
                xs: 1,
                sm: 2,
                md: 3,
              }}
              spacing={2}
            >
              {projects.map((p, i) => (
                <Box key={p.id}>
                  <Project
                    data={p.attributes}
                    featured
                    locale={locale}
                    animation="fadeInRight"
                    delay={(i + 1) / 3}
                  />
                </Box>
              ))}
            </Masonry>
          </Box>
          {/* TLDR */}
          <Animated animation="fadeInUp" delay={1.25}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 4,
                pb: 6,
              }}
            >
              <Typography
                variant="h4"
                component="p"
                sx={{ textAlign: "center", mb: 2 }}
              >
                {localizedStrings.projectsPageLink[locale]}
              </Typography>
              <Button
                size="large"
                variant="outlined"
                component={Link}
                to={{ pathname: "/projects", search: searchParams.toString() }}
              >
                {localizedStrings.moreProjects[locale]}
                <ArrowRight />
              </Button>

              <ShyText
                animation={{ animation: "fadeInDown", repeat: false }}
                variant="h5"
                sx={{ bottom: 0 }}
              >
                {localizedStrings.tooMuchProjects[locale]}
              </ShyText>
            </Box>
          </Animated>
        </>
      ) : (
        // Error
        <LoadingError />
      )}
    </Stack>
  );
}

export default Projects;
