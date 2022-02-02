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
  SvgIcon,
  SxProps,
  Typography,
} from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import Animated from "../components/Animated";
import MUIMarkdown from "../components/MUIMarkdown";
import { EProjectType, Project as ProjectType } from "../features/fetchAPI";
import { ReactComponent as GitIcon } from "../icons/git.svg";
import { ReactComponent as GitLabIcon } from "../icons/gitlab.svg";

type Props = {
  rtl?: boolean;
  featured?: boolean;
  p: ProjectType;
};

const iconSx: SxProps = {
  mr: 0.5,
  fontSize: 20,
};

function Project({ rtl, p, featured }: Props) {
  const ProviderIcon = React.useMemo(() => {
    if (p.git) {
      switch (p.git.provider.toLowerCase()) {
        case "github":
          return <GitHubIcon sx={iconSx} />;
        case "gitlab":
          return <SvgIcon component={GitLabIcon} inheritViewBox sx={iconSx} />;
        default:
          return <SvgIcon component={GitIcon} inheritViewBox sx={iconSx} />;
      }
    }
    return <></>;
  }, [p]);

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

  const openLink = (e: React.MouseEvent, url?: string): void => {
    e.stopPropagation();
    if (url || p.url) {
      window.open(url ?? p.url, "_blank", "noopener")?.focus();
    }
  };

  return (
    <Animated animation="fadeIn">
      <CardActionArea
        component="div"
        disableTouchRipple={!p.url}
        sx={{ cursor: p.url ? "pointer" : "inherit" }}
        onClick={(e: React.MouseEvent) => openLink(e)}
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
                <CardMedia
                  component="img"
                  sx={{
                    aspectRatio: "16/9",
                    height: featured ? undefined : "100%",
                  }}
                  image={p.imageURL}
                  alt={`${p.name} screenshot`}
                />
              </Box>
            )}
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="overline">{type}</Typography>
              <Typography variant="h5">{p.name}</Typography>
              {p.goal && (
                <Typography variant="subtitle1" gutterBottom>
                  <ReactMarkdown components={MUIMarkdown}>
                    {p.goal}
                  </ReactMarkdown>
                </Typography>
              )}
              {featured && p.description && (
                <ReactMarkdown components={MUIMarkdown}>
                  {p.description}
                </ReactMarkdown>
              )}
            </CardContent>
          </Box>

          <CardActions>
            {p.git && (
              <Button
                size="small"
                color="primary"
                onClick={(e) => openLink(e, p.git?.url)}
              >
                {ProviderIcon}
                {p.git.provider}
              </Button>
            )}
            {p.url && (
              <Button size="small" color="primary" onClick={(e) => openLink(e)}>
                <OpenInNew sx={iconSx} />
                Open
              </Button>
            )}
          </CardActions>
        </Card>
      </CardActionArea>
    </Animated>
  );
}

export default Project;
