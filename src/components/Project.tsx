import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import Animated from "../components/Animated";
import MUIMarkdown from "../components/MUIMarkdown";
import { EProjectType, Project as ProjectType } from "../features/fetchAPI";

type Props = {
  rtl?: boolean;
  featured?: boolean;
  p: ProjectType;
};

function Project({ rtl, p, featured }: Props) {
  const type = React.useMemo(() => {
    switch (p.type) {
      case EProjectType.PERSONAL:
        return "💡 Personal project";

      case EProjectType.SCHOOL:
        return "🎓 School project";

      default:
        break;
    }
  }, [p]);

  const openLink = (e: React.MouseEvent, url?: string): void => {
    e.stopPropagation();
    window.open(url ?? p.url, "_blank", "noopener")?.focus();
  };

  return (
    <Animated animation="fadeIn">
      <CardActionArea disabled={!p.url} onClick={(e) => openLink(e)}>
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
                {p.git.provider}
              </Button>
            )}
            {p.url && (
              <Button size="small" color="primary" onClick={(e) => openLink(e)}>
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
