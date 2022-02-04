import { Box, Container, SxProps, Typography } from "@mui/material";
import React from "react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Animated from "../components/Animated";
import Testimonial from "../components/Testimonial";
import { Testimonial as TestimonialType } from "../features/fetchAPI";
import { Locale, localizedStrings } from "../features/languages";

const data: readonly TestimonialType[] = [
  {
    author: {
      id: 0,
      name: "Julien TOUBON",
      role: "Web Developper",
    },
    content: `It was a real pleasure to work with Tom Sublet.

He is a very passionate and reliable developer.

He got a high knowledge of the web that make him able to adapt quickly and take the lead on all the project we worked on together.

No doubt that he is going to build nice waves to surf on.`,
  },
  {
    author: {
      id: 0,
      name: "Lorem ipsum",
      role: "dolor sit amet",
    },
    content: `Morbi ac augue a libero venenatis tincidunt in eget purus.

Pellentesque ut lacinia justo. Duis ac sapien eu purus vestibulum imperdiet.

Donec consectetur et arcu sit amet euismod.
Maecenas a tellus id dui commodo rutrum nec at nisl.
Proin sit amet sollicitudin sem. Proin tristique ac velit in lobortis.
In pharetra mollis erat, nec mollis urna pulvinar a.

Sed tincidunt, lorem eu vestibulum tristique, sapien arcu dignissim magna,
ut elementum augue elit non nisl.

Nullam condimentum, neque non suscipit vestibulum,
felis metus suscipit massa, ut maximus ipsum ligula a magna.`,
  },
  {
    author: {
      id: 0,
      name: "Ipsum lorem",
      role: "dolor sit amet",
    },
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
  const [testimonials, setTestimonials] = React.useState(data);

  return (
    <Box sx={{ ...sx }}>
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
    </Box>
  );
}

export default Testimonials;
