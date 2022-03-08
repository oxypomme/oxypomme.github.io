import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React from "react";
import ReactMarkdown from "react-markdown";
import MUIMarkdown from "../components/MUIMarkdown";
import type { Blog, StrapiAttributes } from "../features/fetchAPI";
import { Locale } from "../features/languages";
import Animated from "./Animated";

type ImageProps = React.PropsWithoutRef<{
  imageURL: string;
  alt: string;
  featured?: boolean;
}>;

/**
 * Render an image of a post
 *
 * @param imageURL The post's image
 * @param alt The post's image alt
 */
function PostImage({ imageURL, alt }: ImageProps) {
  return (
    <CardMedia
      component="img"
      sx={{
        aspectRatio: "16/9",
      }}
      image={imageURL}
      alt={alt}
    />
  );
}

type Props = React.PropsWithoutRef<{
  data: StrapiAttributes<Blog>;
  locale: Locale;
  animation?: string;
  delay?: number;
}>;

function BlogPost({ data, locale, animation, delay }: Props) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const modalOpen = (): void => {
    if (data.content) {
      setIsModalOpen(true);
    }
  };
  const modalClose = (): void => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Card */}
      <Animated animation={animation ?? "fadeIn"} delay={delay}>
        <CardActionArea
          component="div"
          disableTouchRipple={!data.content}
          sx={{ cursor: data.content ? "pointer" : "inherit" }}
          onClick={modalOpen}
        >
          <Card variant="outlined">
            <Box>
              {data.media ? (
                <Box>
                  <PostImage imageURL={data.media} alt={data.title} />
                </Box>
              ) : (
                <></>
              )}
              <Box sx={{ flex: 1 }}>
                <CardContent>
                  <Typography variant="h5">{data.title}</Typography>
                  <Typography variant="subtitle1" color="grey">
                    {new Date(data.createdAt).toLocaleDateString()}
                  </Typography>
                  <Box
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      height: "3.3em",
                    }}
                  >
                    <ReactMarkdown components={MUIMarkdown}>
                      {data.content ?? ""}
                    </ReactMarkdown>
                  </Box>
                </CardContent>
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
              {data.media ? (
                <Box>
                  <PostImage imageURL={data.media} alt={data.title} />
                </Box>
              ) : (
                <></>
              )}
              <Container sx={{ py: 1 }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {data.title}
                </Typography>
                <Typography variant="subtitle1">
                  {new Date(data.createdAt).toLocaleDateString()}
                </Typography>
              </Container>
              <CardContent
                sx={{ overflow: "auto", flex: 1, pt: 0, pb: "8px !important" }}
              >
                <div id="modal-modal-description">
                  <ReactMarkdown components={MUIMarkdown}>
                    {data.content ?? ""}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </Container>
        </Fade>
      </Modal>
    </>
  );
}

export default BlogPost;
