import {
  Box,
  CircularProgress,
  Container,
  SxProps,
  Typography,
} from "@mui/material";
import React from "react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Animated from "../components/Animated";
import LoadingError from "../components/LoadingError";
import Testimonial from "../components/Testimonial";
import type {
  StrapiObject,
  Testimonial as TestimonialType,
} from "../features/fetchAPI";
import getAPI from "../features/fetchAPI";
import type { Locale } from "../features/languages";
import { localizedStrings } from "../features/languages";

type Props = React.PropsWithoutRef<{
  locale: Locale;
  sx?: SxProps;
}>;

function Testimonials({ locale, sx }: Props) {
  const [testimonials, setTestimonials] = React.useState<
    readonly StrapiObject<TestimonialType>[] | null | undefined
  >(undefined);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await getAPI("testimonials", locale);
        if (data.length) {
          setTestimonials(data);
        } else {
          throw new Error("No Data");
        }
      } catch (error) {
        setTestimonials(null);
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
      {testimonials === undefined ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <CircularProgress />
        </Box>
      ) : testimonials ? (
        <>
          <Typography variant="h3" sx={{ textAlign: "center" }} gutterBottom>
            {localizedStrings.testimonials[locale]}
          </Typography>
          <Animated animation="fadeInUp">
            <Container maxWidth="sm">
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{ delay: 5000 }}
                loop
                pagination={{ clickable: true }}
              >
                {testimonials.map((t, i) => (
                  <SwiperSlide key={i}>
                    <Testimonial data={t.attributes} locale={locale} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Container>
          </Animated>
        </>
      ) : (
        <LoadingError />
      )}
    </Box>
  );
}

export default Testimonials;
