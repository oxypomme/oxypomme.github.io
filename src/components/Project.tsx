import {
  DesktopWindows,
  Games,
  Language,
  Laptop,
  PhoneIphone,
} from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNew from "@mui/icons-material/OpenInNew";
import SmartToy from "@mui/icons-material/SmartToy";
import type { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import React from "react";
import ReactMarkdown from "react-markdown";
import Animated from "../components/Animated";
import MUIMarkdown from "../components/MUIMarkdown";
import {
  EGitProvider,
  EProjectDomain,
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

/**
 * A concept is either a Language (JS) or a Techno (React)
 * The component will build them as chips
 *
 * @param concepts The project's concepts
 * @param sx The style passed to the container
 */
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

/**
 * Render buttons to project's links
 *
 * @param project The project
 */
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

/**
 * Render an image of a project
 *
 * @param imageURL The project's image
 * @param alt The project's image alt
 * @param featured Is the project featured
 */
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
  data: ProjectType;
}>;

type SvgProps = {
  sx: SxProps;
  fontSize: "inherit" | "large" | "medium" | "small" | undefined;
};

/**
 * Render a project
 *
 * @param rtl Image at right
 * @param data The project's data
 * @param featured Is the project featured
 */
function Project({ rtl, data, featured }: Props) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const type = React.useMemo(() => {
    switch (data.type) {
      case EProjectType.PERSONAL:
        return "💡 Personal project";

      case EProjectType.SCHOOL:
        return "🎓 School project";

      default:
        break;
    }
    return "";
  }, [data]);

  const domain = React.useMemo(() => {
    const props: SvgProps = {
      sx: {
        verticalAlign: "text-top",
      },
      fontSize: "inherit",
    };

    switch (data.domain) {
      case EProjectDomain.BOT:
        return (
          <>
            <SmartToy {...props} /> Bot
          </>
        );
      case EProjectDomain.GAME:
        return (
          <>
            <Games {...props} /> Game
          </>
        );
      case EProjectDomain.MOBILE:
        return (
          <>
            <PhoneIphone {...props} /> Mobile
          </>
        );
      case EProjectDomain.PORTABLE_SOFTWARE:
        return (
          <>
            <Laptop {...props} /> Software (portable)
          </>
        );
      case EProjectDomain.SOFTWARE:
        return (
          <>
            <DesktopWindows {...props} /> Software
          </>
        );
      case EProjectDomain.WEB:
        return (
          <>
            <Language {...props} /> Web
          </>
        );

      default:
        break;
    }
    return <></>;
  }, [data]);

  const modalOpen = (): void => {
    if (data.description) {
      setIsModalOpen(true);
    }
  };
  const modalClose = (): void => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Card */}
      <Animated animation="fadeIn">
        <CardActionArea
          component="div"
          disableTouchRipple={!data.description}
          sx={{ cursor: data.description ? "pointer" : "inherit" }}
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
              {data.imageURL && (
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
                    imageURL={data.imageURL}
                    alt={`${data.name} screenshot`}
                    featured={featured}
                  />
                </Box>
              )}
              <Box sx={{ flex: 1 }}>
                <CardContent>
                  <Typography variant="overline">{type}</Typography>
                  <Typography variant="h5">{data.name}</Typography>
                  {data.goal && (
                    <Typography variant="subtitle1" gutterBottom>
                      <ReactMarkdown components={MUIMarkdown}>
                        {data.goal}
                      </ReactMarkdown>
                    </Typography>
                  )}
                  <Typography variant="overline" component="div">
                    {domain}
                  </Typography>
                  <ProjectConcepts concepts={data.languages} />
                  <ProjectConcepts concepts={data.technologies} />
                </CardContent>
                <CardActions>
                  <ProjectActions project={data} />
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
      >
        <Fade in={isModalOpen}>
          <Container
            maxWidth="sm"
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                maxHeight: "88.5%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {data.imageURL ? (
                <ProjectImage
                  imageURL={data.imageURL}
                  alt={`${data.name} screenshot`}
                  featured
                />
              ) : (
                <></>
              )}
              <Container sx={{ py: 1 }}>
                <Typography variant="overline" component="div">
                  {domain}
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {data.name}
                  <ProjectConcepts
                    inline
                    concepts={data.languages}
                    sx={{ display: "inline-block", mt: 0 }}
                  />
                </Typography>
              </Container>
              <CardContent
                sx={{ overflow: "auto", flex: 1, pt: 0, pb: "8px !important" }}
              >
                <div id="modal-modal-description">
                  <ReactMarkdown components={MUIMarkdown}>
                    {data.description ?? ""}
                  </ReactMarkdown>
                </div>
                <CardActions>
                  <ProjectActions project={data} />
                </CardActions>
              </CardContent>
            </Card>
          </Container>
        </Fade>
      </Modal>
    </>
  );
}

export default Project;
