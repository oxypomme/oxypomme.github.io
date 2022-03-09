import { Masonry } from "@mui/lab";
import { Container, SxProps, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import BlogPost from "../components/BlogPost";
import LoadingError from "../components/LoadingError";
import type { Blog as BlogType, StrapiObject } from "../features/fetchAPI";
import { getAPI } from "../features/fetchAPI";
import { Locale } from "../features/languages";

type Props = React.PropsWithoutRef<{
  locale: Locale;
  sx?: SxProps;
}>;

function BlogPage({ locale, sx }: Props) {
  const [posts, setData] = React.useState<
    StrapiObject<BlogType>[] | null | undefined
  >(undefined);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await getAPI("blogs", locale, {
          populate: ["media"],
        });
        setData(data ?? null);
      } catch (error) {
        setData(null);
      }
    })();
  }, [locale]);

  return (
    <Box
      sx={{
        ...sx,
        overflow: "auto",
        justifyContent: posts ? undefined : "center",
      }}
      className="mandatory-scroll-container"
    >
      <Container>
        {posts === undefined ? (
          <CircularProgress
            sx={{ alignSelf: "center", justifySelf: "center" }}
          />
        ) : posts ? (
          <>
            <Typography
              variant="h2"
              component="h1"
              sx={{ textAlign: "center", mt: 3 }}
            >
              Blog
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
                {posts.map((p) => (
                  <Box key={p.id}>
                    <BlogPost data={p.attributes} locale={locale} />
                  </Box>
                ))}
              </Masonry>
            </Box>
          </>
        ) : (
          <LoadingError />
        )}
      </Container>
    </Box>
  );
}

export default BlogPage;
