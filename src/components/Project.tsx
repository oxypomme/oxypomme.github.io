import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import Animated from "../components/Animated";
import MUIMarkdown from "../components/MUIMarkdown";
import { EProjectType } from "../features/fetchAPI";

type Props = {
  rtl?: boolean;
  featured?: boolean;
  p: any;
};

function Project({ rtl, p, featured }: Props) {
  const type = React.useMemo(() => {
    switch (p.type) {
      case EProjectType.PERSONAL:
        return "Personal project";

      case EProjectType.SCHOOL:
        return "School project";

      default:
        break;
    }
  }, [p]);

  return (
    <Animated animation="fadeIn">
      <Card
        variant="outlined"
        sx={{
          display: featured ? undefined : "flex",
          flexDirection: rtl ? "row-reverse" : undefined,
          textAlign: rtl ? "right" : undefined,
        }}
      >
        {p.imageURL && (
          <div style={{ width: featured ? undefined : "35%" }}>
            <CardMedia
              component="img"
              sx={{
                aspectRatio: "16/9",
                height: featured ? undefined : "100%",
              }}
              image={p.imageURL}
              alt={`${p.name} screenshot`}
            />
          </div>
        )}
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="overline">{type}</Typography>
          <Typography variant="h5">{p.name}</Typography>
          <Typography variant="subtitle1" gutterBottom>
            <ReactMarkdown components={MUIMarkdown}>{p.goal}</ReactMarkdown>
          </Typography>
          {featured && (
            <ReactMarkdown components={MUIMarkdown}>
              {p.description}
            </ReactMarkdown>
          )}
        </CardContent>
      </Card>
    </Animated>
  );
}

export default Project;
