import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Masonry from "@mui/lab/Masonry";
import { Box, Button, Stack, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import Animated from "../components/Animated";
import Project from "../components/Project";
import {
  getAPI,
  Project as ProjectType,
  StrapiObject,
} from "../features/fetchAPI";
import { Locale, localizedStrings } from "../features/languages";

type Props = {
  locale: Locale;
  sx?: SxProps<Theme>;
};

function Component({ locale, sx }: Props) {
  const [projects, setProjects] = React.useState<StrapiObject<ProjectType>[]>(
    []
  );
  const [pagination, setPagination] = React.useState<
    | {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      }
    | undefined
  >(undefined);

  const featured = React.useMemo(
    () => projects.filter((p) => p.attributes.featured),
    [projects]
  );
  const other = React.useMemo(
    () => projects.filter((p) => !p.attributes.featured),
    [projects]
  );

  React.useEffect(() => {
    (async () => {
      try {
        const { data, meta } = await getAPI("projects", locale, {
          populate: ["languages", "technologies", "git"],
        });
        setProjects(data ?? []);
        setPagination(meta.pagination);
      } catch (error) {
        setProjects([]);
        setPagination(undefined);
      }
    })();
  }, [locale]);

  return (
    <Stack sx={{ ...sx }}>
      <Typography variant="h3">{localizedStrings.projects[locale]}</Typography>
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
      {pagination && pagination.total > pagination.pageSize && (
        <Box>
          <Button
            size="large"
            href="https://github.com/oxypomme?tab=repositories"
          >
            See more
            <OpenInNewIcon />
          </Button>
        </Box>
      )}
    </Stack>
  );
}

export default Component;
