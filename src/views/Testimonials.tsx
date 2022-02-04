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
import type { Testimonial as TestimonialType } from "../features/fetchAPI";
import type { Locale } from "../features/languages";
import { localizedStrings } from "../features/languages";

const data: readonly TestimonialType[] = [
  {
    name: "Julien TOUBON",
    role: "Web Developper",
    content: `It was a real pleasure to work with Tom Sublet.

He is a very passionate and reliable developer.

He got a high knowledge of the web that make him able to adapt quickly and take the lead on all the project we worked on together.

No doubt that he is going to build nice waves to surf on.`,
  },
  {
    name: "Lorem ipsum",
    role: "dolor sit amet",
    logo: "https://api.lorem.space/image/face?w=40&h=40&hash=auvzpgqv",
    content: `Morbi ac augue a libero venenatis tincidunt in eget purus.

Pellentesque ut lacinia justo. Duis ac sapien eu purus vestibulum imperdiet.

Donec consectetur et arcu sit amet euismod.
Maecenas a tellus id dui commodo rutrum nec at nisl.
Proin sit amet sollicitudin sem. Proin tristique ac velit in lobortis.
In pharetra mollis erat, nec mollis urna pulvinar a.

Sed tincidunt, lorem eu vestibulum tristique, sapien arcu dignissim magna,
ut elementum augue elit non nisl.`,
  },
  {
    name: "Ipsum lorem",
    role: "dolor sit amet",
    content: `Morbi ac augue a libero venenatis tincidunt in eget purus.

Pellentesque ut lacinia justo. Duis ac sapien eu purus vestibulum imperdiet.

Donec consectetur et arcu sit amet euismod.
Maecenas a tellus id dui commodo rutrum nec at nisl.`,
  },
];

type Props = React.PropsWithoutRef<{
  locale: Locale;
  sx?: SxProps;
}>;

function Testimonials({ locale, sx }: Props) {
  const [testimonials, setTestimonials] = React.useState<
    readonly TestimonialType[] | null | undefined
  >(undefined);

  React.useEffect(() => {
    (async () => {
      try {
        // TODO: Fetch API
        setTestimonials(data);
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
                    <Testimonial data={t} locale={locale} />
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
