import Stack from "@mui/material/Stack";
import { SxProps } from "@mui/material/styles";
import React from "react";
import LazyPanel from "../components/LazyPanel";
import { Locale } from "../features/languages";
import Blog from "../views/Blog";
import Contact from "../views/Contact";
import Intro from "../views/Intro";
import Profile from "../views/Profile";
import Projects from "../views/Projects";
import Resume from "../views/Resume";
import Testimonials from "../views/Testimonials";

const sx: SxProps = {
  width: "100% !important",
  minHeight: { xs: "100vh" },
  py: "5vh",
  px: {
    xs: 2,
    sm: 3,
  },
};

type Props = React.PropsWithoutRef<{
  locale: Locale;
  sx?: SxProps;
}>;

function HomePage({ locale }: Props) {
  return (
    <Stack
      sx={{
        scrollSnapType: "y mandatory",
        overflow: "auto",
        px: {
          xs: 2,
          sm: 3,
        },
      }}
      className="mandatory-scroll-container"
    >
      <div id="intro">
        <LazyPanel overflow>
          <Intro locale={locale} sx={sx} />
        </LazyPanel>
      </div>
      <div id="profile">
        <LazyPanel overflow>
          <Profile locale={locale} sx={sx} />
        </LazyPanel>
      </div>
      <div id="projects">
        <LazyPanel overflow>
          <Projects locale={locale} sx={sx} />
        </LazyPanel>
      </div>
      <div id="testimonials">
        <LazyPanel overflow>
          <Testimonials locale={locale} sx={sx} />
        </LazyPanel>
      </div>
      <div id="blog">
        <LazyPanel overflow>
          <Blog locale={locale} sx={sx} />
        </LazyPanel>
      </div>
      <div id="resume">
        <LazyPanel overflow>
          <Resume locale={locale} sx={sx} />
        </LazyPanel>
      </div>
      <div id="contact">
        <LazyPanel overflow>
          <Contact locale={locale} sx={sx} />
        </LazyPanel>
      </div>
    </Stack>
  );
}

export default HomePage;
