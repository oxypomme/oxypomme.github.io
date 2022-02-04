import Masonry from "@mui/lab/Masonry";
import type { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import Animated from "../components/Animated";
import LoadingError from "../components/LoadingError";
import Project from "../components/Project";
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
  const [projects, setProjects] = React.useState<
    StrapiObject<ProjectType>[] | null | undefined
  >(undefined);

  const featured = React.useMemo(
    () => (projects ? projects.filter((p) => p.attributes.featured) : []),
    [projects]
  );
  const other = React.useMemo(
    () => (projects ? projects.filter((p) => !p.attributes.featured) : []),
    [projects]
  );

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await getAPI("projects", locale, {
          populate: ["languages", "technologies", "git"],
        });

        if (data.length) {
          data.reverse();
          setProjects(data);
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
        justifyContent: projects ? undefined : "center",
      }}
    >
      {projects === undefined ? (
        // Loading
        <CircularProgress sx={{ alignSelf: "center" }} />
      ) : projects ? (
        // Projects
        <>
          <Typography variant="h3">
            {localizedStrings.projects[locale]}
          </Typography>
          {/* Featured */}
          <Box sx={{ marginTop: 1, marginBottom: 2 }}>
            <Animated animation="fadeInUp">
              <Typography variant="h4">
                {localizedStrings.interestProjects[locale]}
              </Typography>
            </Animated>
            <Masonry
              columns={{
                xs: 1,
                sm: 2,
                md: 3,
              }}
              spacing={2}
            >
              {featured.map((p) => (
                <Box key={p.id}>
                  <Project p={p.attributes} featured />
                </Box>
              ))}
            </Masonry>
          </Box>
          {/* Other */}
          <Box sx={{ marginTop: 1, marginBottom: 2 }}>
            <Animated animation="fadeInDown">
              <Typography variant="h4">
                {localizedStrings.otherProjects[locale]}
              </Typography>
            </Animated>
            <Masonry
              columns={{
                xs: 1,
                md: 2,
              }}
              spacing={2}
            >
              {other.map((p, i) => (
                <Box key={p.id}>
                  <Project p={p.attributes} rtl={false && i % 2 === 1} />
                </Box>
              ))}
            </Masonry>
          </Box>
          {/* GitHub button */}
          <Box>
            <Button
              size="large"
              href="https://github.com/oxypomme?tab=repositories"
              target="_blank"
              rel="noopener"
              variant="outlined"
            >
              {localizedStrings.moreProjects[locale]}
            </Button>
          </Box>
        </>
      ) : (
        // Error
        <LoadingError />
      )}
    </Stack>
  );
}

export default Projects;
