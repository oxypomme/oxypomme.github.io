import { ArrowRight } from "@mui/icons-material";
import { Masonry } from "@mui/lab";
import { Button, SxProps, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Animated from "../components/Animated";
import BlogPost from "../components/BlogPost";
import LoadingError from "../components/LoadingError";
import type { Blog as BlogType, StrapiObject } from "../features/fetchAPI";
import { getAPI } from "../features/fetchAPI";
import { Locale, localizedStrings } from "../features/languages";

type Props = React.PropsWithoutRef<{
  locale: Locale;
  sx?: SxProps;
}>;

function Blog({ locale, sx }: Props) {
  const [searchParams] = useSearchParams();

  const [posts, setData] = React.useState<
    StrapiObject<BlogType>[] | null | undefined
  >(undefined);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await getAPI("blogs", locale, {
          populate: ["media"],
        });
        setData(data.slice(0, 3) ?? null);
      } catch (error) {
        setData(null);
      }
    })();
  }, [locale]);

  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {posts === undefined ? (
        <CircularProgress sx={{ alignSelf: "center", justifySelf: "center" }} />
      ) : posts ? (
        <>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
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
              {posts.map((p, i) => (
                <Box key={p.id}>
                  <BlogPost
                    data={p.attributes}
                    locale={locale}
                    animation="fadeInLeft"
                    delay={(4 - i) / 3}
                  />
                </Box>
              ))}
            </Masonry>
          </Box>
          <Animated animation="fadeIn" delay={1.25}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 4,
                pb: 6,
              }}
            >
              <Typography
                variant="h4"
                component="p"
                sx={{ textAlign: "center", mb: 2 }}
              >
                {localizedStrings.blogPageLink[locale]}
              </Typography>
              <Button
                size="large"
                variant="outlined"
                component={Link}
                to={{ pathname: "/blog", search: searchParams.toString() }}
              >
                {localizedStrings.moreProjects[locale]}
                <ArrowRight />
              </Button>
            </Box>
          </Animated>
        </>
      ) : (
        <LoadingError />
      )}
    </Box>
  );
}

export default Blog;
