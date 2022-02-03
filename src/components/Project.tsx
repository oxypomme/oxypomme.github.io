import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNew from "@mui/icons-material/OpenInNew";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Fade,
  Modal,
  SvgIcon,
  SxProps,
  Typography,
} from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import Animated from "../components/Animated";
import MUIMarkdown from "../components/MUIMarkdown";
import {
  EGitProvider,
  EProjectType,
  ProgConcept,
  Project as ProjectType,
  StrapiObject,
} from "../features/fetchAPI";
import { ReactComponent as GitIcon } from "../icons/git.svg";
import { ReactComponent as GitLabIcon } from "../icons/gitlab.svg";

const iconSx: SxProps = {
  mr: 0.5,
  fontSize: 20,
};

type ConceptsProps = React.PropsWithoutRef<{
  concepts?: { data: StrapiObject<ProgConcept>[] };
  sx?: SxProps;
  inline?: boolean;
}>;

function ProjectConcepts({ concepts, sx, inline }: ConceptsProps) {
  if (!concepts) {
    return <></>;
  }

  return (
    <Box sx={{ ...sx, mt: inline ? undefined : 1 }}>
      {concepts.data.map((l) => (
        <Chip
          key={l.id}
          label={l.attributes.name}
          sx={{
            backgroundColor: l.attributes.color,
            mr: inline ? undefined : 1,
            ml: inline ? 1 : undefined,
          }}
          size="small"
        />
      ))}
    </Box>
  );
}

type ActionProps = React.PropsWithoutRef<{
  project: ProjectType;
}>;

function ProjectActions({ project }: ActionProps) {
  const ProviderIcon = React.useMemo(() => {
    if (project.git) {
      switch (project.git.provider) {
        case EGitProvider.GITHUB:
          return <GitHubIcon sx={iconSx} />;
        case EGitProvider.GITLAB:
          return <SvgIcon component={GitLabIcon} inheritViewBox sx={iconSx} />;
        default:
          return <SvgIcon component={GitIcon} inheritViewBox sx={iconSx} />;
      }
    }
    return <></>;
  }, [project]);

  const openLink = (e: React.MouseEvent, url?: string): void => {
    e.stopPropagation();
    if (url || project.url) {
      window.open(url ?? project.url, "_blank", "noopener")?.focus();
    }
  };

  return (
    <>
      {project.git && (
        <Button
          size="small"
          color="primary"
          onClick={(e) => openLink(e, project.git?.url)}
        >
          {ProviderIcon}
          {project.git.provider}
        </Button>
      )}
      {project.url && (
        <Button size="small" color="primary" onClick={(e) => openLink(e)}>
          <OpenInNew sx={iconSx} />
          Open
        </Button>
      )}
    </>
  );
}

type ImageProps = React.PropsWithoutRef<{
  imageURL: string;
  alt: string;
  featured?: boolean;
}>;

function ProjectImage({ imageURL, alt, featured }: ImageProps) {
  return (
    <CardMedia
      component="img"
      sx={{
        aspectRatio: "16/9",
        height: featured ? undefined : "100%",
      }}
      image={imageURL}
      alt={alt}
    />
  );
}

type Props = React.PropsWithoutRef<{
  rtl?: boolean;
  featured?: boolean;
  p: ProjectType;
}>;

function Project({ rtl, p, featured }: Props) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const type = React.useMemo(() => {
    switch (p.type) {
      case EProjectType.PERSONAL:
        return "💡 Personal project";

      case EProjectType.SCHOOL:
        return "🎓 School project";

      default:
        break;
    }
    return "";
  }, [p]);

  const modalOpen = (e: React.MouseEvent): void => {
    if (p.description) {
      setIsModalOpen(true);
    }
  };
  const modalClose = (e: React.MouseEvent): void => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Card */}
      <Animated animation="fadeIn">
        <CardActionArea
          component="div"
          disableTouchRipple={!p.description}
          sx={{ cursor: p.description ? "pointer" : "inherit" }}
          onClick={modalOpen}
        >
          <Card variant="outlined">
            <Box
              sx={{
                display: featured ? undefined : "flex",
                flexDirection: rtl ? "row-reverse" : undefined,
                textAlign: rtl ? "right" : undefined,
              }}
            >
              {p.imageURL && (
                <Box
                  sx={{
                    width: featured ? undefined : "35%",
                    display: featured
                      ? undefined
                      : {
                          xs: "none",
                          sm: "block",
                        },
                  }}
                >
                  <ProjectImage
                    imageURL={p.imageURL}
                    alt={`${p.name} screenshot`}
                    featured={featured}
                  />
                </Box>
              )}
              <Box sx={{ flex: 1 }}>
                <CardContent>
                  <Typography variant="overline">{type}</Typography>
                  <Typography variant="h5">{p.name}</Typography>
                  {p.goal && (
                    <Typography variant="subtitle1" gutterBottom>
                      <ReactMarkdown components={MUIMarkdown}>
                        {p.goal}
                      </ReactMarkdown>
                    </Typography>
                  )}
                  <ProjectConcepts concepts={p.languages} />
                  <ProjectConcepts concepts={p.technologies} />
                </CardContent>
                <CardActions>
                  <ProjectActions project={p} />
                </CardActions>
              </Box>
            </Box>
          </Card>
        </CardActionArea>
      </Animated>
      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={modalClose}
        closeAfterTransition
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={isModalOpen}>
          <Card
            sx={{
              width: {
                xs: "90%",
                sm: "70%",
                md: "50%",
                lg: "40%",
              },
              maxHeight: "88.5%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {p.imageURL ? (
              <ProjectImage
                imageURL={p.imageURL}
                alt={`${p.name} screenshot`}
              />
            ) : (
              <></>
            )}
            <Container sx={{ py: 1 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {p.name}
                <ProjectConcepts
                  inline
                  concepts={p.languages}
                  sx={{ display: "inline-block", mt: 0 }}
                />
              </Typography>
            </Container>
            <CardContent
              sx={{ overflow: "auto", flex: 1, pt: 0, pb: "8px !important" }}
            >
              <div id="modal-modal-description">
                <ReactMarkdown components={MUIMarkdown}>
                  {p.description ?? ""}
                </ReactMarkdown>
              </div>
              <CardActions>
                <ProjectActions project={p} />
              </CardActions>
            </CardContent>
          </Card>
        </Fade>
      </Modal>
    </>
  );
}

export default Project;
