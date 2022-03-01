import GitHub from "@mui/icons-material/GitHub";
import Masonry from "@mui/lab/Masonry";
import { Container, SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import React from "react";
import LoadingError from "../components/LoadingError";
import Project from "../components/Project";
import type {
  Project as ProjectType,
  StrapiObject,
} from "../features/fetchAPI";
import getAPI from "../features/fetchAPI";
import type { Locale } from "../features/languages";
import { localizedStrings } from "../features/languages";
import { ReactComponent as GitLabIcon } from "../icons/gitlab.svg";

const iconSx: SxProps = {
  ml: 0.5,
  fontSize: 20,
};

const GitLab = <SvgIcon component={GitLabIcon} inheritViewBox sx={iconSx} />;

type Props = React.PropsWithoutRef<{
  locale: Locale;
  sx?: SxProps;
}>;

function Projects({ locale, sx }: Props) {
  const [projects, setProjects] = React.useState<
    StrapiObject<ProjectType>[] | null | undefined
  >(undefined);

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
    <Box
      sx={{
        ...sx,
        overflow: "auto",
        justifyContent: projects ? undefined : "center",
      }}
      className="mandatory-scroll-container"
    >
      <Container>
        {projects === undefined ? (
          // Loading
          <CircularProgress sx={{ alignSelf: "center" }} />
        ) : projects ? (
          // Projects
          <>
            <Typography
              variant="h2"
              component="h1"
              sx={{ textAlign: "center", mt: 3 }}
            >
              {localizedStrings.projects[locale]}
            </Typography>
            <Box sx={{ marginTop: 1, marginBottom: 2 }}>
              <Masonry
                columns={{
                  xs: 1,
                  sm: 2,
                  md: 2,
                }}
                spacing={2}
              >
                {projects.map((p) => (
                  <Box key={p.id}>
                    <Project
                      data={p.attributes}
                      locale={locale}
                      featured={p.attributes.featured}
                    />
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
                {localizedStrings.githubProjects[locale]}
                <GitHub sx={iconSx} />
              </Button>
              <Button
                size="large"
                href="https://gitlab.com/users/oxypomme/contributed"
                target="_blank"
                rel="noopener"
                variant="outlined"
                sx={{ ml: 2 }}
              >
                {localizedStrings.gitlabProjects[locale]}
                {GitLab}
              </Button>
            </Box>
          </>
        ) : (
          // Error
          <LoadingError />
        )}
      </Container>
    </Box>
  );
}

export default Projects;
